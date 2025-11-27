import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [ApiModule, EmailModule],
})
export class HttpModule {}
