const mongoose = require('mongoose');
const ticketSchema = mongoose.Schema({
    booking: {type: mongoose.Schema.Types.ObjectId, ref: 'BookingModel'},
    event: {type: mongoose.Schema.Types.ObjectId, ref: 'EventModel'},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}
}
module.exports = ticketSchema;
