const mongoose = require('mongoose');
const ticketSchema = require('./ticket.schema.server');
const ticketModel = mongoose.model('TicketModel', ticketSchema);



module.exports = {
    findAllTickets: findAllTickets,
    findTicketById: findTicketById,
    findTicketByUserId: findTicketByUserId,
    createTicket: createTicket,
    deleteTicket: deleteTicket,
    updateTicket: updateTicket
};

function findAllTickets() {
    return ticketModel.find();
}

function findTicketByUserId(userId) {
    console.log(userId);
    return ticketModel.find({user: userId});
}

function findTicketById(eId) {
    return ticketModel.find({_id: eId});
}

function createTicket(ticket) {
    return ticketModel.create(ticket);
}

function deleteTicket(eId) {
    return ticketModel.remove({_id: eId});
}

function updateTicket(eId, newTicket) {
    return ticketModel.update({_id: eId},
        {$set: newTicket})
}
