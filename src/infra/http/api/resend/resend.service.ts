import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { PingEmail } from 'ping-email';
import { emailConfig } from 'src/config/env';

@Injectable()
export class ResendService {
  private logger: Logger;
  private pingEmail: PingEmail;

  constructor(private http: HttpService) {
    this.logger = new Logger(ResendService.name);
    this.pingEmail = new PingEmail({
      ignoreSMTPVerify: true,
      port: emailConfig.port,
      fqdn: emailConfig.domain,
      sender: emailConfig.sender,
      timeout: 10000,
      attempts: 3,
    });
  }

  async getEmailIsExists(email: string): Promise<boolean> {
    const { valid, message } = await this.pingEmail.ping(email);
    console.log({ valid, message });

    if (!valid)
      this.logger.warn(
        `[EMAIL] Falha ao validar o email "${email}", ${message}`,
      );

    return valid;
  }
}
