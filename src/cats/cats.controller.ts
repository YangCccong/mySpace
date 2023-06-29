import { Controller, Get, Post, Req, HttpCode, Header, Redirect, Query, Body } from '@nestjs/common';
import { CatsService } from './cats.service'
import { CreateCatDto } from './dto/create-cat.dto'
import { Cat } from './interfaces/cat.interface'
import { Request } from 'express'
/**
 * CLI 创建控制器，只需要执行 nest g controller cats 命令
 */
@Controller('cats')
export class CatsController {
    constructor(private catsService: CatsService) {}
    @Post()
    async create(@Body() createCatDto: CreateCatDto) {
        console.log(createCatDto)
        return this.catsService.create(createCatDto)
    }
    @Get()
    async findAll(): Promise<Cat []> {
        return this.catsService.findAll()
    }
}
