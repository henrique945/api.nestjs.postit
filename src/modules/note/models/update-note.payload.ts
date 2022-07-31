import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateNotePayload {

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'O título da nota deve ser uma string' })
  @IsNotEmpty({ message: 'O título da nota não pode ser vazio' })
  @MaxLength(150, { message: 'O título da nota não pode ultrapassar 150 caracteres' })
  public title?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'O corpo da nota deve ser uma string' })
  @IsNotEmpty({ message: 'O copor da nota não pode ser vazio' })
  public annotation?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean({ message: 'A visibilidade da nota deve ser um booleano' })
  public isPublic?: boolean;

}