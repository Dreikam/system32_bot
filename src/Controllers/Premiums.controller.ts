import type { Request, Response, NextFunction } from 'express';
import { PremiumsServices } from '@Services/db/Premiums';
import boom from '@hapi/boom';

const services = new PremiumsServices();

export class PremiumsController {
  async getAllPremiums(req: Request, res: Response, next: NextFunction) {
    try {
      const premiums = await services.getAllPremiums();

      return res.json({
        data: premiums,
      });
    } catch (error) {
      console.log(error);
      return next(boom.internal('Hubo un error obteniendo los datos'));
    }
  }

  async getGuildPremium(req: Request, res: Response, next: NextFunction) {
    try {
      const getPremium = await services.getGuildPremium(req.params.id);

      return res.json({
        data: getPremium,
      });
    } catch (error) {
      console.log(error);
      return next(boom.internal('Hubo un error obteniendo los datos'));
    }
  }

  async getPremiumByMember(req: Request, res: Response, next: NextFunction) {
    try {
      const premium = await services.getPremiumByMember(req.params.id);

      return res.json({
        data: premium,
      });
    } catch (error) {
      console.log(error);
      return next(boom.internal('Hubo un error obteniendo los datos'));
    }
  }

  async redeemCode(req: Request, res: Response, next: NextFunction) {
    const exist = await services.getGuildPremium(req.body);
    if (exist)
      return next(
        boom.forbidden('El token o el servidor ya se encuentra activado')
      );

    try {
      const redeem = await services.redeemCode(req.body);

      return res.json({
        data: redeem,
      });
    } catch (error) {
      console.log(error);
      return next(boom.internal('Hubo un error canjeando el codigo'));
    }
  }
}
