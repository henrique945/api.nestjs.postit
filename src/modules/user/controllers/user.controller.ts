import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserPayload } from '../models/user.payload';
import { UserProxy } from '../models/user.proxy';
import { UserService } from '../services/user.service';

@Controller('user')
@ApiTags('user')
export class UserController {

  constructor(
    private readonly service: UserService,
  ) {}

  @Get('/list')
  @ApiOperation({ summary: 'Obtém os dados de todos os usuários' })
  @ApiOkResponse({ type: UserProxy, isArray: true })
  public getUsers(): UserProxy[] {
    return this.service.getUsers();
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Obtém um usuário pela identificação' })
  @ApiOkResponse({ type: UserProxy })
  @ApiParam({ name: 'userId', description: 'A identificação do usuário' })
  public getOneUser(@Param('userId') userId: string): UserProxy {
    return this.service.getOneUser(userId);
  }

  @Post()
  @ApiOperation({ summary: 'Cadastra um usuário' })
  @ApiOkResponse({ type: UserProxy })
  @ApiBody({ type: UserProxy, description: 'Os dados a serem cadastrados no usuário' })
  public postUser(@Body() user: UserProxy): UserProxy {
    return this.service.postUser(user);
  }

  @Put(':userId')
  @ApiOperation({ summary: 'Atualiza um usuário' })
  @ApiOkResponse({ type: UserProxy })
  @ApiParam({ name: 'userId', description: 'A identificação do usuário' })
  @ApiBody({ type: UserPayload, description: 'Os dados a serem atualizados do usuário' })
  public putUser(@Param('userId') userId: string, @Body() user: UserPayload): UserProxy {
    return this.service.putUser(userId, user);
  }

  @Delete(':userId')
  @ApiOperation({ summary: 'Deleta um usuário' })
  @ApiOkResponse()
  @ApiParam({ name: 'userId', description: 'A identificação do usuário' })
  public deleteUser(@Param('userId') userId: string): void {
    this.service.deleteUser(userId);
  }
}
