import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser'
import * as session from 'express-session'
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { TransformInterceptor } from './filters/transform.interceptor'
import * as hbs from 'hbs';
import { join } from 'path';
hbs.registerPartials(join(__dirname, '..', 'views/components'));

// 配置 swagger http://localhost:3000/api
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
/**
 * 应用程序的入口文件。NestFactory 用来创建 nest应用实例。
 */
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.setGlobalPrefix('my-space-api/');
  // app.enableCors();

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
    .addTag('my-space')
    .build();
    // options['cors'] = false
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  //注册cookie
  app.use(cookieParser('dmyxs'));
  app.use(session());
  // 全局内置管道
  app.useGlobalPipes(new ValidationPipe());
  // 全局注册错误的过滤器
  app.useGlobalFilters(new HttpExceptionFilter(), new AllExceptionsFilter());
  // 全局注册拦截器
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(3000);
  Logger.log(`Application is running on: ${await app.getUrl()}`,)
}
bootstrap();
