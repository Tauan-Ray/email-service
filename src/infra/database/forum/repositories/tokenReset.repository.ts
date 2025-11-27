import { Injectable } from '@nestjs/common';
import { PrismaForumService } from '../prisma.forum.service';

@Injectable()
export class PrismaTokenResetRepository {
  constructor(private readonly prismaService: PrismaForumService) {}
}
