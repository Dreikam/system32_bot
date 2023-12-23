import { db as prisma } from '@Services/db';

export class GuildServices {
  getGuilds() {
    return prisma.guilds.findMany();
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

  createGuild(data) {
    const { guildId, name, avatar, memberCount, members } = data;
    return prisma.guilds.create({
      data: {
        guildId,
        name,
        avatar,
        memberCount,
        members: {
          create: members.map((member) => ({
            member: {
              connectOrCreate: {
                create: {
                  name: member.name,
                  discordId: member.discordId,
                  avatar: member.avatar,
                },
                where: {
                  discordId: member.discordId,
                },
              },
            },
          })),
        },
      },
    });
  }

  updateGuild(guildId: string, data: any) {
    const { name, avatar, memberCount, members } = data;
    return prisma.guilds.update({
      where: {
        guildId,
      },
      data: {
        name,
        avatar,
        memberCount,
        members: {
          create: members.map((member) => ({
            member: {
              connectOrCreate: {
                create: {
                  name: member.name,
                  discordId: member.discordId,
                  avatar: member.avatar,
                },
                where: {
                  discordId: member.discordId,
                },
              },
            },
          })),
        },
      },
    });
  }

  deleteGuild(guildId: string) {
    return prisma.guilds.delete({
      where: {
        guildId,
      },
    });
  }
}
