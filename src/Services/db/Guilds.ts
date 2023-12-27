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
    const { guildId, name, avatar, members } = data;

    return prisma.guilds.create({
      data: {
        guildId,
        name,
        avatar,
        members: {
          create: members.map((member) => ({
            member: {
              connectOrCreate: {
                create: {
                  name: member.name,
                  discordId: member.discordId,
                  avatar: member.avatar,
                  bot: member.bot,
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
        memberId: {
          equals: discordId,
        },
        AND: [
          {
            guildId: {
              equals: guildId,
            },
          },
        ],
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
    const { guildId, member } = data;

    console.log(data);

    return prisma.guilds.update({
      where: {
        id: id,
        OR: [
          {
            guildId,
          },
        ],
      },
      data: {
        members: {
          create: {
            member: {
              connectOrCreate: {
                create: {
                  name: member.name,
                  discordId: member.discordId,
                  avatar: member.avatar,
                  bot: member.bot,
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

  async removeMember(relationId: string) {
    return prisma.memberGuilds.delete({
      where: {
        id: relationId,
      },
    });
  }

  async deleteGuild(guildId: string) {
    await prisma.memberGuilds.deleteMany({
      where: {
        guildId,
      },
    });
    return await prisma.guilds.delete({
      where: {
        guildId,
      },
    });
  }
}
