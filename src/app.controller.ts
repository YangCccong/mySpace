import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
/**
 * controller
 *    控制器负责处理传入的请求和向客户端返回响应。
 *    控制器的目的是接受应用的特定请求，路由机制控制哪个控制器接收哪些请求，通常每个
 * 控制器有多个路由，不同的路由可以执行不同的操作。
 *    为了创建一个基本的控制器，我们使用类和装饰器。
 * 
 */
// 装饰器定义一个基本的控制器
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
