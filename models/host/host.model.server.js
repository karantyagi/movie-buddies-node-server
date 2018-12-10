const mongoose = require('mongoose');
const hostSchema = require('./host.schema.server');
const hostModel = mongoose.model('HostModel', hostSchema);

module.exports = {
    findAllHosts: findAllHosts,
    findHostByUserId: findHostByUserId,
    createHost: createHost,
    deleteHost: deleteHost,
    updateHost: updateHost
};

function findAllHosts() {
    return hostModel.find();
}


function findHostByUserId(userId) {
    console.log(userId);
    return hostModel.findOne({user: userId});
}

function createHost(host) {
    console.log(host);
    return hostModel.create(host);
}

function deleteHost(hostId) {
    return hostModel.remove({_id: hostId});
}

function updateHost(hostId, newHost) {
    return hostModel.update({_id: hostId},
        {$set: newHost})
}




