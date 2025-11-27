import { Module } from '@nestjs/common';
import { PrismaForumService } from './forum/prisma.forum.service';
import { PrismaUsersRepository } from './forum/repositories/users.repository';
import { PrismaTokenResetRepository } from './forum/repositories/tokenReset.repository';

@Module({
  providers: [
    PrismaForumService,
    PrismaUsersRepository,
    PrismaTokenResetRepository,
  ],
  exports: [PrismaUsersRepository, PrismaTokenResetRepository],
})
export class DatabaseModule {}
