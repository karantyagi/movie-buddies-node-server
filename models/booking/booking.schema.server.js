const mongoose = require('mongoose');
const bookingSchema = mongoose.Schema({
    tickets : String,
    user : {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    eventId : {type: mongoose.Schema.Types.ObjectId, ref: 'EventModel'},
    event : {type: mongoose.Schema.Types, ref: 'EventModel'}
}, {collection: 'Booking'});
module.exports = bookingSchema;