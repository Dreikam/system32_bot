import type { Request, Response, NextFunction } from 'express'

export class AuthController {

    async getUser(req: Request, res: Response, next: NextFunction) {
        let user = req.user
        return res.json({
            data: user
        });
    }

    async getUserGuilds(req: Request, res: Response, next: NextFunction) {
        let user = req.user as any
        let userGuilds = user.guilds
        let svs = userGuilds.filter((g: any) => (g.permissions & 8) === 8);
     
        return res.json({
         data: svs
        });
    }
}