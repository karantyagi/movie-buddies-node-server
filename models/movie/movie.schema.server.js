const mongoose = require('mongoose');
const movieSchema = mongoose.Schema({
    title:String,
    overview: String,
    release_date: String,
    rating: String,
    poster_url: String,
    homepage_url: String,
    status: String,
    user : {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}, // the user who has requested this movie
}, {collection: 'Movie'});
module.exports = movieSchema;