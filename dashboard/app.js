const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const session = require('express-session');
const passport = require('passport');
const path = require('path')
const {engine} = require('express-handlebars');
require('./Strategies/discord');
const {Server} = require('socket.io');

//Configuracion
app.use(express.json())
.use(express.urlencoded({extended: false}))
.use(session({
    secret: 'login-session-discord',
    cookie: {
        maxAge: 60000 * 60 * 24
    },
    saveUninitialized: false,
    resave: false,
    name: "discord.oauth2"
}))
.use(passport.initialize())
.use(passport.session())
.set('view engine', '.hbs')
.set('views', path.join(__dirname, './views'))
.use(express.static(__dirname + '/public'))
.engine('.hbs', engine({
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}))

//Middleware Routes
app.use('/auth', require('./Routes/auth.routes.js'));
app.use('/dashboard', require('./Routes/dashboard.routes.js'));

//servidor con express
const server = app.listen(PORT, () => {
    console.log("Server Listo en http://localhost:3000");
});

const io = new Server(server);

io.on('connection', (socket) => {

    socket.on('connected:client', (data) => {
        console.log(`Conectado ${data.user} con Websocket!`);
    });
})
