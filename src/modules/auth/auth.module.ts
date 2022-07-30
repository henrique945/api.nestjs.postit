import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { enviroment } from "src/environment/environment";
import { UserModule } from "../user/user.module";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./services/auth.service";
import { LocalStrategy } from "./strategies/local.strategy";

@Module({
  controllers: [
    AuthController,
  ],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: enviroment.JWT_KEY,
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
  ],
  exports: [
    AuthService,
  ],
})
export class AuthModule {}