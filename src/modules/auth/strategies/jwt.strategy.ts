import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { enviroment } from "src/environment/environment";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { JwtPayload } from "../models/jwt.payload";
import { AuthService } from "../services/auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    private readonly service: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: enviroment.JWT_KEY,
    });
  }

  public async validate(payload: JwtPayload): Promise<UserEntity> {
    return await this.service.validateJwt(payload);
  }

}