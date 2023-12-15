import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleCategory, ArticleCategorySchema } from './schemas/article-category.schema'
import { ArticleTagController } from './article-category.controller';
import { ArticleCategoryService } from './article-category.service';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: ArticleCategory.name, schema: ArticleCategorySchema }]),
  ],
  controllers: [ArticleTagController],
  providers: [ArticleCategoryService],
  exports: [ArticleCategoryService]
})
export class ArticleCategoryModule {}
