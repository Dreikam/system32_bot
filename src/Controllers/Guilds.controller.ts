import type { Request, Response, NextFunction } from 'express';
import { GuildServices } from '@Services/db/Guilds';
import boom from '@hapi/boom';

const services = new GuildServices();

export class GuildController {
  async getGuild(req: Request, res: Response, next: NextFunction) {
    try {
      const getGuildData = await services.getGuild(req.params.id);

      return res.json({
        data: getGuildData,
      });
    } catch (error) {
      console.log(error);
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
      console.log(error);
      next(boom.badImplementation('Hubo un error obteniendo los datos'));
    }
  }

  async createGuild(req: Request, res: Response, next: NextFunction) {
    const existGuild = await services.getGuild(req.body.guildId);

    if (existGuild) return res.json('Servidor ya existente');

    try {
      const createGuild = await services.createGuild(req.body);

      return res.json({
        message: 'Servidor creado con exito',
        data: createGuild,
      });
    } catch (error) {
      console.log(error);
      next(boom.badImplementation('Hubo un error creando los datos'));
    }
  }

  async updateGuild(req: Request, res: Response, next: NextFunction) {
    const existGuild = await services.getGuild(req.params.id);

    if (!existGuild)
      return next(
        boom.notFound('No existe el servidor que intentas actualizar')
      );
    try {
      const editGuild = await services.updateGuild(req.params.id, req.body);

      return res.json({
        message: 'Servidor actualizado con exito',
        data: editGuild,
      });
    } catch (error) {
      console.log(error);
      next(boom.badImplementation('Hubo un error actualizando el servidor'));
    }
  }

  async addMember(req: Request, res: Response, next: NextFunction) {
    const existGuild = await services.getGuild(req.params.id);

    if (!existGuild)
      return next(
        boom.notFound('No existe el servidor que intentas actualizar')
      );

    const existMember = await services.getRelation(
      req.params.id,
      req.body.member.discordId
    );

    if (existMember)
      return next(
        boom.unauthorized(
          'El miembro que intentas añadir ya existe en el servidor'
        )
      );

    try {
      const addedMembers = await services.addMember(req.params.id, req.body);

      return res.json({
        message: 'Miembros actualizados con exito',
        data: addedMembers,
      });
    } catch (error) {
      console.log(error);
      next(boom.badImplementation('Hubo un error actualizando los miembros'));
    }
  }

  async removeMember(req: Request, res: Response, next: NextFunction) {
    const existGuild = await services.getGuild(
      req.params.id || req.body.guildId
    );

    if (!existGuild)
      return next(
        boom.notFound('No existe el servidor que intentas actualizar')
      );

    const existMember = await services.getRelation(
      req.body.guildId,
      req.body.discordId
    );
    console.log(existMember);

    if (!existMember)
      return next(boom.notFound('El miembro no existe en ese servidor'));
    try {
      const removedMember = await services.removeMember(existMember.id);

      return res.json({
        message: 'Miembro removido con exito',
        data: removedMember,
      });
    } catch (error) {
      console.log(error);
      next(boom.badImplementation('Hubo un error elminando el miembro'));
    }
  }

  async deleteGuild(req: Request, res: Response, next: NextFunction) {
    const existGuild = await services.getGuild(req.params.id);

    if (!existGuild)
      return next(boom.notFound('No existe el servidor que intentas eliminar'));
    try {
      const deleteGuild = await services.deleteGuild(req.params.id);

      return res.json({
        message: 'Servidor eliminado con exito',
        data: deleteGuild,
      });
    } catch (error) {
      console.log(error);
      next(boom.badImplementation('Hubo un error eliminando el servidor'));
    }
  }
}
