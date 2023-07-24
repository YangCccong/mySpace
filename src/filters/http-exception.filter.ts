import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

// 它负责捕获作为 “HttpException”类实例
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    // 用于接受主动发送的错误信息
    const message = exception.getResponse()
    response
      .status(status)
      .json({
        status: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        success: false,
        message
      });
  }
}
