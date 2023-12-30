import { Router } from 'express';
import { GuildController } from '@Controllers/Guilds.controller';
import { validatorHandler } from '@Middlewares/Validator.handler';
import {
  createGuild,
  updateGuild,
  addMember,
  removeMember,
} from '@Utils/Schemas/Guilds.schema';

const app = Router();
const controller = new GuildController();

app.get('/', controller.getGuilds);
app.get('/:id', controller.getGuild);

app.post('/', validatorHandler(createGuild, 'body'), controller.createGuild);
app.post(
  '/:id/members/add',
  validatorHandler(addMember, 'body'),
  controller.addMember
);

app.patch(
  '/:id',
  validatorHandler(updateGuild, 'body'),
  controller.updateGuild
);

app.delete('/:id', controller.deleteGuild);
app.delete(
  '/:id/members/remove',
  validatorHandler(removeMember, 'body'),
  controller.removeMember
);

export default app;
