import { Controller, Request, Get, Post, UseGuards, Req, Res, Session, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { HttpException, BadRequestException } from '@nestjs/common';
import { SuggestionsDto } from './dto/suggestions.dto';
import { AuthLoginDto } from './dto/auth-login.dto'
import { ToolsService } from 'src/utils/tools.service'
import * as _ from 'lodash'
/**
 * @UseGuards()装饰器在用户请求登录路由时强制执行身份验证。通过 AuthGuard 该类，我们能够使用该local策略对用户进行身份验证。
 */
import {
    ApiTags,
    ApiOperation,
} from '@nestjs/swagger';
import { client } from 'src/utils/tencentcloud';


@Controller('auth')
@ApiTags('登陆')
export class AuthController {
    constructor(private authService: AuthService, private toolsService: ToolsService) { }

    @ApiOperation({ summary: '用户登陆', description: '' })
    // @UseGuards(AuthGuard('local'))
    @Post('/login')
    async login(@Body() authLoginDto: AuthLoginDto, @Session() session) {
        const userInfo = _.omit(_.cloneDeep(authLoginDto), 'code')
        const { username, password } = userInfo
        /**
         * 判断验证码是否有效
         */
        // return this.authService.login({ username, password });
        if (authLoginDto.code?.toUpperCase() === session.code?.toUpperCase()) {
            return this.authService.login({ username, password });
        } else {
            throw new HttpException('验证码错误!', 200);
        }
    }

    @ApiOperation({ summary: '获取验证码', description: '' })
    @Get('/code')
    async code(@Req() req, @Res() res) {
        const svgCaptcha = await this.toolsService.captche(); //创建验证码
        const { text, data } = svgCaptcha
        req.session.code = text; //使用session保存验证，用于登陆时验证
        res.type('image/svg+xml'); //指定返回的类型
        res.send(data); //给页面返回一张图片
    }

    @ApiOperation({ summary: '投诉建议', description: '' })
    @Post('/suggestions')
    async suggestions(@Body() suggestions: SuggestionsDto) {
        console.log(suggestions)
        return this.authService.suggestions(suggestions)
    }

    @ApiOperation({ summary: '腾讯云测试', description: '' })
    @Post('/test')
    async test(@Body() body) {
        console.log(body)
        const params = {
            RspImgType: 'url',
        }
        client.FaceCartoonPic(params).then(
            (data) => {
                console.log(data)
            },
            (err) => {
                console.error("error", err)
                console.log(err.code)
            }
        )
    }
}