import { db as prisma } from '@Services/db';

export class TicketsServices {
  async createTicket(data) {
    return prisma.tickets.create({
      data,
    });
  }

  async getTicketById(ticketId: string) {
    return prisma.tickets.findUnique({
      where: {
        id: ticketId,
      },
    });
  }

  async createGuildMemberTicket(
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
