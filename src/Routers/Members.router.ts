import { Router } from 'express';
import { MembersController } from '@Controllers/Members.controller';
import { validatorHandler } from '@Middlewares/Validator.handler';
import { membersCreate, memberUpdate } from '@Utils/Schemas/Members.schema';

const app = Router();
const controller = new MembersController();

app.get('/:id', controller.getMemberById);
app.get('/:id/guilds', controller.getAllMemberGuilds);

app.post('/', validatorHandler(membersCreate, 'body'), controller.createMember);

app.patch(
  '/:id',
  validatorHandler(memberUpdate, 'body'),
  controller.updateMember
);

app.delete('/:id', controller.deleteMember);

export default app;
