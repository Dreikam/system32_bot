import { Router } from 'express';

import { TicketsController } from '@Controllers/Tickets.controller';

const app = Router();
const controller = new TicketsController();

app.get('/:ticketId', controller.getTicketById);
app.post('/', controller.createTicket);
app.post('/create', controller.createGuildMemberTicket);

export default app;
