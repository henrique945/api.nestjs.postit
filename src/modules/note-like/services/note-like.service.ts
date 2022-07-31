import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NoteEntity } from "src/modules/note/entities/note.entity";
import { NoteService } from "src/modules/note/services/note.service";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { Repository } from "typeorm";
import { NoteLikeEntity } from "../entities/note-like.entity";

@Injectable()
export class NoteLikeService {

  constructor(
    @InjectRepository(NoteLikeEntity)
    private readonly repository: Repository<NoteLikeEntity>,
    private readonly noteService: NoteService,
  ) {}

  public async getMany(requestUser: UserEntity): Promise<NoteEntity[]> {
    const likes = await this.repository.find({
      where: {
        userId: requestUser.id,
      },
      relations: {
        note: true,
      },
    });

    return likes.map(like => like.note);
  }

  public async addLike(requestUser: UserEntity, noteId: number): Promise<NoteLikeEntity> {
    const note = await this.noteService.getOne(requestUser, noteId);

    const previousLike = await this.repository.findOneBy({ noteId: note.id, userId: requestUser.id });

    if (previousLike)
      return previousLike;

    const like = new NoteLikeEntity();

    like.noteId = note.id;
    like.userId = requestUser.id;

    return await this.repository.save(like);
  }

  public async removeLike(requestUser: UserEntity, noteId: number): Promise<void> {
    const note = await this.noteService.getOne(requestUser, noteId);
    
    const like = await this.repository.findOneBy({ noteId: note.id, userId: requestUser.id });

    if (!like)
      return;

    await this.repository.remove(like);
  }

}