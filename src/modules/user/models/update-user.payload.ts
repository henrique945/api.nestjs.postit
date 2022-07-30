import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class UpdateUserPayload {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'O nome deve ser uma string' })
  @MinLength(2, { message: 'O nome deve ser maior ou igual a 2 caracteres' })
  public name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 0 }, { message: 'A idade deve ser um número inteiro' })
  @IsPositive({ message: 'A idade deve ser um número positivo' })
  public age: number;
}