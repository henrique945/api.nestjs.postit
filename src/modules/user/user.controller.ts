import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { UserPayload } from './user.payload';
import { UserProxy } from './user.proxy';

@Controller('user')
export class UserController {
  
  // CRUD - Create Read Update Delete
  public listUsers: UserProxy[] = [];

  @Get('/list')
  public getUsers(): UserProxy[] {
    return this.listUsers;
  }

  @Get(':userId')
  public getOneUser(@Param('userId') userId: string): UserProxy {
    const user = this.listUsers.find(user => user.id === +userId);

    if(!user)
      throw new NotFoundException('Usuário não existe.');

    return user;
  }

  @Post()
  public postUser(@Body() user: UserProxy): UserProxy {
    this.listUsers.push(user);

    return user;
  }

  @Put(':userId')
  public putUser(@Param('userId') userId: string, @Body() user: UserPayload): UserProxy {
    const index = this.listUsers.findIndex(user => user.id === +userId);

    if(index === -1)
      throw new NotFoundException('Usuário não existe.');

    this.listUsers[index] = this.getProxyFromPayload(user, this.listUsers[index]);

    return this.listUsers[index];
  }

  @Delete(':userId')
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
