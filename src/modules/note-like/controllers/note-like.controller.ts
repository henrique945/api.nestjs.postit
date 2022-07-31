import { Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ProtectTo } from "src/decorators/protect/protect.decorator";
import { User } from "src/decorators/user/user.decorator";
import { NoteProxy } from "src/modules/note/models/note.proxy";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { NoteLikeService } from "../services/note-like.service";

@Controller('note')
@ApiTags('note/like')
export class NoteLikeController {

  constructor(
    private readonly service: NoteLikeService,
  ) {}

  @ProtectTo()
  @Get('like')
  @ApiOperation({ summary: 'Obtém as notas curtidas pelo usuário logado' })
  @ApiOkResponse({ type: NoteProxy, isArray: true })
  public getMany(@User() requestUser: UserEntity): Promise<NoteProxy[]> {
    return this.service.getMany(requestUser).then(result => result.map(entity => new NoteProxy(entity)));
  }

  @ProtectTo()
  @Post(':noteId/like')
  @ApiOperation({ summary: 'Adiciona uma curtida em uma nota' })
  @ApiOkResponse()
  public async addLike(@User() requestUser: UserEntity, @Param('noteId') noteId: string): Promise<void> {
    await this.service.addLike(requestUser, +noteId);
  }

  @ProtectTo()
  @Delete(':noteId/like')
  @ApiOperation({ summary: 'Remove a curtida de uma nota' })
  public removeLike(@User() requestUser: UserEntity, @Param('noteId') noteId: string): Promise<void> {
    return this.service.removeLike(requestUser, +noteId);
  }

}