import type { Request, Response, NextFunction } from 'express';
import boom from '@hapi/boom';
import { MembersServices } from '@Services/db/Members';
import { IMembers } from '@Interfaces/Members.interace';
import { checkIfRecordExist } from '@Utils/Validations/CheckIfRecordExist';

const services = new MembersServices();

export class MembersController {
  async getMemberById(req: Request, res: Response, next: NextFunction) {
    try {
      const getMemberData = await services.getMemberById(req.params.id);

      return res.json({
        data: getMemberData,
      });
    } catch (error) {
      console.log(error);
      return next(boom.internal('Hubo un error obteniendo los datos'));
    }
  }

  async getAllMemberGuilds(req: Request, res: Response, next: NextFunction) {
    try {
      const getMembersData = await services.getAllMemberGuilds(req.params.id);

      return res.json({
        data: getMembersData,
      });
    } catch (error) {
      console.log(error);
      return next(boom.internal('Hubo un error obteniendo los datos'));
    }
  }

  async createMember(req: Request, res: Response, next: NextFunction) {
    const exist = await services.getMemberById(req.body.discordId);
    if (exist) return next(boom.forbidden('El miembro ya existe'));

    try {
      const createMember = await services.createMember(req.body as IMembers);

      return res.json({
        message: 'Miembro creado con exito',
        data: createMember,
      });
    } catch (error) {
      console.log(error);
      return next(boom.internal('Hubo un error creando el miembro'));
    }
  }

  async updateMember(req: Request, res: Response, next: NextFunction) {
    const error = await checkIfRecordExist(
      [services.getMemberById(req.params.id)],
      'El miembro no existe'
    );

    if (error) return next(error);

    try {
      const updateMember = await services.updateMember(
        req.params.id,
        req.body as IMembers
      );

      return res.json({
        message: 'Miembro actualizado con exito',
        data: updateMember,
      });
    } catch (error) {
      console.log(error);
      return next(boom.internal('Hubo un error actualizando el miembro'));
    }
  }

  async deleteMember(req: Request, res: Response, next: NextFunction) {
    const error = await checkIfRecordExist(
      [services.getMemberById(req.params.id)],
      'El miembro no existe'
    );

    if (error) return next(error);

    try {
      const deleteMember = await services.deleteMember(req.params.id);

      return res.json({
        message: 'Miembro eliminado con exito',
        data: deleteMember,
      });
    } catch (error) {
      console.log(error);
      return next(boom.internal('Hubo un error eliminando el miembro'));
    }
  }
}
