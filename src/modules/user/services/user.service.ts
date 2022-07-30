import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import { CreateUserPayload } from "../models/create-user.payload";
import { UpdateUserPayload } from "../models/update-user.payload";
import { UserProxy } from "../models/user.proxy";

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

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

  public postUser(user: CreateUserPayload): UserProxy {
    this.listUsers.push(user);

    return user;
  }

  public putUser(userId: string, user: UpdateUserPayload): UserProxy {
    const index = this.listUsers.findIndex(user => user.id === +userId);

    if(index === -1)
      throw new NotFoundException('Usuário não existe.');

    this.listUsers[index] = this.getProxyFromPayload(user, this.listUsers[index]);

    return this.listUsers[index];
  }

  public deleteUser(userId: string): void {
    this.listUsers = this.listUsers.filter(user => user.id !== +userId);
  }

  private getProxyFromPayload(payload: UpdateUserPayload, proxy: UserProxy): UserProxy {
    return new UserProxy(
      proxy.id,
      payload.name || proxy.name,
      payload.age || proxy.age,
      proxy.isGraduated,
    );
  }

}