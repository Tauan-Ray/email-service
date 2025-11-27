import { Injectable } from '@nestjs/common';
import { PrismaForumService } from '../prisma.forum.service';

@Injectable()
export class PrismaUsersRepository {
  constructor(private readonly prismaService: PrismaForumService) {}
}
