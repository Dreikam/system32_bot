import { Router } from 'express';
import { GuildController } from '@Controllers/Guilds.controller';
import { validatorHandler } from '@Middlewares/Validator.handler';
import {
  createGuild,
  updateGuild,
  addMember,
  removeMember,
} from '@Utils/Schemas/Guilds.schema';
import { channelCreate, channelUpdate } from '@Utils/Schemas/Channels.schema';

const app = Router();
const controller = new GuildController();

app.get('/', controller.getGuilds);
app.get('/:id', controller.getGuild);
app.post('/', validatorHandler(createGuild, 'body'), controller.createGuild);
app.patch(
  '/:id',
  validatorHandler(updateGuild, 'body'),
  controller.updateGuild
);
app.delete('/:id', controller.deleteGuild);

//Members
app.post(
  '/:id/members/add',
  validatorHandler(addMember, 'body'),
  controller.addMember
);
app.delete(
  '/:id/members/remove',
  validatorHandler(removeMember, 'body'),
  controller.removeMember
);

//Channels
app.get('/:id/channels', controller.getGuildChannels);
app.post(
  '/:id/channels',
  validatorHandler(channelCreate, 'body'),
  controller.createChannel
);
app.patch(
  '/:id/channels',
  validatorHandler(channelUpdate, 'body'),
  controller.updateChannel
);
app.delete('/:id/channels/:channelId', controller.deleteChannel);

export default app;
