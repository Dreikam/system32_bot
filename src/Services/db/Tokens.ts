import { db as prisma } from '@Services/db';

export class TokensServices {
  getToken(id: string) {
    return prisma.tokens.findFirst({
      where: {
        OR: [
          {
            id: {
              equals: id,
            },
          },
          {
            token: {
              equals: id,
            },
          },
        ],
      },
    });
  }

  getAllTokens() {
    return prisma.tokens.findMany();
  }

  createToken(token: string, data: any) {
    const { price, memberId, expiresIn } = data;
    return prisma.tokens.create({
      data: {
        token,
        price,
        expiresIn,
        member: {
          connect: {
            discordId: memberId,
          },
        },
      },
    });
  }

  // updateToken(id: string, token: string) {
  //   return prisma.tokens.update({
  //     where: {
  //       id,
  //     },
  //     data: {
  //       token,
  //     },
  //   });
  // }

  deleteToken(id: string) {
    return prisma.tokens.delete({
      where: {
        id,
      },
    });
  }
}
