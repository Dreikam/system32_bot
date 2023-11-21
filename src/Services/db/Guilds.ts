import { db as prisma } from '@Services/db';

export class GuildServices {
  async createGuild(data) {
    return prisma.guilds.create({
      data,
    });
  }

  async updateGuild(guildId: string, data) {
    return prisma.guilds.update({
      where: {
        guildId,
      },
      data,
    });
  }

  async deleteGuild(guildId: string) {
    return prisma.guilds.delete({
      where: {
        guildId,
      },
    });
  }

  async getGuild(guildId: string) {
    return prisma.guilds.findFirst({
      where: {
        OR: [
          {
            guildId: {
              equals: guildId,
            },
          },
          {
            id: {
              equals: guildId,
            },
          },
        ],
      },
    });
  }
}
