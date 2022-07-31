import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NoteService } from "src/modules/note/services/note.service";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { Repository } from "typeorm";
import { NoteCommentEntity } from "../entities/note-comment.entity";
import { CreateNoteCommentPayload } from "../models/create-note-comment.payload";

@Injectable()
export class NoteCommentService {

  constructor(
    @InjectRepository(NoteCommentEntity)
    private readonly repository: Repository<NoteCommentEntity>,
    private readonly noteService: NoteService,
  ) {}

  public async getMany(requestUser: UserEntity, noteId: number): Promise<NoteCommentEntity[]> {
    const note = await this.noteService.getOne(requestUser, noteId);

    return await this.repository.find({
      where: {
        noteId: note.id,
      },
      relations: {
        user: true,
      },
    });
  }

  public async createOne(requestUser: UserEntity, noteId: number, payload: CreateNoteCommentPayload): Promise<NoteCommentEntity> {
    const note = await this.noteService.getOne(requestUser, noteId);

    const comment = new NoteCommentEntity();

    comment.comment = payload.comment;
    comment.userId = requestUser.id;
    comment.noteId = note.id;

    return await this.repository.save(comment);
  }

  public async deleteOne(requestUser: UserEntity, noteId: number, noteCommentId: number): Promise<void> {
    const note = await this.noteService.getOne(requestUser, noteId);
    
    const comment = await this.repository.findOneBy({ id: noteCommentId });

    if (!comment)
      throw new NotFoundException('O comentário não foi encontrado');

    if (comment.userId !== requestUser.id)
      throw new ForbiddenException('Você não tem permissão para remover esse comentário');

    await this.repository.remove(comment);
  }

}