import { Router } from "express";

import { PremiumController } from "@Controllers/Premium.controller"

const app = Router()
const controller = new PremiumController()

app.get('/:premiumId', controller.getPremium)
app.post('/', controller.createPremium)
app.patch('/:premiumId', controller.updatePremium)
app.delete('/:premiumId', controller.deletePremium)

export default app