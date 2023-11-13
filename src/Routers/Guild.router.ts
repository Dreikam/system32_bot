import { Router } from "express";

import { GuildController } from "../Controllers/Guilds"

const app = Router()
const controller = new GuildController()

app.get('/:guildId', controller.getGuild)
app.post('/', controller.createGuild)
app.put('/:guildId', controller.editGuild)
app.delete('/:guildId', controller.deleteGuild)

export default app