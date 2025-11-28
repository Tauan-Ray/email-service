import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { GetEmailParams } from './dto/get-email-params.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller()
export class EmailController {
  constructor(private emailService: EmailService) {}

  @Get('email/verify/:email')
  async verifyEmail(@Param() params: GetEmailParams) {
    return await this.emailService.verifyEmail(params.email);
  }

  @Get('token/verify/:token')
  async verifyToken(@Param('token') token: string) {
    return await this.emailService.verifyToken(token);
  }

  @Get('email/change-password/:email')
  async changePassword(@Param() params: GetEmailParams) {
    return await this.emailService.forgotPasswordToken(params.email);
  }

  @Post('/update-password')
  async updatePassword(@Body() updatePassword: UpdatePasswordDto) {
    return await this.emailService.updatePassword(updatePassword);
  }
}
