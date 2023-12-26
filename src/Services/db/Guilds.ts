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

  getRelation(guildId: string, discordId: string) {
    return prisma.memberGuilds.findFirst({
      where: {
        memberId: discordId,
        guildId: guildId,
      },
    });
  }

  updateGuild(id: string, data: any) {
    const { guildId, name, avatar } = data;

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
        avatar,
      },
    });
  }

  async addMember(id: string, data: any) {
    const { guildId, memberCount, member } = data;

    return prisma.guilds.update({
      where: {
        id,
        OR: [
          {
            guildId: guildId,
          },
        ],
      },
      data: {
        memberCount,
        members: {
          create: {
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
          },
        },
      },
    });
  }

  async removeMember(id: string, data: any, relationId: string) {
    const { guildId, memberCount, discordId } = data;

    prisma.guilds.update({
      where: {
        id,
        OR: [
          {
            guildId: guildId,
          },
        ],
      },
      data: {
        memberCount,
      },
    });

    return prisma.memberGuilds.delete({
      where: {
        id: relationId,
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
