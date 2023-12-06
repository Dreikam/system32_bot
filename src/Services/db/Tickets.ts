import { db as prisma } from '@Services/db';

export class TicketsServices {
  createTicket(data) {
    return prisma.tickets.create({
      data,
    });
  }

  getTicketById(ticketId: string) {
    return prisma.tickets.findUnique({
      where: {
        id: ticketId,
      },
    });
  }

  createGuildMemberTicket(
    member: { discordId: string; name: string },
    ticketId,
    messages
  ) {
    return prisma.guildToMemberTickets.create({
      data: {
        memberId: member.discordId,
        ticketId,
        messages,
      },
    });
  }
}
