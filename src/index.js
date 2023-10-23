require('dotenv').config();
require('colors');

//importar e iniciar servicios
require('../dashboard/app')
const db = require('./structures/Database');
const Bot = require('./structures/Client.js');

//Conexion a DB
db.then(() => console.log('DB conectada')).catch(e => console.log(e))

//Inicializacion del bot
new Bot();