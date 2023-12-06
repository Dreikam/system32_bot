import { db as prisma } from '@Services/db';

export class MembersServices {
  createMember(data) {
    return prisma.members.create({
      data,
    });
  }

  getMemberById(memberId: string) {
    return prisma.members.findFirst({
      where: {
        discordId: memberId,
      },
    });
  }

  getAllMembersByGuild(guildId: string) {
    return prisma.memberGuilds.findMany({
      where: {
        guildId,
      },
    });
  }

  updateMember(memberId: string, data) {
    return prisma.members.update({
      where: {
        id: memberId,
      },
      data,
    });
  }

  deleteMember(memberId: string) {
    return prisma.members.delete({
      where: {
        id: memberId,
      },
    });
  }
}
