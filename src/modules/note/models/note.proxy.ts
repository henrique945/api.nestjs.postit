import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { UserProxy } from "src/modules/user/models/user.proxy";
import { NoteEntity } from "../entities/note.entity";

export class NoteProxy {

  constructor(entity: NoteEntity) {
    this.id = entity.id;
    this.title = entity.title;
    this.annotation = entity.annotation;
    this.isPublic = entity.isPublic;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
    this.userId = entity.userId;

    if (entity.user)
      this.user = new UserProxy(entity.user);
  }

  @ApiProperty()
  public id: number;

  @ApiProperty()
  public title: string;

  @ApiProperty()
  public annotation: string;

  @ApiProperty()
  public isPublic: boolean;

  @ApiProperty()
  public createdAt: Date;

  @ApiProperty()
  public updatedAt: Date;

  @ApiProperty()
  public userId: number;

  @ApiPropertyOptional({ type: UserProxy })
  public user?: UserProxy;

}