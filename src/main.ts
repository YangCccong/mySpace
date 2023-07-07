import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser'
// import * as session from 'express-session'

// import * as helmet from 'helmet';
// import  csurf from 'csurf';

import { join } from 'path';


// 配置 swagger http://localhost:3000/api
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
/**
 * 应用程序的入口文件。NestFactory 用来创建 nest应用实例。
 */
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('my-space-api/');
  app.enableCors();

  /**
   * 防止跨站脚本攻击
   * CSRF保护：跨站点请求伪造
   */
  // app.use(helmet());
  // app.use(csurf());
  
  const options = new DocumentBuilder()
    .setTitle('API 文档')
    .setDescription('API 文档')
    .setVersion('1.0')
    .addBasicAuth()
    // .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  // console.log('session ==== ')
  // app.use(session())
  //注册cookie
  app.use(cookieParser('dmyxs'));

  // 全局内置管道
  app.useGlobalPipes(new ValidationPipe()); 

  
  await app.listen(3000);
  // console.log(`Application is running on: ${await app.getUrl()}`);
  Logger.log(`Application is running on: ${await app.getUrl()}`,)
}
bootstrap();
