import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { enviroment } from "src/environment/environment";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: enviroment.JWT_KEY,
    }),
  ],
  exports: [
    PassportModule,
    JwtModule,
  ],
})
export class AuthTokenModule {}