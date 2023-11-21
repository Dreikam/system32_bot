import { Router } from 'express';
import passport from '@Services/auth';
import { auth, verifyToken } from '@Middlewares/Auth.middleware';
import { AuthController } from '@Controllers/Auth.controller';

const app = Router();
const controller = new AuthController();

let url = 'http://localhost:5173';

//Rutas Discord
app.get('/discord', passport.authenticate('discord'));
app.get(
  '/discord/callback',
  passport.authenticate('discord', {
    successRedirect: url,
    failureRedirect: `${url}/help`,
  })
);
app.get('/discord/status', (req, res) => res.json({ data: req.user }));
app.get('/discord/user/guilds', auth, controller.getUserGuilds);

// Rutas JWT
app.post('/jwt/callback', controller.loginJwt);
app.get('/jwt/test', verifyToken, controller.test);

export default app;
