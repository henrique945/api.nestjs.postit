import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, IsUrl, MinLength } from "class-validator";

export class UpdateUserPayload {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'O nome deve ser uma string' })
  @MinLength(2, { message: 'O nome deve ser maior ou igual a 2 caracteres' })
  public name?: string;

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