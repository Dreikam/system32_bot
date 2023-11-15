import { Router } from "express";
import passport from "@Services/auth";
import boom from '@hapi/boom'
const app = Router()

const auth = (req, es, next) => {
    if(req.isAuthenticated()) {
        return next()
    } else {
        return next(boom.unauthorized("Tienes que estar autenticado"))
    }
}

const authRole = (role) => {
    return (req, res, next) => {
        if(req.user.role == role) return next()
        else next(boom.unauthorized("Tienes el rol suficuente"))
    }
}

app.get('/discord/callback', passport.authenticate('discord'), (req, res) => {
    let user = req.user
    res.json({
        data: user
    })
})

app.get('/discord/user/guilds', auth ,  (req, res) => {
   let user = req.user as any
   let userGuilds = user.guilds
   let svs = userGuilds.filter((g: any) => (g.permissions & 8) === 8);

   res.json({
    data: svs
   })
})

export default app

//Añadir nueva estrategia con jwt 