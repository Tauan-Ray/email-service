import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { ApiModule } from '../api/api.module';
import { EmailService } from './email.service';
import { DatabaseModule } from 'src/infra/database/database.module';

@Module({
  imports: [ApiModule, DatabaseModule],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
