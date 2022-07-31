import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { NoteProxy } from "src/modules/note/models/note.proxy";
import { UserProxy } from "src/modules/user/models/user.proxy";
import { NoteCommentEntity } from "../entities/note-comment.entity";

export class NoteCommentProxy {

  constructor(entity: NoteCommentEntity) {
    this.id = entity.id;
    this.comment = entity.comment;
    this.createdAt = entity.createdAt;
    this.userId = entity.userId;
    this.noteId = entity.noteId;

    if (entity.user)
      this.user = new UserProxy(entity.user);

    if (entity.note)
      this.note = new NoteProxy(entity.note);
  }

  @ApiProperty()
  public id: number;

  @ApiProperty()
  public comment: string;

  @ApiProperty()
  public createdAt: Date;

  @ApiProperty()
  public userId: number;

  @ApiProperty()
  public noteId: number;

  @ApiPropertyOptional({ type: () => UserProxy })
  public user?: UserProxy;

  @ApiPropertyOptional({ type: () => NoteProxy })
  public note?: NoteProxy;

}