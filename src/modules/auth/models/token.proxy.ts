import { ApiProperty } from "@nestjs/swagger";

export class TokenProxy {

  constructor(token: string) {
    this.token = token;
  }

  @ApiProperty()
  public token: string;

}