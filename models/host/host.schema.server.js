const mongoose = require('mongoose');
const hostSchema = mongoose.Schema({
    rating: Number,
    status: String, // blacklisted
    user : {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}
}, {collection: 'Host'});

module.exports = hostSchema;
