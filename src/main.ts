import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import { join } from 'path';

// 配置 swagger http://localhost:3000/api
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
/**
 * 应用程序的入口文件。NestFactory 用来创建 nest应用实例。
 */
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
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

  // 全局内置管道
  app.useGlobalPipes(new ValidationPipe()); 

  
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
