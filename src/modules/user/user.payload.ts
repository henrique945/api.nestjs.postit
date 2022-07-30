import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class UserPayload {
  @ApiPropertyOptional()
  name: string;

  @ApiPropertyOptional()
  age: number;
}