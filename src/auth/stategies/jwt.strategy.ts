import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { UserEntity } from "../entity/auth.entity";
import { LoginService } from "../services/login.service";
import { TokenPayload } from "../types";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly loginService: LoginService,
      private readonly configService: ConfigService,) {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: configService.get<string>('JWT_SECRET'),
      });
    }

    async validate(payload: TokenPayload): Promise<UserEntity> {
        const { sub, jti } = payload;
        return this.loginService.validateLogin(sub, jti);
      }
}