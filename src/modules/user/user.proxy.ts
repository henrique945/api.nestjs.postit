export class UserProxy {
  constructor(id: number, name: string, age: number, isGraduated: boolean) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.isGraduated = isGraduated;
  }

  public id: number;
  public name: string;
  public age: number;
  public isGraduated: boolean;
}