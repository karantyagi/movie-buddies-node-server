module.exports = function (app) {
    var session = require('express-session');
    app.use(session({
        resave: false,
        saveUninitialized: true,
        duration: 30 * 60 * 1000,
        activeDuration: 30 * 60 * 1000,
        secret: 'any string'
    }));

    const bookingModel =
        require('../models/booking/booking.model.server');

    app.get('/api/booking', findAllBookings);
    app.get('/api/booking/:bookingId', findBookingById);
    app.get('/api/booking/user/:userId', findBookingByUserId);
    app.post('/api/booking', createBooking);
    app.put('/api/booking/:bookingId', updateBooking);
    app.delete('/api/booking/:bookingId', deleteBooking);

    function findAllBookings(req, res) {
        bookingModel.findAllBookings()
            .then(function (user) {
                res.send(user);
            });
    }

    function createBooking(req, res) {
        var booking = req.body;
        if (req.session && req.session['user']) {
            booking['user'] = req.session['user']._id;
            bookingModel.createBooking(booking)
                .then(function (status) {
                    res.send(status);
                });
        } else {
            res.send({status: 'session expired'});
        }
    }

    function findBookingByUserId(req, res) {
        if (req.session && req.session['user']) {
            let userId = req.params['userId'];
            console.log(userId);
            userId = req.session['user']._id;
            console.log('TEST : ', userId);
            bookingModel.findBookingByUserId(userId)
                .then(function (booking) {
                    res.json(booking);
                });
        } else {
            res.send({status: 'session expired'});
        }
    }



    function findBookingById(req, res) {
        let eId = req.params['bookingId']
        bookingModel.findBookingById(eId)
            .then(function (booking) {
                res.json(booking);
            });
    }

    function updateBooking(req, res) {
        var booking = req.body;
        var bookingId = req.params['bookingId'];
        if (req.session && req.session['user']) {
            bookingModel.updateBooking(bookingId,booking)
                .then(function (status) {
                    res.send(status);
                });
        } else {
            res.send({status: 'session expired'});
        }
    }

    function deleteBooking(req, res) {
        if (req.session && req.session['user']) {
            var id = req.params['bookingId'];
            bookingModel.deleteBooking(id).then(function (status) {
                res.send(status);
            })
        }
        else {
            res.send('session expired');
        }
    }
    
    function modifyBooking(req, res) {
        var booking = req.body;
        var bookingId = req.params['bookingId'];
        if (req.session && req.session['user']) {
            bookingModel.updateBooking(bookingId,booking)
                .then(function (status) {
                    res.send(status);
                });
        } else {
            res.send({status: 'session expired'});
        }
    }
    
};
