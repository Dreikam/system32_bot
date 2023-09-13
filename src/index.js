require('dotenv').config();
require('colors');
setTimeout(() => {
    require('../dashboard/app')
}, 3000)

const Bot = require('./structures/Client.js');
new Bot();