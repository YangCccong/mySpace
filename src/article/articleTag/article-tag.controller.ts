import { Controller, Post, Get, Body} from '@nestjs/common';
import { ArticleTagService } from './article-tag.service'
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { HttpException } from '@nestjs/common';
import { ArticleTagDto } from './dto/articleTag.dto';

@Controller('articleTag')
@ApiTags('文章标签')

export class ArticleTagController {
  constructor(private readonly articleTagService: ArticleTagService) { }

  @ApiOperation({ summary: '文章标签-添加/编辑', description: '' })
  @Post('/create')
  async create(@Body() ArticleTag: ArticleTagDto) {
    console.log(ArticleTag)
    const list = await this.getList()
    console.log(list)
    const { name } = ArticleTag
    
    if(!ArticleTag?._id) {
      // 创建
      const indexOf = list.findIndex(articleTag => articleTag.name === name)
      if(indexOf > -1) {
        throw new HttpException('当前标签已存在!', 200);
      } else {
        return this.articleTagService.createArticleTag(ArticleTag)
      }
    } else {
      // 修改
      return this.articleTagService.createArticleTag(ArticleTag)
    }
  }

  @ApiOperation({ summary: '文章标签-删除', description: '' })

  @Post('/remove')
  remove(@Body() ArticleTag: ArticleTagDto) {
    console.log(ArticleTag, ArticleTagDto)
    const { _id } = ArticleTag
    if(!_id) throw new HttpException('非法参数！', 200);
    return this.articleTagService.removearticleTag(ArticleTag)
  }

  @ApiOperation({ summary: '文章标签-列表', description: '' })
  @Get('/list')
  getList() {
    return this.articleTagService.articleTagList()
  }
}
