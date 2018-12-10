const mongoose = require('mongoose');
const guestSchema = mongoose.Schema({
    requestedMovies: Number,
    tickets: Number,
    booking: Number,
    status: String,  // blacklisted
    user : {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}
}, {collection: 'Guest'});

module.exports = guestSchema;