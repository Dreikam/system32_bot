import { db as prisma } from '@Services/db';

export class GuildServices {
  getGuilds() {
    return prisma.guilds.findMany();
  }

  getGuild(id: string) {
    return prisma.guilds.findFirst({
      where: {
        OR: [
          {
            guildId: {
              equals: id,
            },
          },
          {
            id: {
              equals: id,
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

  updateGuild(id: string, data: any) {
    const { guildId, name, avatar, memberCount, members } = data;
    return prisma.guilds.update({
      where: {
        id: id,
        OR: [
          {
            guildId: guildId,
          },
        ],
      },
      data: {
        name,
        guildId,
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
