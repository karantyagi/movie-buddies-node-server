const mongoose = require('mongoose');
const bookingSchema = mongoose.Schema({
    user : {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    event : {type: mongoose.Schema.Types.ObjectId, ref: 'EventModel'}
}, {collection: 'Booking'});
module.exports = bookingSchema;