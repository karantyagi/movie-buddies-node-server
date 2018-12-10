module.exports = function (app) {
    var session = require('express-session');
    app.use(session({
        resave: false,
        saveUninitialized: true,
        duration: 30 * 60 * 1000,
        activeDuration: 30 * 60 * 1000,
        secret: 'any string'
    }));

    const movieModel =
        require('../models/movie/movie.model.server');

    app.get('/api/movie', findAllmovies);
    app.get('/api/movie/:movieId', findmovieById);
    app.get('/api/movie/user/:userId', findmovieByUserId);
    app.post('/api/movie', createmovie);
    app.put('/api/movie/:movieId', updatemovie);
    app.delete('/api/movie/:movieId', deletemovie);

    function findAllmovies(req, res) {
        movieModel.findAllmovies()
            .then(function (user) {
                res.send(user);
            });
    }

    function createmovie(req, res) {
        var movie = req.body;
        if (req.session && req.session['user']) {
            movie['user'] = req.session['user']._id;
            movieModel.createmovie(movie)
                .then(function (status) {
                    res.send(status);
                });
        } else {
            res.send({status: 'session expired'});
        }
    }

    function findmovieByUserId(req, res) {
        if (req.session && req.session['user']) {
            let userId = req.params['userId'];
            console.log(userId);
            userId = req.session['user']._id;
            console.log('TEST : ', userId);
            movieModel.findmovieByUserId(userId)
                .then(function (movie) {
                    res.json(movie);
                });
        } else {
            res.send({status: 'session expired'});
        }
    }



    function findmovieById(req, res) {
        let eId = req.params['movieId']
        movieModel.findmovieById(eId)
            .then(function (movie) {
                res.json(movie);
            });
    }

    function updatemovie(req, res) {
        var movie = req.body;
        var movieId = req.params['movieId'];
        if (req.session && req.session['user']) {
            movieModel.updatemovie(movieId,movie)
                .then(function (status) {
                    res.send(status);
                });
        } else {
            res.send({status: 'session expired'});
        }
    }

    function deletemovie(req, res) {
        if (req.session && req.session['user']) {
            var id = req.params['movieId'];
            movieModel.deletemovie(id).then(function (status) {
                res.send(status);
            })
        }
        else {
            res.send('session expired');
        }
    }

};
