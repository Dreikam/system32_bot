import type { Request, Response, NextFunction } from 'express'
import { MembersServices } from "@Services/db/Members";
import Boom from '@hapi/boom'

const services = new MembersServices()

export class MembersController {

  async getMemberById(req: Request, res: Response, next: NextFunction) {   
    if(!req.params.memberId) return next(Boom.notFound("Debes colocar la ID"))
    
    const getMemberData = await services.getMemberById(req.params.memberId)

    res.json({
      data: getMemberData
    })
  }

  async getAllMembersByGuild(req: Request, res: Response, next: NextFunction) {   
    if(!req.params.guildId) return next(Boom.notFound("Debes colocar la ID"))
    
    const getMembersData = await services.getAllMembersByGuild(req.params.guildId)

    res.json({
      data: getMembersData
    })
  }

  async createMember(req: Request, res: Response, next: NextFunction) {  
    if(Object.keys(req.body).length == 0) return next(Boom.badRequest('No hay datos'))  

    const createMember = await services.createMember(req.body);

    res.json({
      data: createMember
    })
  }

  async updateMember(req: Request, res: Response, next: NextFunction) {  
    if(Object.keys(req.body).length == 0) return next(Boom.badRequest('No hay datos'))  

    const updateMember = await services.updateMember(req.params.memberId, req.body);

    res.json({
        data: updateMember
    })
  }

  async deleteMember(req: Request, res: Response, next: NextFunction) {   
    if(!req.params.memberId) return next(Boom.notFound("Debes colocar la ID"))
    
    const deleteMember = await services.deleteMember(req.params.memberId)

    res.json({
        data: deleteMember
    })
  }
}