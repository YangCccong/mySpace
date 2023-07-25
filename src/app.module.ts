import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { RolesModule } from './roles/roles.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MenusModule } from './menus/menus.module';
/**
 * 应用程序的根模块
 */
@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 15 * 60,  //1分钟
      limit: 1000, //请求10次
    }),
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost/my-space'),
    MenusModule,
    RolesModule,
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
