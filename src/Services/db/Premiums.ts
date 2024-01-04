import { db as prisma } from '@Services/db';

export class PremiumsServices {
  getAllPremiums() {
    return prisma.premium.findMany({
      select: {
        id: true,
        guild: true,
        member: true,
        token: true,
      },
    });
  }

  getGuildPremium(data: any) {
    const { guildId, tokenId } = data;
    return prisma.premium.findFirst({
      where: {
        OR: [
          {
            guildId: {
              equals: guildId,
            },
          },
          {
            tokenId: {
              equals: tokenId,
            },
          },
        ],
      },
      select: {
        id: true,
        guild: true,
        member: true,
        token: true,
      },
    });
  }

  getPremiumByMember(memberId: string) {
    return prisma.premium.findMany({
      where: {
        memberId: {
          equals: memberId,
        },
      },
      select: {
        id: true,
        guild: true,
        member: true,
        token: true,
      },
    });
  }

  redeemCode(data: any) {
    const { guildId, memberId, tokenId } = data;
    return prisma.premium.create({
      data: {
        guild: {
          connect: {
            guildId: guildId,
          },
        },
        member: {
          connect: {
            discordId: memberId,
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
}
