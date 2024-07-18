import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, JwtFromRequestFunction, Strategy } from "passport-jwt";
import { AuthService } from "../services/auth.service";
import { JwtPayload } from "../interface/jwt-payload.interface";
import { User } from "../entities/user.entity";

const extractJwtFromCookie: JwtFromRequestFunction = request => {
  return request.signedCookies['refreshToken']!; 
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        extractJwtFromCookie,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: process.env.APP_SECRET,
      ignoreExpiration: false,
      passReqToCallback: false,
    });
  }

  validate(payload: JwtPayload): Promise<User> {
    console.log("Я - метод validate из jwt-strategy");
    return this.authService.verifyPayload(payload);
  }
}