import type { Request, Response, NextFunction } from 'express'
import { TokensService } from "@Services/db/Tokens";

const services = new TokensService()

export class TokensController {

  async getToken(req: Request, res: Response, next: NextFunction) {       
    const getToken = await services.getToken(req.params.id)

    res.json({
      data: getToken
    })
  }

  async createToken(req: Request, res: Response, next: NextFunction) {
    const createToken = await services.createToken(req.body);

    res.json({
      data: createToken
    })
  }
  
  async updateToken(req: Request, res: Response, next: NextFunction) {
    const updateToken = await services.updateToken(req.params.id, req.body);

    res.json({
      data: updateToken
    })
  }
  
  async deleteToken(req: Request, res: Response, next: NextFunction) {
    const deleteToken = await services.deleteToken(req.params.id);

    res.json({
      data: deleteToken
    })
  }
}