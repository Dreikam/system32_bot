const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    discordID: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema)