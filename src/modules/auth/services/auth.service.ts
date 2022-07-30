import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { UserService } from "src/modules/user/services/user.service";
import * as bcryptjs from 'bcryptjs';
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "../models/jwt.payload";
import { TokenProxy } from "../models/token.proxy";

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}


  public async authenticate(email: string, passwordInPlainText: string): Promise<UserEntity> {
    const user = await this.userService.getRepository().findOneBy({ email });

    if (!user)
      throw new BadRequestException('Email ou senha inválidos');

    const isPasswordValid = await bcryptjs.compare(passwordInPlainText, user.password);

    if (!isPasswordValid)
      throw new BadRequestException('Email ou senha inválidos');

    return user;
  }

  public async generateToken(user: UserEntity): Promise<TokenProxy> {
    const payload: JwtPayload = {
      id: user.id,
    };

    const token = await this.jwtService.signAsync(payload, { expiresIn: '1d' });

    return new TokenProxy(token);
  }

  public async validateJwt(payload: JwtPayload): Promise<UserEntity> {
    return await this.userService.getOneUser(payload.id);
  }

}