import { Router } from 'express';

import { GuildController } from '@Controllers/Guilds.controller';

const app = Router();
const controller = new GuildController();

app.get('/:guildId', controller.getGuild);
app.get('/', (req, res) => {
  res.json({
    data: 'Hola desde guilds',
  });
});
app.post('/', controller.createGuild);
app.patch('/:guildId', controller.updateGuild);
app.delete('/:guildId', controller.deleteGuild);

export default app;
