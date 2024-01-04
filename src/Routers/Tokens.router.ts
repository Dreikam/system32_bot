import { Router } from 'express';

import { TokensController } from '@Controllers/Tokens.controller';

const app = Router();
const controller = new TokensController();

app.get('/', controller.getAllTokens);
app.get('/:id', controller.getToken);
app.post('/', controller.createToken);
app.patch('/:id', controller.updateToken);
app.delete('/:id', controller.deleteToken);

export default app;
