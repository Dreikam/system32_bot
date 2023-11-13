import { Router } from "express";

import { GuildController } from "../Controllers/Guilds";
import { GuildServices } from "../Services/db/Guilds";

const app = Router()
const services = new GuildServices()
const controller = new GuildController(services)

app.get('/:guildId', controller.getGuild)
app.post('/', controller.createGuild)

export default app