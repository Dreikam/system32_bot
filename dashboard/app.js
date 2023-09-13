const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const session = require('express-session');
const passport = require('passport');
const discordStrategy = require('./Strategies/discord')

app.use(session({
    secret: 'random',
    cookie: {
        maxAge: 60000 * 60 * 24
    },
    saveUninitialized: false,
    resave: false
}));

app.use(passport.initialize());
app.use(passport.session());


//Middleware Routes
app.use('/auth', require('./Routes/auth.routes.js'));

app.listen(PORT, () => {
    console.log("Server Listo");
})