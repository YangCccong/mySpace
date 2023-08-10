import { Module } from "@nestjs/common"
import { UserModule } from "src/user/user.module";
import { AuthService } from "./auth.service"
import { PassportModule } from "@nestjs/passport"
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserService } from "src/user/user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/user/schemas/user.schema";
import { LocalStrategy } from './local.auth';

import { ToolsService } from 'src/utils/tools.service';
import { Suggestions, SuggestionsSchema } from './schemas/suggestions.schema';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 1 * 60,
      limit: 5, // 请求10次
    }),
    UserModule, PassportModule, JwtModule.register({
    secret: 'secretKey',
    signOptions: { expiresIn: '60s' },
  }), MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), MongooseModule.forFeature([{ name: Suggestions.name, schema: SuggestionsSchema }])],
  providers: [
    AuthService,
    UserService,
    LocalStrategy,
    ToolsService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
