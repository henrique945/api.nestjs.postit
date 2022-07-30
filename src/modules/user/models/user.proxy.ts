import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { UserEntity } from "../entities/user.entity";

export class UserProxy {
  constructor(entity: UserEntity) {
    this.id = entity.id;
    this.name = entity.name;
    this.email = entity.email;
    this.role = entity.role;
    this.imageUrl = entity.imageUrl;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
  }

  @ApiProperty()
  public id: number;
  
  @ApiProperty()
  public name: string;
  
  @ApiProperty()
  public email: string;

  @ApiPropertyOptional()
  public role?: string;

  @ApiPropertyOptional()
  public imageUrl?: string;

  @ApiProperty()
  public createdAt: Date;

  @ApiProperty()
  public updatedAt: Date;
}