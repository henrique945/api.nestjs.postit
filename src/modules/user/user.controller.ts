import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserPayload } from './user.payload';
import { UserProxy } from './user.proxy';

@Controller('user')
@ApiTags('user')
export class UserController {
  
  // CRUD - Create Read Update Delete
  public listUsers: UserProxy[] = [];

  @Get('/list')
  @ApiOperation({ summary: 'Obtém os dados de todos os usuários' })
  @ApiOkResponse({ type: UserProxy, isArray: true })
  public getUsers(): UserProxy[] {
    return this.listUsers;
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Obtém um usuário pela identificação' })
  @ApiOkResponse({ type: UserProxy })
  @ApiParam({ name: 'userId', description: 'A identificação do usuário' })
  public getOneUser(@Param('userId') userId: string): UserProxy {
    const user = this.listUsers.find(user => user.id === +userId);

    if(!user)
      throw new NotFoundException('Usuário não existe.');

    return user;
  }

  @Post()
  @ApiOperation({ summary: 'Cadastra um usuário' })
  @ApiOkResponse({ type: UserProxy })
  @ApiBody({ type: UserProxy, description: 'Os dados a serem cadastrados no usuário' })
  public postUser(@Body() user: UserProxy): UserProxy {
    this.listUsers.push(user);

    return user;
  }

  @Put(':userId')
  @ApiOperation({ summary: 'Atualiza um usuário' })
  @ApiOkResponse({ type: UserProxy })
  @ApiParam({ name: 'userId', description: 'A identificação do usuário' })
  @ApiBody({ type: UserPayload, description: 'Os dados a serem atualizados do usuário' })
  public putUser(@Param('userId') userId: string, @Body() user: UserPayload): UserProxy {
    const index = this.listUsers.findIndex(user => user.id === +userId);

    if(index === -1)
      throw new NotFoundException('Usuário não existe.');

    this.listUsers[index] = this.getProxyFromPayload(user, this.listUsers[index]);

    return this.listUsers[index];
  }

  @Delete(':userId')
  @ApiOperation({ summary: 'Deleta um usuário' })
  @ApiOkResponse()
  @ApiParam({ name: 'userId', description: 'A identificação do usuário' })
  public deleteUser(@Param('userId') userId: string): void {
    this.listUsers = this.listUsers.filter(user => user.id !== +userId);
  }

  private getProxyFromPayload(payload: UserPayload, proxy: UserProxy): UserProxy {
    return new UserProxy(
      proxy.id,
      payload.name || proxy.name,
      payload.age || proxy.age,
      proxy.isGraduated,
    );
  }
}
