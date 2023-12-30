import { db as prisma } from '@Services/db';
import { IGuildCreate, IGuildUpdate } from '@Interfaces/Guilds.interface';

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

  getRelation(guildId: string, discordId: string) {
    return prisma.memberGuilds.findFirst({
      where: {
        AND: [
          {
            guildId: {
              equals: guildId,
            },
            memberId: {
              equals: discordId,
            },
          },
        ],
      },
    });
  }

  createGuild(data: IGuildCreate) {
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

  updateGuild(guildId: string, data: IGuildUpdate) {
    const { name, avatar } = data;

    return prisma.guilds.update({
      where: {
        guildId,
      },
      data: {
        name,
        avatar,
      },
    });
  }

  async addMember(data: IGuildUpdate) {
    const { guildId, member } = data;

    return prisma.guilds.update({
      where: {
        guildId,
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

  async removeMember(id: string) {
    return prisma.memberGuilds.delete({
      where: {
        id,
      },
      include: {
        member: true,
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
