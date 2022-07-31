import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ProtectTo } from "src/decorators/protect/protect.decorator";
import { User } from "src/decorators/user/user.decorator";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { CreateNotePayload } from "../models/create-note.payload";
import { NoteProxy } from "../models/note.proxy";
import { UpdateNotePayload } from "../models/update-note.payload";
import { NoteService } from "../services/note.service";

@Controller('note')
@ApiTags('note')
export class NoteController {

  constructor(
    private readonly service: NoteService,
  ) {}

  @ProtectTo()
  @Get('me')
  @ApiOperation({ summary: 'Obtém as notas criadas pelo usuário logado' })
  @ApiOkResponse({ type: NoteProxy, isArray: true })
  public getMe(@User() requestUser: UserEntity): Promise<NoteProxy[]> {
    return this.service.getMe(requestUser).then(result => result.map(entity => new NoteProxy(entity)));
  }

  @ProtectTo()
  @Get('feed/:userId')
  @ApiOperation({ summary: 'Obtém as notas publicas de um usuário' })
  @ApiOkResponse({ type: NoteProxy, isArray: true })
  public getByUser(@Param('userId') userId: string): Promise<NoteProxy[]> {
    return this.service.getPublicByUser(+userId).then(result => result.map(entity => new NoteProxy(entity)));
  }

  @ProtectTo()
  @Get('feed')
  @ApiOperation({ summary: 'Obtém as notas publicas' })
  @ApiOkResponse({ type: NoteProxy, isArray: true })
  public getPublic(@User() requestUser: UserEntity): Promise<NoteProxy[]> {
    return this.service.getPublic(requestUser).then(result => result.map(entity => new NoteProxy(entity)));
  }

  @ProtectTo()
  @Get(':noteId')
  @ApiOperation({ summary: 'Obtém uma nota' })
  @ApiOkResponse({ type: NoteProxy })
  public getOne(@User() requestUser: UserEntity, @Param('noteId') noteId: string): Promise<NoteProxy> {
    return this.service.getOne(requestUser, +noteId).then(entity => new NoteProxy(entity));
  }

  @ProtectTo()
  @Post()
  @ApiOperation({ summary: 'Cria uma nota' })
  @ApiBody({ type: CreateNotePayload })
  @ApiOkResponse({ type: NoteProxy })
  public createOne(@User() requestUser: UserEntity, @Body() payload: CreateNotePayload): Promise<NoteProxy> {
    return this.service.createOne(requestUser, payload).then(entity => new NoteProxy(entity));
  }

  @ProtectTo()
  @Put(':noteId')
  @ApiOperation({ summary: 'Atualiza uma nota' })
  @ApiBody({ type: UpdateNotePayload })
  @ApiOkResponse({ type: NoteProxy })
  public updateOne(@User() requestUser: UserEntity, @Param('noteId') noteId: string, @Body() payload: UpdateNotePayload): Promise<NoteProxy> {
    return this.service.updateOne(requestUser, +noteId, payload).then(entity => new NoteProxy(entity));
  }

  @ProtectTo()
  @Delete(':noteId')
  @ApiOperation({ summary: 'Deleta uma nota' })
  public deleteOne(@User() requestUser: UserEntity, @Param('noteId') noteId: string): Promise<void> {
    return this.service.deleteOne(requestUser, +noteId);
  }

}