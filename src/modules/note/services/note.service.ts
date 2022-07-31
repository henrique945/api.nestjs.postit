import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { IsNull, Repository } from "typeorm";
import { NoteEntity } from "../entities/note.entity";
import { CreateNotePayload } from "../models/create-note.payload";
import { UpdateNotePayload } from "../models/update-note.payload";

@Injectable()
export class NoteService {

  constructor(
    @InjectRepository(NoteEntity)
    private readonly repository: Repository<NoteEntity>,
  ) {}

  public async getMe(requestUser: UserEntity): Promise<NoteEntity[]> {
    return await this.repository.find({
      where: {
        userId: requestUser.id,
      },
      order: {
        createdAt: 'ASC',
      },
    });
  }

  public async getPublic(requestUser: UserEntity): Promise<NoteEntity[]> {
    return this.repository.createQueryBuilder('note')
      .andWhere('note.isPublic = :isPublic', { isPublic: true })
      .leftJoinAndMapOne('note.user', 'note.user', 'user')
      .leftJoinAndMapMany('note.comments', 'note.comments', 'comments')
      .leftJoinAndMapOne('comments.user', 'comments.user', 'commentUsers')
      .leftJoinAndMapMany('note.likes', 'note.likes', 'likes', 'likes.userId = :userId', { userId: requestUser.id })
      .orderBy('note.updatedAt', 'DESC')
      .getMany();
  }

  public async getPublicByUser(userId: number): Promise<NoteEntity[]> {
    return await this.repository.find({
      where: {
        isPublic: true,
        userId: userId,
      },
      order: {
        updatedAt: 'DESC',
      },
      relations: {
        comments: {
          user: true,
        },
      },
    });
  }

  public async getOne(requestUser: UserEntity, noteId: number): Promise<NoteEntity> {
    const note = await this.repository.findOne({
      where: {
        id: noteId,
      },
      relations: {
        user: true,
        comments: {
          user: true,
        },
      },
    });

    if (!note)
      throw new NotFoundException('A nota não foi encontrada');

    if (note.isPublic)
      return note;

    if (note.userId === requestUser.id)
      return note;

    throw new ForbiddenException('Você não tem permissão para visualizar essa nota');
  }

  public async createOne(requestUser: UserEntity, payload: CreateNotePayload): Promise<NoteEntity> {
    const note = new NoteEntity();

    note.title = payload.title;
    note.annotation = payload.annotation;
    note.userId = requestUser.id;

    return await this.repository.save(note);
  }

  public async updateOne(requestUser: UserEntity, noteId: number, payload: UpdateNotePayload): Promise<NoteEntity> {
    const note = await this.repository.findOneBy({ id: noteId });

    if (!note)
      throw new NotFoundException('A nota não foi encontrada');

    if (note.userId !== requestUser.id)
      throw new ForbiddenException('Você não tem permissão para atualizar essa nota');

    note.title = payload.title ?? note.title;
    note.annotation = payload.annotation ?? note.annotation;
    note.isPublic = payload.isPublic ?? note.isPublic;

    return await this.repository.save(note);
  }

  public async deleteOne(requestUser: UserEntity, noteId: number): Promise<void> {
    const note = await this.repository.findOneBy({ id: noteId });

    if (!note)
      throw new NotFoundException('A nota não foi encontrada');

    if (note.userId !== requestUser.id)
      throw new ForbiddenException('Você não tem permissão para atualizar essa nota');

    await this.repository.remove(note);
  }

}