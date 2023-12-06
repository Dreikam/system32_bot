import { db as prisma } from '@Services/db';

export class GuildServices {
  createGuild(data: any) {
    return prisma.guilds.create({
      data,
    });
  }

  updateGuild(guildId: string, data) {
    return prisma.guilds.update({
      where: {
        guildId,
      },
      data,
    });
  }

  deleteGuild(guildId: string) {
    return prisma.guilds.delete({
      where: {
        guildId,
      },
    });
  }

  getGuild(guildId: string) {
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
