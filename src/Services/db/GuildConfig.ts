import { db as prisma } from '@Services/db';

export class GuildConfigsServices {
  getConfig(guildId: string) {
    return prisma.guildConfig.findFirst({
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

  createConfig(guildId: string, data: any) {
    const {
      logsChannel,
      modRoles,
      ticketChannel,
      ticketSection,
      announcementsChannel,
      welcomeChannel,
    } = data;

    return prisma.guilds.update({
      where: {
        guildId,
      },
      data: {
        config: {
          create: {
            logsChannel,
            modRoles,
            ticketChannel,
            ticketSection,
            announcementsChannel,
            welcomeChannel,
          },
        },
      },
      include: {
        config: true,
      },
    });
  }

  updateConfig(id: string, data: any) {
    const {
      logsChannel,
      modRoles,
      ticketChannel,
      ticketSection,
      announcementsChannel,
      welcomeChannel,
    } = data;

    return prisma.guildConfig.update({
      where: {
        id,
      },
      data: {
        logsChannel,
        modRoles,
        ticketChannel,
        ticketSection,
        announcementsChannel,
        welcomeChannel,
      },
    });
  }

  deleteConfig(id: string) {
    return prisma.guildConfig.delete({
      where: {
        id,
      },
    });
  }
}
