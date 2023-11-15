import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import { ErrorHandler, boomErrorHandlr, logErrors } from "./Middleware";
import Guild from '@Routers/Guild.router';
import Members from '@Routers/Members.router';
import Tickets from '@Routers/Tickets.router';
import Premiums from '@Routers/Premiums.router';
import Tokens from '@Routers/Tokens.router';

const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use('/guilds', Guild);
app.use('/members', Members);
app.use('/tickets', Tickets);
app.use('/premiums', Premiums);
app.use('/tokens', Tokens);
app.use(logErrors);
app.use(boomErrorHandlr);
app.use(ErrorHandler)

export default app
