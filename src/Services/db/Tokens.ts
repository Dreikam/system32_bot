import { db as prisma } from "@Services/db";

export class TokensService {
  async createToken(data) {
    return prisma.tokens.create({
      data,
    });
  }

  async getToken(id: string) {
    return prisma.tokens.findUnique({
      where: {
        id,
      },
    });
  }

  async updateToken(id: string, data) {
    return prisma.tokens.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteToken(id: string) {
    return prisma.tokens.delete({
      where: {
        id,
      },
    });
  }
}