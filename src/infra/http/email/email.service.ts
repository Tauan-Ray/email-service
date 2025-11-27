import { Injectable } from '@nestjs/common';
import { ResendService } from '../api/resend/resend.service';
import { PrismaUsersRepository } from 'src/infra/database/forum/repositories/users.repository';
import { PrismaTokenResetRepository } from 'src/infra/database/forum/repositories/tokenReset.repository';

@Injectable()
export class EmailService {
  constructor(
    private resendService: ResendService,
    private usersRepository: PrismaUsersRepository,
    private tokenReset: PrismaTokenResetRepository,
  ) {}
}
