const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    role: String, // role : Admin, Guest , Host
    requestStatus: String, // 'status types : 'Pending' && 'Verified''
    premiumRequestStatus: String, // 'status types : 'Pending' && 'Verified'
    guest: {type: mongoose.Schema.Types.ObjectId, ref:'GuestModel'},
    host: {type: mongoose.Schema.Types.ObjectId, ref:'HostModel'}
}, {collection: 'User'});
module.exports = userSchema;
