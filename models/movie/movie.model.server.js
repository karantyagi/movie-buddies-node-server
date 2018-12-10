const mongoose = require('mongoose');
const movieSchema = require('./movie.schema.server');
const movieModel = mongoose.model('MovieModel', movieSchema);



module.exports = {
    findAllmovies: findAllmovies,
    findmovieById: findmovieById,
    findmovieByUserId: findmovieByUserId,
    createmovie: createmovie,
    deletemovie: deletemovie,
    updatemovie: updatemovie
};

function findAllmovies() {
    return movieModel.find();
}

function findmovieByUserId(userId) {
    console.log(userId);
    return movieModel.find({user: userId});
}

function findmovieById(eId) {
    return movieModel.find({_id: eId});
}

function createmovie(movie) {
    return movieModel.create(movie);
}

function deletemovie(eId) {
    return movieModel.remove({_id: eId});
}

function updatemovie(eId, newmovie) {
    return movieModel.update({_id: eId},
        {$set: newmovie})
}
