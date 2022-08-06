import { NoteCommentEntity } from "src/modules/note-comment/entities/note-comment.entity";
import { NoteLikeEntity } from "src/modules/note-like/entities/note-like.entity";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('notes')
export class NoteEntity {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 150 })
  public title: string;

  @Column()
  public annotation: string;

  @Column({ default: false })
  public isPublic: boolean;

  @Column({ nullable: true })
  public color?: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @Column()
  public userId: number;

  @ManyToOne(() => UserEntity, entity => entity.notes, { onDelete: 'CASCADE' })
  public user?: UserEntity;

  @OneToMany(() => NoteCommentEntity, entity => entity.note)
  public comments?: NoteCommentEntity[];

  @OneToMany(() => NoteLikeEntity, entity => entity.note)
  public likes?: NoteLikeEntity[];

}