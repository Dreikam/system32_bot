import { Router } from "express";

import { TokensController } from "@Controllers/Tokens"

const app = Router()
const controller = new TokensController()

app.get('/:id', controller.getToken)
app.post('/', controller.createToken)
app.patch('/:id', controller.updateToken)
app.delete('/:id', controller.deleteToken)

export default app