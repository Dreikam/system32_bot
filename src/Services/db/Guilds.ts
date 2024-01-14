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

  getAllGuildMembers(guildId: string) {
    return prisma.guilds.findMany({
      where: {
        guildId,
      },
      include: {
        members: {
          select: {
            member: true,
          },
        },
      },
    });
  }

  createGuild(data: IGuildCreate) {
    const { guildId, name, avatar, members, channels } = data;

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
        channels: {
          create: channels.map((channel) => ({
            name: channel.name,
            channelId: channel.channelId,
            type: channel.type,
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

    const guild = await prisma.guilds.update({
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

    return { member, guild };
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
        guildId: guildId,
      },
    });
  }
}
