import { Router } from "express";
import passport from "@Services/auth";
import {auth} from '@Middlewares/Auth.middleware'
import { AuthController } from "@Controllers/Auth.controller";

const app = Router();
const controller = new AuthController();

app.get('/discord/callback', passport.authenticate('discord'), controller.getUser)

app.get('/discord/user/guilds', auth ,  controller.getUserGuilds)

export default app

//Añadir nueva estrategia con jwt 