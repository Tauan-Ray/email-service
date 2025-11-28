import { Injectable } from '@nestjs/common';
import { PrismaForumService } from '../prisma.forum.service';

@Injectable()
export class PrismaTokenResetRepository {
  constructor(private readonly prismaService: PrismaForumService) {}

  async create(tokenHash: string, ID_USER: string) {
    await this.prismaService.tokenReset.create({
      data: {
        TOKEN: tokenHash,
        ID_USER,
        EXPIRATION: new Date(Date.now() + 1000 * 60 * 15),
      },
    });
  }

  async getTokenByUserId(ID_USER: string) {
    const find = await this.prismaService.tokenReset.findFirst({
      where: {
        ID_USER,
        USED: false,
        EXPIRATION: { gt: new Date() },
      },
    });

    return find;
  }

  async getTokenByTokenHash(TOKEN: string) {
    const find = await this.prismaService.tokenReset.findFirst({
      where: {
        TOKEN,
        USED: false,
        EXPIRATION: { gt: new Date() },
      },
    });

    return find;
  }

  async markTokenAsUsed(ID_TOKEN: string) {
    await this.prismaService.tokenReset.update({
      where: { ID_TOKEN },
      data: { USED: true },
    });
  }
}
