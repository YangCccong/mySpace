import { Controller, Request, Get, Post, UseGuards, Req, Res, Session } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

import { AuthLoginDto } from './dto/auth-login.dto'
import { ToolsService } from 'src/utils/tools.service'
/**
 * @UseGuards()装饰器在用户请求登录路由时强制执行身份验证。通过 AuthGuard 该类，我们能够使用该local策略对用户进行身份验证。
 */
import {
    ApiTags,
    ApiOperation,
} from '@nestjs/swagger';


@Controller('auth')
@ApiTags('登陆')
export class AuthController {
    constructor(private authService: AuthService, private toolsService: ToolsService) {}

    @ApiOperation({ summary: '用户登陆', description: '' })
    @UseGuards(AuthGuard('local'))
    @Post('/login')
    async login(@Request() authLoginDto: AuthLoginDto) {
        return this.authService.login(authLoginDto['user']);
    }

    @ApiOperation({ summary: '验证码', description: '' })
    @Get('/code')
    async code(@Req() req, @Res() res) {
        const svgCaptcha = await this.toolsService.captche(); //创建验证码
        const { text, data } = svgCaptcha
        // req.session.code = text; //使用session保存验证，用于登陆时验证
        // console.log(req.session.code);
        res.type('image/svg+xml'); //指定返回的类型
        res.send(data); //给页面返回一张图片
    }
}