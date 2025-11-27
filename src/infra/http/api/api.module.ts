import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ResendService } from './resend/resend.service';

@Module({
  imports: [HttpModule],
  providers: [ResendService],
  exports: [ResendService],
})
export class ApiModule {}
