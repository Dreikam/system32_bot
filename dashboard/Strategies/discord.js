const DiscordStrategy = require('passport-discord').Strategy;
const passport = require('passport');

passport.use(new DiscordStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.URL_REDIRECT,
    scope: ["identify", "guilds", "guilds.members.read"]
}, (accessToken, refreshToken, profile, done) => {
    
}))