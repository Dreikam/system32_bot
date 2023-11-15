import { db as prisma } from "@Services/db";

export class PremiumServices {
  async createPremium(guildId: string, memberId: string, tokenId: string) {
    return prisma.premium.create({
      data: {
        guild: {
          connect: {
            guildId,
          },
        },
        member: {
          connect: {
            id: memberId,
          },
        },
        token: {
          connect: {
            id: tokenId,
          },
        },
      },
    });
  }

  async getPremium(premiumId: string) {
    return prisma.premium.findFirst({
      where: {
        id: premiumId,
      },
    });
  }

  async updatePremium(premiumId: string, data) {
    return prisma.premium.update({
      where: {
        id: premiumId,
      },
      data,
    });
  }

  async deletePremium(premiumId: string) {
    return prisma.premium.delete({
      where: {
        id: premiumId,
      }
    });
  }
}
