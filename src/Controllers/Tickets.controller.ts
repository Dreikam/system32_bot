import type { Request, Response, NextFunction } from 'express';
import { TicketsServices } from '@Services/db/Tickets';

const services = new TicketsServices();

export class TicketsController {
  async getTicketById(req: Request, res: Response, next: NextFunction) {
    const getTicketData = await services.getTicketById(req.params.ticketId);

    res.json({
      data: getTicketData,
    });
  }

  async createGuildMemberTicket(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const createGuildMemberTicket = await services.createGuildMemberTicket(
      req.body.guildId,
      req.body.member,
      req.body.ticketId,
      req.body.messages
    );

    res.json({
      data: createGuildMemberTicket,
    });
  }

  async createTicket(req: Request, res: Response, next: NextFunction) {
    const createTicket = await services.createTicket(req.body);

    res.json({
      data: createTicket,
    });
  }
}
