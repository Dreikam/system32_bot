import type { Request, Response, NextFunction } from 'express';
import { PremiumsServices } from '@Services/db/Premiums';

const services = new PremiumsServices();

export class PremiumsController {
  async getPremium(req: Request, res: Response, next: NextFunction) {
    const getPremium = await services.getPremium(req.params.id);

    return res.json({
      data: getPremium,
    });
  }

  async createPremium(req: Request, res: Response, next: NextFunction) {
    const createPremium = await services.createPremium(req.body);

    return res.json({
      data: createPremium,
    });
  }

  async updatePremium(req: Request, res: Response, next: NextFunction) {
    const updatePremium = await services.updatePremium(req.params.id, req.body);

    return res.json({
      data: updatePremium,
    });
  }

  async deletePremium(req: Request, res: Response, next: NextFunction) {
    const deletePremium = await services.deletePremium(req.params.id);

    return res.json({
      data: deletePremium,
    });
  }
}
