import type { Request, Response, NextFunction } from 'express'
import { PremiumServices } from "@Services/db/Premium";

const services = new PremiumServices()

export class PremiumController {

  async getPremium(req: Request, res: Response, next: NextFunction) {       
    const getPremium = await services.getPremium(req.params.id)

    res.json({
      data: getPremium
    })
  }

  async createPremium(req: Request, res: Response, next: NextFunction) {
    const createPremium = await services.createPremium(req.body.guildId, req.body.memberId, req.body.tokenId);

    res.json({
      data: createPremium
    })
  }
  
  async updatePremium(req: Request, res: Response, next: NextFunction) {
    const updatePremium = await services.updatePremium(req.params.id, req.body);

    res.json({
      data: updatePremium
    })
  }
  
  async deletePremium(req: Request, res: Response, next: NextFunction) {
    const deletePremium = await services.deletePremium(req.params.id);

    res.json({
      data: deletePremium
    })
  }
}