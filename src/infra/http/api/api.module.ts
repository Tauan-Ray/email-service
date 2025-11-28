import { Module } from '@nestjs/common';
import { ResendService } from './resend/resend.service';

@Module({
  imports: [],
  providers: [ResendService],
  exports: [ResendService],
})
export class ApiModule {}
