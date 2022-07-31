import { NoteEntity } from "src/modules/note/entities/note.entity";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('notes_likes')
export class NoteLikeEntity {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public userId: number;

  @Column()
  public noteId: number;

  @ManyToOne(() => UserEntity)
  public user?: UserEntity;

  @ManyToOne(() => NoteEntity, entity => entity.likes, { onDelete: 'CASCADE' })
  public note?: NoteEntity;

}