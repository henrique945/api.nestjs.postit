import { Injectable, NotFoundException } from "@nestjs/common";
import { UserPayload } from "../models/user.payload";
import { UserProxy } from "../models/user.proxy";

@Injectable()
export class UserService {

  // CRUD - Create Read Update Delete
  public listUsers: UserProxy[] = [];

  public getUsers(): UserProxy[] {
    return this.listUsers;
  }

  public getOneUser(userId: string): UserProxy {
    const user = this.listUsers.find(user => user.id === +userId);

    if (!user)
      throw new NotFoundException('Usuário não existe.');

    return user;
  }

  public postUser(user: UserProxy): UserProxy {
    this.listUsers.push(user);

    return user;
  }

  public putUser(userId: string, user: UserPayload): UserProxy {
    const index = this.listUsers.findIndex(user => user.id === +userId);

    if(index === -1)
      throw new NotFoundException('Usuário não existe.');

    this.listUsers[index] = this.getProxyFromPayload(user, this.listUsers[index]);

    return this.listUsers[index];
  }

  public deleteUser(userId: string): void {
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