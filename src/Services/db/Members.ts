import { db as prisma } from "@Services/db";

export class MembersServices {
  async createMember(data) {
    return prisma.members.create({
      data
    });
  }

  async getMemberById(memberId: string) {
    return prisma.members.findUnique({
      where: {
        id: memberId,
      },
    });
  }

  async getAllMembersByGuild(guildId: string) {
    return prisma.members.findMany({
      where: {
        guildId,
      },
    });
  }

  async updateMember(memberId: string, data) {
    return prisma.members.update({
      where: {
        id: memberId,
      },
      data,
    });
  }

  async deleteMember(memberId: string) {
    return prisma.members.delete({
      where: {
        id: memberId,
      },
    });
  }
}
