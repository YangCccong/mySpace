import { Controller, Post, Get, Body} from '@nestjs/common';
import { ArticleCategoryService } from './article-category.service'
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { HttpException } from '@nestjs/common';
import { ArticleCategoryDto, RemoveArticleCategoryDto } from './dto/article-category.dto';

@Controller('ArticleCategory')
@ApiTags('文章分类')

export class ArticleTagController {
  constructor(private readonly articleCategoryService: ArticleCategoryService) { }

  @ApiOperation({ summary: '文章分类-添加/编辑', description: '' })
  @Post('/create')
  async create(@Body() ArticleCategory: ArticleCategoryDto) {
    const list = await this.getList()
    const { name } = ArticleCategory
    if(!ArticleCategory?._id) {
      // 创建
      const indexOf = list.findIndex(articleCategory => articleCategory.name === name)
      if(indexOf > -1) {
        throw new HttpException('当前分类已存在!', 200);
      } else {
        return this.articleCategoryService.createArticleCategory(ArticleCategory)
      }
    } else {
      // 修改
      return this.articleCategoryService.updataArticleCategory(ArticleCategory)
    }
  }

  @ApiOperation({ summary: '文章分类-删除', description: '' })
  @Post('/remove')
  remove(@Body() ArticleCategory: RemoveArticleCategoryDto) {
    const { _id } = ArticleCategory
    if(!_id) throw new HttpException('非法参数！', 200);
    return this.articleCategoryService.removeArticleCategory(ArticleCategory)
  }

  @ApiOperation({ summary: '文章分类-列表', description: '' })
  @Get('/list')
  getList() {
    return this.articleCategoryService.getArticleCategoryList()
  }
}
