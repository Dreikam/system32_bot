import { Router } from "express";

import { MembersController } from "@Controllers/Members.controller"

const app = Router()
const controller = new MembersController()

app.get('/:memberId', controller.getMemberById)
app.get('/:guildId/all', controller.getAllMembersByGuild)
app.post('/', controller.createMember)
app.patch('/:memberId', controller.updateMember)
app.delete('/:memberId', controller.deleteMember)

export default app