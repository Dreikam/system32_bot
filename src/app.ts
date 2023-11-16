import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import session from 'express-session'
import passport from "@Services/auth";
import 'dotenv/config'

import { ErrorHandler, boomErrorHandlr, logErrors } from "@Middlewares/Error.middleware";
import Guild from '@Routers/Guild.router';
import Members from '@Routers/Members.router';
import Tickets from '@Routers/Tickets.router';
import Premiums from '@Routers/Premiums.router';
import Tokens from '@Routers/Tokens.router';
import Auth from '@Routers/Auth.router';

const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}))
app.use(passport.initialize())
app.use(passport.session())
app.use('/guilds', Guild);
app.use('/members', Members);
app.use('/tickets', Tickets);
app.use('/premiums', Premiums);
app.use('/tokens', Tokens);
app.use('/auth', Auth);
app.use(logErrors);
app.use(boomErrorHandlr);
app.use(ErrorHandler)

export default app
