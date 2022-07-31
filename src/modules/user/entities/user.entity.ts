import { NoteCommentEntity } from "src/modules/note-comment/entities/note-comment.entity";
import { NoteEntity } from "src/modules/note/entities/note.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class UserEntity {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 150 })
  public name: string;

  @Column({ length: 150, unique: true })
  public email: string;

  @Column({ length: 80 })
  public password: string;

  @Column({ length: 50, nullable: true })
  public role?: string;

  @Column({ length: 250, nullable: true })
  public imageUrl?: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @OneToMany(() => NoteEntity, entity => entity.user)
  public notes?: NoteEntity[];

  @OneToMany(() => NoteCommentEntity, entity => entity.user)
  public noteComments?: NoteCommentEntity[];

}