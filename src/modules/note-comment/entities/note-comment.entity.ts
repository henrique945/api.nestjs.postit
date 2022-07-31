import { NoteEntity } from "src/modules/note/entities/note.entity";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('notes_comments')
export class NoteCommentEntity {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 250 })
  public comment: string;

  @CreateDateColumn()
  public createdAt: Date;

  @Column()
  public userId: number;

  @Column()
  public noteId: number;

  @ManyToOne(() => UserEntity)
  public user?: UserEntity;

  @ManyToOne(() => NoteEntity, entity => entity.comments, { onDelete: 'CASCADE' })
  public note?: NoteEntity;

}