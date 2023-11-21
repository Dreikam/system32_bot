import { Router } from 'express';

import { PremiumsController } from '@Controllers/Premiums.controller';

const app = Router();
const controller = new PremiumsController();

app.get('/:premiumId', controller.getPremium);
app.post('/', controller.createPremium);
app.patch('/:premiumId', controller.updatePremium);
app.delete('/:premiumId', controller.deletePremium);

export default app;
