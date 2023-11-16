import { Router } from "express";
import passport from "@Services/auth";
import {auth, verifyToken} from '@Middlewares/Auth.middleware'
import { AuthController } from "@Controllers/Auth.controller";

const app = Router();
const controller = new AuthController();

//Rutas Discord
app.get('/discord/callback', passport.authenticate('discord'), controller.getUser)
app.get('/discord/user/guilds', auth ,  controller.getUserGuilds)

// Rutas JWT
app.post('/jwt/callback', controller.loginJwt);
app.get('/jwt/test', verifyToken, controller.test);


export default app