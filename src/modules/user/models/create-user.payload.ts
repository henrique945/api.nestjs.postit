import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsDefined, IsEmail, IsNumber, IsOptional, IsPositive, IsString, IsUrl, MinLength } from "class-validator";

export class CreateUserPayload {
  @ApiProperty()
  @IsDefined({ message: 'O nome deve ser definido' })
  @IsString({ message: 'O nome deve ser uma string' })
  @MinLength(2, { message: 'O nome deve ser maior ou igual a 2 caracteres' })
  public name: string;

  @ApiProperty()
  @IsDefined({ message: 'O email deve ser definido' })
  @IsString({ message: 'O email deve ser uma string' })
  @IsEmail({ message: 'O email não é válido' })
  public email: string;

  @ApiProperty()
  @IsDefined({ message: 'A senha deve ser definida' })
  @IsString({ message: 'A senha deve ser uma string' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  public password: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'O cargo deve ser uma string' })
  public role?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'A URL da imagem deve ser uma string' })
  @IsUrl({}, { message: 'A URL deve ser válida' })
  public imageUrl?: string;
}