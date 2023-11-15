import 'dotenv/config'
import {Strategy} from 'passport-discord'


// https://discord.com/developers/docs/topics/oauth2

export const discord = new Strategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: `${process.env.PROJECT_URL}/auth/discord/callback`,
    scope: ['identify', 'guilds']
}, (accessToken, refreshToken, profile, done)=> {
    return done(null, profile)
})