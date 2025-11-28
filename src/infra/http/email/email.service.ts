import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ResendService } from '../api/resend/resend.service';
import { PrismaUsersRepository } from 'src/infra/database/forum/repositories/users.repository';
import { PrismaTokenResetRepository } from 'src/infra/database/forum/repositories/tokenReset.repository';
import { generateResetToken } from './helpers/generateResetToken';
import { forumWeb } from 'src/config/env';
import crypto from 'crypto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class EmailService {
  constructor(
    private resendService: ResendService,
    private usersRepository: PrismaUsersRepository,
    private tokenReset: PrismaTokenResetRepository,
  ) {}

  private readonly logger = new Logger(EmailService.name);

  async verifyEmail(email: string) {
    this.logger.log(`[EMAIL] Verificando existência do email "${email}"`);

    const emailIsValid = await this.resendService.getEmailIsExists(email);

    if (!emailIsValid)
      throw new BadRequestException(`Este "${email}" não é um email válido`);

    return emailIsValid;
  }

  async verifyToken(token: string) {
    this.logger.log(`[EMAIL] Verificando token "${token}"`);
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    const existingToken = await this.tokenReset.getTokenByTokenHash(tokenHash);

    if (!existingToken) {
      throw new BadRequestException('Token inválido ou expirado');
    }

    const { TOKEN, ...data } = existingToken;

    return data;
  }

  async forgotPasswordToken(email: string) {
    this.logger.log(`[EMAIL] Gerando token para reset de password "${email}"`);

    const emailIsValid = await this.resendService.getEmailIsExists(email);

    if (!emailIsValid)
      throw new BadRequestException(`Este "${email}" não é um email válido`);

    const existingEmail = await this.usersRepository.findByEmail(email);

    if (!existingEmail) return;

    const existingToken = await this.tokenReset.getTokenByUserId(
      existingEmail.ID_USER,
    );

    if (existingToken)
      throw new BadRequestException(
        'Já existe um token ativo para este usuário.',
      );

    const { token, tokenHash } = generateResetToken();

    await this.tokenReset.create(tokenHash, existingEmail.ID_USER);

    const resetLink = `${forumWeb.url}:${forumWeb.port}/reset?token=${token}`;

    const deliveredEmail = await this.resendService.sendResetPasswordEmail(
      email,
      resetLink,
    );

    if (!deliveredEmail)
      throw new BadRequestException(
        'Erro ao enviar e-mail para redefinição de senha',
      );
  }

  async updatePassword({ newPassword, token }: UpdatePasswordDto) {
    const existingToken = await this.verifyToken(token);

    await this.usersRepository.updateUserPassword(
      newPassword,
      existingToken.ID_USER,
    );

    await this.tokenReset.markTokenAsUsed(existingToken.ID_TOKEN);

    this.logger.log(`[EMAIL] Senha do "${existingToken.ID_USER}" atualizado`);

    return {
      message: 'Senha atualizada com sucesso!',
    };
  }
}
