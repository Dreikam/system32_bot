import { Router } from 'express';

import { GuildController } from '@Controllers/Guilds.controller';
import { validatorHandler } from '@Middlewares/validator.handler';
import { createGuild, updateGuild } from '@Utils/Schema/Guild.schema';

const app = Router();
const controller = new GuildController();

app.get('/', controller.getGuilds);
app.get('/:id', controller.getGuild);
app.post('/', validatorHandler(createGuild, 'body'), controller.createGuild);
app.put('/:id', validatorHandler(updateGuild, 'body'), controller.updateGuild);
app.put('/:id/members/add', controller.addMember);
app.put('/:id/members/remove', controller.removeMember);
app.delete('/:id', controller.deleteGuild);

export default app;
