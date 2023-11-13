import type { Request, Response, NextFunction } from 'express'
import { GuildServices } from "../Services/db/Guilds";
import Boom from '@hapi/boom'

export class GuildController {
  service: GuildServices;

  constructor(service: GuildServices) {
    this.service = service
  }

  getGuild(req: Request, res: Response, next: NextFunction) {   
    if(!req.params.guildId) return next(Boom.notFound("Debes colocar la ID"))
    
    const getGuildData = this.service.getGuild(req.params.guildId)
  }

  createGuild(req: Request, res: Response, next: NextFunction) {  
    if(Object.keys(req.query).length == 0) return next(Boom.badRequest('No hay datos'))  

    const createGuild = this.service.createGuild(req.query);
  }


}