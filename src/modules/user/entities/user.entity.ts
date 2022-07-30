import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

}