import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsNotEmpty, IsString, Length, MaxLength } from "class-validator";

export class CreateNoteCommentPayload {

  @ApiProperty()
  @IsDefined({ message: 'O conteúdo do comentário deve ser definido' })
  @IsString({ message: 'O conteúdo do comentário deve ser uma string' })
  @IsNotEmpty({ message: 'O conteúdo do comentário não pode ser vazio' })
  @MaxLength(250, { message: 'O conteúdo do comentário não pode ultrapassar 250 caracteres' })
  public comment: string;

}