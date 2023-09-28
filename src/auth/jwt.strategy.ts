import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './config';
 
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }
  // JWT验证 - Step 4: 被守卫调用
  async validate(payload: any) {
    console.log(payload, 'JWT验证 - Step 4: 被守卫调用 ===>>> ')
    return {
      id: payload.id,
      name: payload.name,
      nickname: payload.nickname,
    };
  }
}