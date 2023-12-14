import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleTag, ArticleTagSchema } from './schemas/article-tag.schema'
import { ArticleTagController } from './article-tag.controller';
import { ArticleTagService } from './article-tag.service';
import { ArticleModule } from '../../article/article.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: ArticleTag.name, schema: ArticleTagSchema }]),
    ArticleModule
  ],
  controllers: [ArticleTagController],
  providers: [ArticleTagService],
  exports: [ArticleTagService]
})
export class ArticleTagModule {}
