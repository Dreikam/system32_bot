import type { Request, Response, NextFunction } from 'express';
import { GuildServices } from '@Services/db/Guilds';

const services = new GuildServices();

export class GuildController {
  async getGuild(req: Request, res: Response, next: NextFunction) {
    const getGuildData = await services.getGuild(req.params.guildId);

    return res.json({
      data: getGuildData,
    });
  }

  async createGuild(req: Request, res: Response, next: NextFunction) {
    const createGuild = await services.createGuild(req.body);

    return res.json({
      data: createGuild,
    });
  }

  async updateGuild(req: Request, res: Response, next: NextFunction) {
    const editGuild = await services.updateGuild(req.params.id, req.body);

    return res.json({
      data: editGuild,
    });
  }

  async deleteGuild(req: Request, res: Response, next: NextFunction) {
    const deleteGuild = await services.deleteGuild(req.params.guildId);

    return res.json({
      data: deleteGuild,
    });
  }
}
