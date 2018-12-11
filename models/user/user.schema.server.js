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
    follows : [{type: mongoose.Schema.Types.ObjectId, ref:'UserModel'}]
}, {collection: 'User'});
module.exports = userSchema;
