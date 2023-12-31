import type { Request, Response, NextFunction } from 'express';
import { GuildServices } from '@Services/db/Guilds';
import { ChannelsServices } from '@Services/db/Channels';
import boom from '@hapi/boom';
import { IGuildCreate, IGuildUpdate } from '@Interfaces/Guilds.interface';
import { IChannels, IChannelsUpdate } from '@Interfaces/Channels.interface';

const services = new GuildServices();
const channelServices = new ChannelsServices();

export class GuildController {
  async getGuild(req: Request, res: Response, next: NextFunction) {
    try {
      const getGuildData = await services.getGuild(req.params.id);

      return res.json({
        data: getGuildData,
      });
    } catch (error) {
      console.log(error);
      return next(boom.internal('Hubo un error obteniendo los datos'));
    }
  }

  async getGuilds(req: Request, res: Response, next: NextFunction) {
    try {
      const getGuildData = await services.getGuilds();

      return res.json({
        data: getGuildData,
      });
    } catch (error) {
      console.log(error);
      return next(boom.internal('Hubo un error obteniendo los datos'));
    }
  }

  async createGuild(req: Request, res: Response, next: NextFunction) {
    const guild = await services.getGuild(req.body.guildId);
    if (guild) return res.json('Ya existe');

    try {
      const createGuild = await services.createGuild(req.body as IGuildCreate);

      return res.json({
        message: 'Servidor creado con exito',
        data: createGuild,
      });
    } catch (error) {
      console.log(error);
      return next(boom.internal('Hubo un error creando el servidor'));
    }
  }

  async updateGuild(req: Request, res: Response, next: NextFunction) {
    const guild = await services.getGuild(req.params.id);
    if (!guild) return next(boom.notFound('Servidor no encontrado'));

    try {
      const editGuild = await services.updateGuild(
        req.body.guildId,
        req.body as IGuildUpdate
      );

      return res.json({
        message: 'Servidor actualizado con exito',
        data: editGuild,
      });
    } catch (error) {
      console.log(error);
      return next(boom.internal('Hubo un error actualizando el servidor'));
    }
  }

  async addMember(req: Request, res: Response, next: NextFunction) {
    if (!req.body.member.discordId || !req.body.guildId)
      return next(
        boom.notFound('No has ingresado el ID del miembro o servidor')
      );

    const guild = await services.getGuild(req.params.id);
    if (!guild) return next(boom.notFound('El servidor no existe'));

    const exist = await services.getRelation(
      req.body.guildId,
      req.body.member.discordId
    );

    if (exist)
      return next(boom.forbidden('El miembro ya existe en este servidor'));
    try {
      const addedMember = await services.addMember(req.body as IGuildUpdate);

      return res.send({
        message: 'Miembro actualizado con exito',
        data: addedMember,
      });
    } catch (error) {
      console.log(error);
      return next(boom.internal('Hubo un error añadiendo el miembro'));
    }
  }

  async deleteGuild(req: Request, res: Response, next: NextFunction) {
    const guild = await services.getGuild(req.params.id);
    if (!guild) return next(boom.notFound('El servidor no existe'));

    try {
      const deleteGuild = await services.deleteGuild(req.params.id);

      return res.json({
        message: 'Servidor eliminado con exito',
        data: deleteGuild,
      });
    } catch (error) {
      console.log(error);
      return next(boom.internal('Hubo un error eliminando el servidor'));
    }
  }

  async removeMember(req: Request, res: Response, next: NextFunction) {
    if (!req.body.discordId || !req.body.guildId)
      return next(
        boom.notFound('No has ingresado el ID del miembro o servidor')
      );

    const guild = await services.getGuild(req.params.id);
    if (!guild) return next(boom.notFound('El servidor no existe'));

    const exist = await services.getRelation(
      req.body.guildId,
      req.body.discordId
    );

    if (!exist)
      return next(
        boom.notFound(
          'El miembro que intentas remover no existe en el servidor'
        )
      );

    try {
      const { member } = await services.removeMember(exist.id);

      return res.json({
        message: 'Miembro eliminado con exito',
        data: member,
      });
    } catch (error) {
      console.log(error);
      return next(boom.internal('Hubo un error removiendo al miembro'));
    }
  }

  //Channels
  async getGuildChannels(req: Request, res: Response, next: NextFunction) {
    const guild = await services.getGuild(req.params.id);
    if (!guild) return next(boom.notFound('No existe el servidor'));

    try {
      const channels = await channelServices.getGuildChannels(req.params.id);

      return res.json({
        data: channels,
      });
    } catch (error) {
      console.log(error);
      return next(boom.internal('Hubo un error obteniendo los datos'));
    }
  }

  async createChannel(req: Request, res: Response, next: NextFunction) {
    const guild = await services.getGuild(req.params.id);
    if (!guild) return next(boom.notFound('No existe el servidor'));

    const existChannel = await channelServices.getChannelById(
      req.body.channelId
    );
    if (existChannel)
      return next(boom.forbidden('El canal ya existe en este servidor'));

    try {
      const createdChannel = await channelServices.createChannel(
        req.params.id,
        req.body as IChannels
      );

      return res.json({
        message: 'Canal creado con exito',
        data: createdChannel,
      });
    } catch (error) {
      console.log(error);
      return next(boom.internal('Hubo un error creando el canal'));
    }
  }

  async updateChannel(req: Request, res: Response, next: NextFunction) {
    const guild = await services.getGuild(req.params.id);
    if (!guild) return next(boom.notFound('No existe el servidor'));

    const existChannel = await channelServices.getChannelById(
      req.body.channelId
    );
    if (!existChannel)
      return next(boom.notFound('El canal no existe en este servidor'));

    try {
      const updatedChannel = await channelServices.updateChannel(
        req.params.id,
        req.body as IChannelsUpdate
      );

      return res.json({
        message: 'Canal actualizado con exito',
        data: updatedChannel,
      });
    } catch (error) {
      console.log(error);
      return next(boom.internal('Hubo un error actualizando el canal'));
    }
  }

  async deleteChannel(req: Request, res: Response, next: NextFunction) {
    const guild = await services.getGuild(req.params.id);
    if (!guild) return next(boom.notFound('No existe el servidor'));

    const existChannel = await channelServices.getChannelById(
      req.body.channelId
    );
    if (!existChannel)
      return next(boom.notFound('El canal no existe en este servidor'));

    try {
      const deletedChannel = await channelServices.deleteChannel(
        req.params.channelId
      );

      return res.json({
        message: 'Canal eliminado con exito',
        data: deletedChannel,
      });
    } catch (error) {
      console.log(error);
      return next(boom.internal('Hubo un error eliminando el canal'));
    }
  }
}
