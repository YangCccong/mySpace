import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ArticleService } from './article.service'
import { ArticleDto, RemoveArticleDto } from './dto/article.dto'
import * as _ from 'lodash';
import {
    ApiOperation,
    ApiTags,
    ApiQuery,
    ApiBody,
    ApiResponse,
  } from '@nestjs/swagger';

@ApiTags('文章管理')
@Controller('article')
export class ArticleController {
    constructor(private articleService: ArticleService) {}
    @ApiOperation({ summary: '文章创建/修改', description: ''})
    @Post('/save')
    async save(@Body() saveArticleDto: ArticleDto) {
        const { _id } = saveArticleDto
        if(_id) {
            return this.articleService.updataRole(saveArticleDto)
        } else {
            delete saveArticleDto._id
            return this.articleService.saveRole(saveArticleDto)
        }
    }

    @ApiOperation({ summary: '文章删除', description: ''})
    @Post('/remove')
    async remove(@Body() removeArticleDto: RemoveArticleDto) {
        return this.articleService.removeCurrentMenu(removeArticleDto)
    }

    @ApiOperation({ summary: '文章列表', description: ''})
    @Get('/article-lists')
    async menusList() {
        return await this.articleService.menusList()
    }

    @ApiOperation({ summary: '文章详情', description: ''})
    @Get('/info')
    async articleInfo(@Query() query) {
        console.log(query)
        const { id } = query
        const infoList =  await this.articleService.articleInfo(id)
        return {
            article: infoList[0]
        }
    }
}
