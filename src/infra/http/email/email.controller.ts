import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { EmailService } from './email.service';
import { GetEmailParams } from './dto/get-email-params.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ApiKeyGuard } from 'src/common/guard/apiKeyGuard';

@Controller()
export class EmailController {
  constructor(private emailService: EmailService) {}

  @Get('email/verify/:email')
  @UseGuards(ApiKeyGuard)
  async verifyEmail(@Param() params: GetEmailParams) {
    return await this.emailService.verifyEmail(params.email);
  }

  @Get('token/verify/:token')
  @UseGuards(ApiKeyGuard)
  async verifyToken(@Param('token') token: string) {
    return await this.emailService.verifyToken(token);
  }

  @Get('email/change-password/:email')
  @UseGuards(ApiKeyGuard)
  async changePassword(@Param() params: GetEmailParams) {
    return await this.emailService.forgotPasswordToken(params.email);
  }

  @Post('/update-password')
  @UseGuards(ApiKeyGuard)
  async updatePassword(@Body() updatePassword: UpdatePasswordDto) {
    return await this.emailService.updatePassword(updatePassword);
  }
}
