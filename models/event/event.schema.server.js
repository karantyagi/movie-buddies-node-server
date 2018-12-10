const mongoose = require('mongoose');
const eventSchema = mongoose.Schema({
    name: String,
    movies: String,
    date: String,
    time: String,
    location: String,
    maxTickets : String,
    user : {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}
}, {collection: 'Event'});

module.exports = eventSchema;