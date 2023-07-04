import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

/**
 * @UseGuards()装饰器在用户请求登录路由时强制执行身份验证。通过 AuthGuard 该类，我们能够使用该local策略对用户进行身份验证。
 */
import {
    ApiTags,
    ApiOperation,
} from '@nestjs/swagger';


@Controller('auth')
@ApiTags('auth 登陆')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({ summary: '登陆', description: '' })
    @UseGuards(AuthGuard('local'))
    @Post('/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }
}