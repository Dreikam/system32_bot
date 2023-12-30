import { db as prisma } from '@Services/db';
import { IMembers } from '@Interfaces/Members.interace';

export class MembersServices {
  getMemberById(discordId: string) {
    return prisma.members.findFirst({
      where: {
        OR: [
          {
            discordId: {
              equals: discordId,
            },
          },
          {
            id: {
              equals: discordId,
            },
          },
        ],
      },
    });
  }

  getAllMemberGuilds(discordId: string) {
    return prisma.memberGuilds.findMany({
      where: {
        memberId: {
          equals: discordId,
        },
      },
      include: {
        guild: true,
      },
    });
  }

  createMember(data: IMembers) {
    const { discordId, name, avatar, banner, bot } = data;
    return prisma.members.create({
      data: {
        discordId,
        name,
        avatar,
        banner,
        bot,
      },
    });
  }

  updateMember(discordId: string, data: IMembers) {
    const { name, avatar, banner, bot } = data;

    return prisma.members.update({
      where: {
        discordId: discordId,
      },
      data: {
        name,
        avatar,
        banner,
        bot,
      },
    });
  }

  deleteMember(discordId: string) {
    return prisma.members.delete({
      where: {
        discordId: discordId,
      },
    });
  }
}
