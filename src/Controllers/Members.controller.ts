import type { Request, Response, NextFunction } from 'express';
import { MembersServices } from '@Services/db/Members';

const services = new MembersServices();

export class MembersController {
  async getMemberById(req: Request, res: Response, next: NextFunction) {
    const getMemberData = await services.getMemberById(req.params.memberId);

    return res.json({
      data: getMemberData,
    });
  }

  async getAllMembersByGuild(req: Request, res: Response, next: NextFunction) {
    const getMembersData = await services.getAllMembersByGuild(
      req.params.guildId
    );

    return res.json({
      data: getMembersData,
    });
  }

  async createMember(req: Request, res: Response, next: NextFunction) {
    const createMember = await services.createMember(req.body);

    return res.json({
      data: createMember,
    });
  }

  async updateMember(req: Request, res: Response, next: NextFunction) {
    const updateMember = await services.updateMember(
      req.params.memberId,
      req.body
    );

    return res.json({
      data: updateMember,
    });
  }

  async deleteMember(req: Request, res: Response, next: NextFunction) {
    const deleteMember = await services.deleteMember(req.params.memberId);

    return res.json({
      data: deleteMember,
    });
  }
}
