import type { Request, Response, NextFunction } from 'express';
import { GuildServices } from '@Services/db/Guilds';
import boom from '@hapi/boom';

const services = new GuildServices();

export class GuildController {
  async getGuild(req: Request, res: Response, next: NextFunction) {
    try {
      const getGuildData = await services.getGuild(req.params.guildId);

      return res.json({
        data: getGuildData,
      });
    } catch (error) {
      next(boom.badImplementation('Hubo un error obteniendo los datos'));
    }
  }

  async getGuilds(req: Request, res: Response, next: NextFunction) {
    try {
      const guilds = await services.getGuilds();

      res.json({
        data: guilds,
      });
    } catch (error) {
      next(boom.badImplementation('Hubo un error obteniendo los datos'));
    }
  }

  async createGuild(req: Request, res: Response, next: NextFunction) {
    try {
      const createGuild = await services.createGuild(req.body);

      return res.json({
        message: 'Servidor creado con exito',
        data: createGuild,
      });
    } catch (error) {
      next(boom.badImplementation('Ya existe este servidor'));
    }
  }

  async updateGuild(req: Request, res: Response, next: NextFunction) {
    try {
      const editGuild = await services.updateGuild(req.params.id, req.body);

      return res.json({
        message: 'Servidor actualizado con exito',
        data: editGuild,
      });
    } catch (error) {
      next(boom.badImplementation('Hubo un error actualizando el servidor'));
    }
  }

  async deleteGuild(req: Request, res: Response, next: NextFunction) {
    try {
      const deleteGuild = await services.deleteGuild(req.params.guildId);

      return res.json({
        message: 'Servidor eliminado con exito',
        data: deleteGuild,
      });
    } catch (error) {
      next(boom.badImplementation('Hubo un error eliminando el servidor'));
    }
  }
}
