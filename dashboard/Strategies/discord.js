const DiscordStrategy = require('passport-discord').Strategy;
const passport = require('passport');
const User = require('../../src/models/User.model');
const UserGuildsModel = require('../../src/models/UserGuilds.model');

passport.serializeUser((user, done) => {
    done(null, user)
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);

    if(user) done(null, user)
});

passport.use(new DiscordStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.URL_REDIRECT,
    scope: ["identify", "guilds", "guilds.members.read"]
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await User.findOne({discordID: profile.id});

        if(user) {
            done(null, user)
        } else {
            const newUser = await User.create({
                discordID: profile.id,
                username: profile.username
            });
            const newUserGuilds = await UserGuildsModel.create({
                discordID: profile.id,
                guilds: profile.guilds.map( g => ({
                    id: g.id,
                    name: g.name
                }))
            });

            const savedUser = await newUser.save();
            await newUserGuilds.save()

            done(null, savedUser);
        }
    } catch (e) {
        console.log(e);
    }
}))