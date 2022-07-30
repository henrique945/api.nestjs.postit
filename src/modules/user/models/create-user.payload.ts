import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDefined, IsNumber, IsPositive, IsString, MinLength } from "class-validator";

export class CreateUserPayload {
  @ApiProperty()
  @IsDefined({ message: 'A identificação deve ser definida' })
  @IsNumber({ maxDecimalPlaces: 0 }, { message: 'A identificação deve ser um número inteiro' })
  public id: number;

  @ApiProperty()
  @IsDefined({ message: 'O nome deve ser definido' })
  @IsString({ message: 'O nome deve ser uma string' })
  @MinLength(2, { message: 'O nome deve ser maior ou igual a 2 caracteres' })
  public name: string;

  @ApiProperty()
  @IsDefined({ message: 'A idade deve ser definida' })
  @IsNumber({ maxDecimalPlaces: 0 }, { message: 'A idade deve ser um número inteiro' })
  @IsPositive({ message: 'A idade deve ser um número positivo' })
  public age: number;

  @ApiProperty()
  @IsDefined({ message: 'O estado da graduação deve ser definido' })
  @IsBoolean({ message: 'O estado da graduação deve ser um boolean' })
  public isGraduated: boolean;
}