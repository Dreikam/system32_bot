import type { Request, Response, NextFunction } from 'express';
import { GuildServices } from '@Services/db/Guilds';
import { ChannelsServices } from '@Services/db/Channels';
import { GuildConfigsServices } from '@Services/db/GuildConfig';
import boom from '@hapi/boom';
import { IGuildCreate, IGuildUpdate } from '@Interfaces/Guilds.interface';
import { IChannels, IChannelsUpdate } from '@Interfaces/Channels.interface';
import { checkIfRecordExist } from '@Utils/Validations/CheckIfRecordExist';

const services = new GuildServices();
const channelServices = new ChannelsServices();
const configServices = new GuildConfigsServices();

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

  async getAllGuildMembers(req: Request, res: Response, next: NextFunction) {
    try {
      const guildData = await services.getAllGuildMembers(req.params.id);

      return res.json({
        data: guildData,
      });
    } catch (error) {
      console.log(error);
      return next(boom.internal('Hubo un error obteniendo los datos'));
    }
  }

  async createGuild(req: Request, res: Response, next: NextFunction) {
    const guild = await services.getGuild(req.body.guildId);
    if (guild) return next(boom.forbidden('Ya existe el servidor'));

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
    const error = await checkIfRecordExist(
      [services.getGuild(req.params.id)],
      'Verifica que los datos ingresados sean validos'
    );

    if (error) return next(error);

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

  async deleteGuild(req: Request, res: Response, next: NextFunction) {
    const error = await checkIfRecordExist(
      [services.getGuild(req.params.id)],
      'Verifica que los datos ingresados sean validos'
    );

    if (error) return next(error);

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

  //Members
  async addMember(req: Request, res: Response, next: NextFunction) {
    if (!req.body.member.discordId || !req.body.guildId)
      return next(
        boom.notFound('No has ingresado el ID del miembro o servidor')
      );

    const error = await checkIfRecordExist(
      [services.getGuild(req.params.id)],
      'Verifica que los datos ingresados sean validos'
    );

    if (error) return next(error);

    const exist = await services.getRelation(
      req.body.guildId,
      req.body.member.discordId
    );

    if (exist)
      return next(boom.forbidden('El miembro ya existe en este servidor'));
    try {
      const addedMember = await services.addMember(req.body as IGuildUpdate);

      return res.json({
        message: 'Miembro agregado con exito',
        data: addedMember,
      });
    } catch (error) {
      console.log(error);
      return next(boom.internal('Hubo un error añadiendo el miembro'));
    }
  }

  async removeMember(req: Request, res: Response, next: NextFunction) {
    if (!req.body.discordId || !req.body.guildId)
      return next(
        boom.notFound('No has ingresado el ID del miembro o servidor')
      );

    const error = await checkIfRecordExist(
      [services.getGuild(req.params.id)],
      'Verifica que los datos ingresados sean validos'
    );

    if (error) return next(error);

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
        message: 'Miembro removido del servidor con exito',
        data: member,
      });
    } catch (error) {
      console.log(error);
      return next(boom.internal('Hubo un error removiendo al miembro'));
    }
  }

  //Channels
  async getGuildChannels(req: Request, res: Response, next: NextFunction) {
    const error = await checkIfRecordExist(
      [services.getGuild(req.params.id)],
      'Verifica que los datos ingresados sean validos'
    );

    if (error) return next(error);

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
    const error = await checkIfRecordExist(
      [services.getGuild(req.params.id)],
      'Verifica que los datos ingresados sean validos'
    );

    if (error) return next(error);

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
    const error = await checkIfRecordExist(
      [
        services.getGuild(req.params.id),
        channelServices.getChannelById(req.body.channelId),
      ],
      'Verifica que los datos ingresados sean validos'
    );

    if (error) return next(error);

    try {
      const updatedChannel = await channelServices.updateChannel(
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
    const error = await checkIfRecordExist(
      [
        services.getGuild(req.params.id),
        channelServices.getChannelById(req.body.channelId),
      ],
      'Verifica que los datos ingresados sean validos'
    );

    if (error) return next(error);

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

  //Guild Config
  async getConfig(req: Request, res: Response, next: NextFunction) {
    const error = await checkIfRecordExist(
      [services.getGuild(req.params.id)],
      'Verifica que los datos ingresados sean validos'
    );

    if (error) return next(error);

    try {
      const config = await configServices.getConfig(req.params.id);

      return res.json({
        data: config,
      });
    } catch (error) {
      console.log(error);
      return next(boom.internal('Hubo un error obteniendo los datos'));
    }
  }

  async createConfig(req: Request, res: Response, next: NextFunction) {
    if (Object.keys(req.body).length === 0)
      return next(boom.badData('No has ingresado datos'));

    const error = await checkIfRecordExist(
      [services.getGuild(req.params.id)],
      'Verifica que los datos ingresados sean validos'
    );

    if (error) return next(error);

    const exist = await configServices.getConfig(req.params.id);
    if (exist)
      return next(boom.forbidden('El servidor ya tiene una configuracion'));

    try {
      const createdConfig = await configServices.createConfig(
        req.params.id,
        req.body
      );
      return res.json({
        message: 'Configuracion guardada con exito',
        data: createdConfig.config,
      });
    } catch (error) {
      console.log(error);
      return next(boom.internal('Hubo un error creando la configuracion'));
    }
  }

  async updateConfig(req: Request, res: Response, next: NextFunction) {
    if (Object.keys(req.body).length === 0)
      return next(boom.badData('No has ingresado datos'));

    const error = await checkIfRecordExist(
      [
        services.getGuild(req.params.id),
        configServices.getConfig(req.params.id),
      ],
      'Verifica que los datos ingresados sean validos'
    );

    if (error) return next(error);

    try {
      const updatedConfig = await configServices.updateConfig(
        req.params.configId,
        req.body
      );
      return res.json({
        message: 'Configuracion actualizada con exito',
        data: updatedConfig,
      });
    } catch (error) {
      console.log(error);
      return next(boom.internal('Hubo un error actualizando la configuracion'));
    }
  }

  async deleteConfig(req: Request, res: Response, next: NextFunction) {
    const error = await checkIfRecordExist(
      [
        services.getGuild(req.params.id),
        configServices.getConfig(req.params.id),
      ],
      'Verifica que los datos ingresados sean validos'
    );

    if (error) return next(error);

    try {
      const deletedConfig = await configServices.deleteConfig(
        req.params.configId
      );
      return res.json({
        message: 'Configuracion eliminada con exito',
        data: deletedConfig,
      });
    } catch (error) {
      console.log(error);
      return next(boom.internal('Hubo un error eliminando la configuracion'));
    }
  }
}
