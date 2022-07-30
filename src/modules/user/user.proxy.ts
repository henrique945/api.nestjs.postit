import { ApiProperty } from "@nestjs/swagger";

export class UserProxy {
  constructor(id: number, name: string, age: number, isGraduated: boolean) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.isGraduated = isGraduated;
  }

  @ApiProperty()
  public id: number;
  
  @ApiProperty()
  public name: string;
  
  @ApiProperty()
  public age: number;

  @ApiProperty()
  public isGraduated: boolean;
}