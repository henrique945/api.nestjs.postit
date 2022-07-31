import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ProtectTo } from "src/decorators/protect/protect.decorator";
import { User } from "src/decorators/user/user.decorator";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { CreateNoteCommentPayload } from "../models/create-note-comment.payload";
import { NoteCommentProxy } from "../models/note-comment.proxy";
import { NoteCommentService } from "../services/note-comment.service";

@Controller('note/:noteId/comment')
@ApiTags('note/comment')
export class NoteCommentController {

  constructor(
    private readonly service: NoteCommentService,
  ) {}

  @ProtectTo()
  @Get()
  @ApiOperation({ summary: 'Obtém os comentários de uma nota' })
  @ApiOkResponse({ type: NoteCommentProxy, isArray: true })
  public getMany(@User() requestUser: UserEntity, @Param('noteId') noteId: string): Promise<NoteCommentProxy[]> {
    return this.service.getMany(requestUser, +noteId).then(result => result.map(entity => new NoteCommentProxy(entity)));
  }

  @ProtectTo()
  @Post()
  @ApiOperation({ summary: 'Cria um comentário em uma nota' })
  @ApiBody({ type: CreateNoteCommentPayload })
  @ApiOkResponse({ type: NoteCommentProxy })
  public createOne(@User() requestUser: UserEntity, @Param('noteId') noteId: string, @Body() payload: CreateNoteCommentPayload): Promise<NoteCommentProxy> {
    return this.service.createOne(requestUser, +noteId, payload).then(entity => new NoteCommentProxy(entity));
  }

  @ProtectTo()
  @Delete(':noteCommentId')
  @ApiOperation({ summary: 'Deleta um comentário de uma nota' })
  public deleteOne(@User() requestUser: UserEntity, @Param('noteId') noteId: string, @Param('noteCommentId') noteCommentId: string): Promise<void> {
    return this.service.deleteOne(requestUser, +noteId, +noteCommentId);
  }

}