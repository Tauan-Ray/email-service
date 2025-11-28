import { Injectable, Logger } from '@nestjs/common';
import { PingEmail } from 'ping-email';
import { Resend } from 'resend';
import { emailConfig, resendConfig } from 'src/config/env';

@Injectable()
export class ResendService {
  private logger: Logger;
  private pingEmail: PingEmail;
  private resend: Resend;

  constructor() {
    this.resend = new Resend(resendConfig.token);
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

    if (!valid)
      this.logger.warn(
        `[EMAIL] Falha ao validar o email "${email}", ${message}`,
      );

    return valid;
  }

  async sendResetPasswordEmail(email: string, resetLink: string) {
    try {
      const { data, error } = await this.resend.emails.send({
        from: `${resendConfig.emailFrom} <${emailConfig.sender}>`,
        to: email,
        template: {
          id: resendConfig.templateResetPassword,
          variables: {
            resetLink,
          },
        },
      });

      if (error) {
        this.logger.error(`Erro ao enviar email: ${error.message}`);
        throw new Error(error.message);
      }

      this.logger.log(`Email enviado: ${data.id}`);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      this.logger.error(`Erro inesperado: ${errorMessage}`);
      return false;
    }
  }
}
