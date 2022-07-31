import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsNotEmpty, IsString, Length, MaxLength } from "class-validator";

export class CreateNotePayload {

  @ApiProperty()
  @IsDefined({ message: 'O título da nota deve ser definido' })
  @IsString({ message: 'O título da nota deve ser uma string' })
  @IsNotEmpty({ message: 'O título da nota não pode ser vazio' })
  @MaxLength(150, { message: 'O título da nota não pode ultrapassar 150 caracteres' })
  public title: string;

  @ApiProperty()
  @IsDefined({ message: 'O corpo da nota deve ser definido' })
  @IsString({ message: 'O corpo da nota deve ser uma string' })
  @IsNotEmpty({ message: 'O copor da nota não pode ser vazio' })
  public annotation: string;

}