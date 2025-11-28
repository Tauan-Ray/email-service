import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  @Length(8, 20, {
    message: 'A nova senha deve conter no minímo 8 caracteres e no máximo 20',
  })
  newPassword: string;

  @IsString({ message: 'O token deve ser uma string' })
  @IsNotEmpty({ message: 'o campo "token" não pode estar vazio' })
  token: string;
}
