const mongoose = require('mongoose');
const eventSchema = require('./event.schema.server');
const eventModel = mongoose.model('EventModel', eventSchema);



module.exports = {
    findAllEvents: findAllEvents,
    findEventById: findEventById,
    findEventByUserId: findEventByUserId,
    createEvent: createEvent,
    deleteEvent: deleteEvent,
    updateEvent: updateEvent
};

function findAllEvents() {
    return eventModel.find();
}

function findEventByUserId(userId) {
    console.log(userId);
    return eventModel.find({user: userId});
}

function findEventById(eId) {
    return eventModel.find({_id: eId});
}

function createEvent(event) {
    return eventModel.create(event);
}

function deleteEvent(eId) {
    return eventModel.remove({_id: eId});
}

function updateEvent(eId, newEvent) {
    return eventModel.update({_id: eId},
        {$set: newEvent})
}
