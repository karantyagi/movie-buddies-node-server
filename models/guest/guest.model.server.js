const mongoose = require('mongoose');
const guestSchema = require('./guest.schema.server');
const guestModel = mongoose.model('GuestModel', guestSchema);

module.exports = {
    findAllGuests: findAllGuests,
    findGuestByUserId: findGuestByUserId,
    createGuest: createGuest,
    deleteGuest: deleteGuest,
    updateGuest: updateGuest
};

function findAllGuests() {
    return guestModel.find();
}


function findGuestByUserId(userId) {
    console.log(userId);
    return guestModel.findOne({user: userId});
}

function createGuest(guest) {
    console.log(guest);
    return guestModel.create(guest);
}

function deleteGuest(guestId) {
    return guestModel.remove({_id: guestId});
}

function updateGuest(guestId, newGuest) {
    return guestModel.update({_id: guestId},
        {$set: newGuest})
}

