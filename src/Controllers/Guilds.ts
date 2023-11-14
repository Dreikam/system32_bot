import type { Request, Response, NextFunction } from 'express'
import { GuildServices } from "@Services/db/Guilds";
import Boom from '@hapi/boom'

const services = new GuildServices()

export class GuildController {

  async getGuild(req: Request, res: Response, next: NextFunction) {   
    if(!req.params.guildId) return next(Boom.notFound("Debes colocar la ID"))
    
    const getGuildData = await services.getGuild(req.params.guildId)

    res.json({
      data: getGuildData
    })
  }

  async createGuild(req: Request, res: Response, next: NextFunction) {  
    if(Object.keys(req.query).length == 0) return next(Boom.badRequest('No hay datos'))  

    const createGuild = await services.createGuild(req.query);

    res.json({
      data: createGuild
    })
  }

  editGuild(req: Request, res: Response, next: NextFunction) {  
    if(Object.keys(req.query).length == 0) return next(Boom.badRequest('No hay datos'))  

    const editGuild = services.editGuild(req.params.id, req.query);
  }

  deleteGuild(req: Request, res: Response, next: NextFunction) {   
    if(!req.params.guildId) return next(Boom.notFound("Debes colocar la ID"))
    
    const deleteGuild = services.deleteGuild(req.params.guildId)
  }
}