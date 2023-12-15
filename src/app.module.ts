import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { RolesModule } from './roles/roles.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MenusModule } from './menus/menus.module';
import { WxModule } from './wx/wx.module';
import { ArticleModule } from './article/article.module';


import { ArticleTagModule } from './article/articleTag/article-tag.module'
import { ArticleCategoryModule } from './article/articleCategory/article-category.module';
/**
 * 应用程序的根模块
 */
@Module({
  imports: [
  ConfigModule.forRoot(),
    MongooseModule.forRoot(`mongodb://localhost`, {
      dbName: 'my-space',
      user: 'root',
      pass: '6PBqFZ7WarahG29'
    }),
    MenusModule,
    RolesModule,
    UserModule,
    AuthModule,
    WxModule,
    ArticleModule,
    
    ArticleTagModule,
    ArticleCategoryModule,
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule {}
