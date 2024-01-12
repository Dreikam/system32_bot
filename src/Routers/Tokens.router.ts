import { Router } from 'express';
import { TokensController } from '@Controllers/Tokens.controller';
import { validatorHandler } from '@Middlewares/Validator.handler';
import { tokenCreate } from '@Utils/Schemas/Tokens.schema';

const app = Router();
const controller = new TokensController();

app.get('/', controller.getAllTokens);
app.get('/:id', controller.getToken);
app.post('/', validatorHandler(tokenCreate, 'body'), controller.createToken);
//app.patch('/:id', controller.updateToken);
app.delete('/:id', controller.deleteToken);

export default app;
