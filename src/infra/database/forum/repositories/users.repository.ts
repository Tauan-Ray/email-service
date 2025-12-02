import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaForumService } from '../prisma.forum.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PrismaUsersRepository {
  constructor(private readonly prismaService: PrismaForumService) {}

  async findByEmail(email: string) {
    const find = await this.prismaService.users.findFirst({
      where: { EMAIL: email, DEL_AT: null },
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

  async compareSamePassword(newPassword: string, ID_USER: string) {
    const existingUser = await this.prismaService.users.findUnique({
      where: { ID_USER },
    });

    const isSamePassword = await bcrypt.compare(
      newPassword,
      existingUser.PASSWORD,
    );

    if (isSamePassword) {
      throw new BadRequestException('Sua senha não pode ser igual a atual!');
    }
  }
}
