import { Injectable } from '@nestjs/common';
import { PrismaForumService } from '../prisma.forum.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PrismaUsersRepository {
  constructor(private readonly prismaService: PrismaForumService) {}

  async findByEmail(email: string) {
    const find = await this.prismaService.users.findFirst({
      where: { EMAIL: email },
    });

    return find;
  }

  async updateUserPassword(newPassword: string, ID_USER: string) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.prismaService.users.update({
      where: {
        ID_USER,
      },
      data: {
        PASSWORD: hashedPassword,
      },
    });
  }
}
