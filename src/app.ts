import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import boom from "@hapi/boom";

import { ErrorHandler, boomErrorHandlr, logErrors } from "./Middleware";
import Guild from './Routers/Guild.router'

const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use('/guilds', Guild);
app.use(logErrors);
app.use(boomErrorHandlr);
app.use(ErrorHandler)

export default app
