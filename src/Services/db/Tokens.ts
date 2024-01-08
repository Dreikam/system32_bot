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

  createToken(token: string) {
    return prisma.tokens.create({
      data: {
        token,
      },
    });
  }

  updateToken(id: string, token: string) {
    return prisma.tokens.update({
      where: {
        id,
      },
      data: {
        token,
      },
    });
  }

  deleteToken(id: string) {
    return prisma.tokens.delete({
      where: {
        id,
      },
    });
  }
}
