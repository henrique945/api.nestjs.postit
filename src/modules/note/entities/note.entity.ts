import { UserEntity } from "src/modules/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @Column()
  public userId: number;

  @ManyToOne(() => UserEntity)
  public user?: UserEntity;

}