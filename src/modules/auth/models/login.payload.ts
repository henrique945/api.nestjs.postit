import { ApiProperty } from "@nestjs/swagger";

export class LoginPayload {

  @ApiProperty()
  public username: string;

  @ApiProperty()
  public password: string;

}