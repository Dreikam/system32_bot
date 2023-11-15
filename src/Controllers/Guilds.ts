import type { Request, Response, NextFunction } from 'express'
import { GuildServices } from "@Services/db/Guilds";

const services = new GuildServices()

export class GuildController {

  async getGuild(req: Request, res: Response, next: NextFunction) {    
    const getGuildData = await services.getGuild(req.params.guildId)

    res.json({
      data: getGuildData
    })
  }

  async createGuild(req: Request, res: Response, next: NextFunction) {
    const createGuild = await services.createGuild(req.query);

    res.json({
      data: createGuild
    })
  }

  updateGuild(req: Request, res: Response, next: NextFunction) {  
    const editGuild = services.updateGuild(req.params.id, req.query);

    res.json({
      data: editGuild
    })
  }

  deleteGuild(req: Request, res: Response, next: NextFunction) {
    const deleteGuild = services.deleteGuild(req.params.guildId)

    res.json({
      data: deleteGuild
    })
  }
}