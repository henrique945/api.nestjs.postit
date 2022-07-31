import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ProtectTo } from 'src/decorators/protect/protect.decorator';
import { User } from 'src/decorators/user/user.decorator';
import { UserEntity } from '../entities/user.entity';
import { CreateUserPayload } from '../models/create-user.payload';
import { UpdateUserPayload } from '../models/update-user.payload';
import { UserProxy } from '../models/user.proxy';
import { UserService } from '../services/user.service';

@Controller('user')
@ApiTags('user')
export class UserController {

  constructor(
    private readonly service: UserService,
  ) {}

  @ProtectTo()
  @Get()
  @ApiOperation({ summary: 'Obtém os dados de todos os usuários' })
  @ApiOkResponse({ type: UserProxy, isArray: true })
  @ApiQuery({ name: 'search', description: 'A busca a ser realizada', required: false })
  public getUsers(@Query('search') search: string): Promise<UserProxy[]> {
    return this.service.getUsers(search).then(result => result.map(entity => new UserProxy(entity)));
  }

  @ProtectTo()
  @Get(':userId')
  @ApiOperation({ summary: 'Obtém um usuário pela identificação' })
  @ApiOkResponse({ type: UserProxy })
  @ApiParam({ name: 'userId', description: 'A identificação do usuário' })
  public getOneUser(@Param('userId') userId: string): Promise<UserProxy> {
    return this.service.getOneUser(+userId).then(entity => new UserProxy(entity));
  }

  @Post()
  @ApiOperation({ summary: 'Cadastra um usuário' })
  @ApiOkResponse({ type: UserProxy })
  @ApiBody({ type: CreateUserPayload, description: 'Os dados a serem cadastrados no usuário' })
  public postUser(@Body() user: CreateUserPayload): Promise<UserProxy> {
    return this.service.postUser(user).then(entity => new UserProxy(entity));
  }

  @ProtectTo()
  @Put(':userId')
  @ApiOperation({ summary: 'Atualiza um usuário' })
  @ApiOkResponse({ type: UserProxy })
  @ApiParam({ name: 'userId', description: 'A identificação do usuário' })
  @ApiBody({ type: UpdateUserPayload, description: 'Os dados a serem atualizados do usuário' })
  public putUser(@User() requestUser: UserEntity, @Param('userId') userId: string, @Body() user: UpdateUserPayload): Promise<UserProxy> {
    return this.service.putUser(requestUser, userId, user).then(entity => new UserProxy(entity));
  }

  @ProtectTo()
  @Delete(':userId')
  @ApiOperation({ summary: 'Deleta um usuário' })
  @ApiOkResponse()
  @ApiParam({ name: 'userId', description: 'A identificação do usuário' })
  public deleteUser(@User() requestUser: UserEntity, @Param('userId') userId: string): Promise<void> {
    return this.service.deleteUser(requestUser, userId);
  }
}
