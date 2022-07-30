import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import { CreateUserPayload } from "../models/create-user.payload";
import { UpdateUserPayload } from "../models/update-user.payload";
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  public getRepository(): Repository<UserEntity> {
    return this.repository;
  }

  public async getUsers(search: string): Promise<UserEntity[]> {
    const users = await this.repository.find({
      order: {
        name: 'ASC',
      },
      where: search ? { name: Like('%' + search + '%'), } : { },
    });

    return users;
  }

  public async getOneUser(userId: number): Promise<UserEntity> {
    const user = await this.repository.findOneBy({ id: userId });

    if (!user)
      throw new NotFoundException('O usuário não foi encontrado');

    return user;
  }

  public async postUser(payload: CreateUserPayload): Promise<UserEntity> {
    const existingUser = await this.repository.findOneBy({ email: payload.email });

    if (existingUser)
      throw new BadRequestException('Já existe um usuário com esse email');

    const user = new UserEntity();

    const passwordSalt = await bcryptjs.genSalt();

    user.name = payload.name;
    user.email = payload.email;
    user.password = await bcryptjs.hash(payload.password, passwordSalt);
    user.role = payload.role;
    user.imageUrl = payload.imageUrl;

    return await this.repository.save(user);
  }

  public async putUser(requestUser: UserEntity, userId: string, payload: UpdateUserPayload): Promise<UserEntity> {
    const user = await this.repository.findOneBy({ id: +userId });

    if (!user)
      throw new NotFoundException('O usuário não foi encontrado');

    if (requestUser.id !== user.id)
      throw new ForbiddenException('Você não tem permissão para atualizar esse usuário');

    user.name = payload.name ?? user.name;
    user.role = payload.role ?? user.role;
    user.imageUrl = payload.imageUrl ?? user.imageUrl;

    return await this.repository.save(user);
  }

  public async deleteUser(requestUser: UserEntity, userId: string): Promise<void> {
    const user = await this.repository.findOneBy({ id: +userId });

    if (!user)
      throw new NotFoundException('O usuário não foi encontrado');

    if (requestUser.id !== user.id)
      throw new ForbiddenException('Você não tem permissão para deletar esse usuário');

    await this.repository.remove(user);
  }

}