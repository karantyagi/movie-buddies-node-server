const mongoose = require('mongoose');
const bookingSchema = require('./booking.schema.server');
const bookingModel = mongoose.model('BookingModel', bookingSchema);


module.exports = {
    findAllBookings: findAllBookings,
    findBookingById: findBookingById,
    findBookingByUserId: findBookingByUserId,
    createBooking: createBooking,
    deleteBooking: deleteBooking,
    updateBooking: updateBooking
};

function findAllBookings() {
    return bookingModel.find();
}

function findBookingByUserId(userId) {
    console.log(userId);
    return bookingModel.find({user: userId});
}

function findBookingById(eId) {
    return bookingModel.find({_id: eId});
}

function createBooking(booking) {
    return bookingModel.create(booking);
}

function deleteBooking(bId) {
    return bookingModel.remove({_id: bId});
}

function updateBooking(bId, newBooking) {
    return bookingModel.update({_id: bId},
        {$set: newBooking})
}
