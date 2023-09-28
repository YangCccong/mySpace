import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';  
import { Request, Response } from 'express';  
import { AuthService } from './auth.service';  
  
@Injectable()  
export class AuthMiddleware implements NestMiddleware {  
  constructor(private readonly authService: AuthService) {}  
  
  use(req: Request, res: Response, next: Function) {  
    const authorization = req.headers.authorization;  
    if (authorization) {  
      const token = authorization.split(' ')[1];  
      this.authService.validateToken(token)  
        .then(() => {  
          next();  
        })  
        .catch((error) => {  
          next(new HttpException('Invalid token', HttpStatus.UNAUTHORIZED));  
        });  
    } else {  
      next(new HttpException('No authorization header', HttpStatus.UNAUTHORIZED));  
    }  
  }  
}