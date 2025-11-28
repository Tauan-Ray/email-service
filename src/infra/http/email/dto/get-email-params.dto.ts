import {
  IsEmail,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class GetEmailParams {
  @IsString()
  @IsEmail({}, { message: 'e-mail deve ser um e-mail válido' })
  email: string;

  @IsString()
  @IsNumberString({}, { message: 'o código deve ser uma sequência numérica' })
  @IsOptional()
  @Length(6, 6, { message: 'o código deve ser igual a 6 caracteres' })
  code?: string;
}
