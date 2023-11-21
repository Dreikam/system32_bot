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
    guildId,
    member: { discordId: string; name: string },
    ticketId,
    messages
  ) {
    return prisma.guildToMemberTickets.create({
      data: {
        guild: {
          connect: {
            guildId,
          },
        },
        member: {
          connectOrCreate: {
            create: {
              discordId: member.discordId,
              name: member.name,
            },
            where: {
              discordId: member.discordId,
            },
          },
        },
        ticket: {
          connect: {
            id: ticketId,
          },
        },
        messages,
      },
    });
  }
}
