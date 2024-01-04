import { Router } from 'express';

import { PremiumsController } from '@Controllers/Premiums.controller';

const app = Router();
const controller = new PremiumsController();

app.get('/', controller.getAllPremiums);
app.get('/:id', controller.getGuildPremium);
app.post('/', controller.redeemCode);

//Members
app.get('/member/:id', controller.getPremiumByMember);
export default app;
