module.exports = function (app) {
    var session = require('express-session');
    app.use(session({
        resave: false,
        saveUninitialized: true,
        duration: 30 * 60 * 1000,
        activeDuration: 30 * 60 * 1000,
        secret: 'any string'
    }));

    const eventModel =
        require('../models/event/event.model.server');

    app.get('/api/event', findAllEvents);
    app.get('/api/event/:eventId', findEventById);
    app.get('/api/event/user/:userId', findEventByUserId);
    app.post('/api/event', createEvent);
    app.put('/api/event/:eventId', updateEvent);
    app.delete('/api/event/:eventId', deleteEvent);

    function findAllEvents(req, res) {
        eventModel.findAllEvents()
            .then(function (user) {
                res.send(user);
            });
    }

    function createEvent(req, res) {
        var event = req.body;
        if (req.session && req.session['user']) {
            event['user'] = req.session['user']._id;
            eventModel.createEvent(event)
                .then(function (status) {
                    res.send(status);
                });
        } else {
            res.send({status: 'session expired'});
        }
    }

    function findEventByUserId(req, res) {
        if (req.session && req.session['user']) {
            let userId = req.params['userId'];
            console.log(userId);
            userId = req.session['user']._id;
            console.log('TEST : ', userId);
            eventModel.findEventByUserId(userId)
                .then(function (event) {
                    res.json(event);
                });
        } else {
            res.send({status: 'session expired'});
        }
    }



    function findEventById(req, res) {
        let eId = req.params['eventId']
        eventModel.findEventById(eId)
            .then(function (event) {
                res.json(event);
            });
    }

    function updateEvent(req, res) {
        var event = req.body;
        var eventId = req.params['eventId'];
        if (req.session && req.session['user']) {
            eventModel.updateEvent(eventId,event)
                .then(function (status) {
                    res.send(status);
                });
        } else {
            res.send({status: 'session expired'});
        }
    }

    function deleteEvent(req, res) {
        if (req.session && req.session['user']) {
            var id = req.params['eventId'];
            eventModel.deleteEvent(id).then(function (status) {
                res.send(status);
            })
        }
        else {
            res.send('session expired');
        }
    }



};
