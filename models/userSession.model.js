const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const userSessionSchema = new Schema({
    userId:{
        type: String,
        default: -1
    },
    timestamp:{
        type: Date,
        default: Date.now()
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});
const userSession = mongoose.model('UserSession', userSessionSchema);

module.exports =  userSession