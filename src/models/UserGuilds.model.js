const mongoose = require('mongoose');

const GuildsSchema = mongoose.Schema({
    discordID: {
        type: String,
        required: true
    },
    guilds: {
        type: Array,
        default: []
    }
});

const Guilds = module.exports = mongoose.model('Guilds', GuildsSchema)