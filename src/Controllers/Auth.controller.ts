import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken';
import 'dotenv/config';

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

    loginJwt(req: Request, res: Response, next: NextFunction) {
        let user = {
            id: "123",
            name: "Dreikam",
            password: "asdkasjdlasd",
            random:"test"
          }

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '24h'})

        return res.json({
            token
        })
    }

    test(req: Request, res: Response, next: NextFunction) {
        return res.json({
            data: "Test Ok!"
        })
    }
}