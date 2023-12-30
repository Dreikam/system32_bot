import { Router } from 'express';

import { GuildController } from '@Controllers/Guilds.controller';

const app = Router();
const controller = new GuildController();

app.get('/', controller.getGuilds);
app.get('/:id', controller.getGuild);

app.post('/', controller.createGuild);
app.post('/:id/members/add', controller.addMember);

app.patch('/:id', controller.updateGuild);

app.delete('/:id', controller.deleteGuild);
app.delete('/:id/members/remove', controller.removeMember);

export default app;
