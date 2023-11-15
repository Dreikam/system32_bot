import passport from 'passport'
import { discord } from './strategies/discord'

passport.serializeUser(function(user, done) {
    done(null, user)
})

passport.deserializeUser(function(user, done){
    done(null, user)
})

passport.use(discord)

// https://www.passportjs.org/

export default passport