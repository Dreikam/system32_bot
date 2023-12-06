import { db as prisma } from '@Services/db';

export class TokensService {
  createToken(data) {
    return prisma.tokens.create({
      data,
    });
  }

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

  updateToken(id: string, data) {
    return prisma.tokens.update({
      where: {
        id,
      },
      data,
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
