import { Injectable,  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { ArticleTag, ArticleTagDocument } from './schemas/article-tag.schema';
@Injectable()
export class ArticleTagService {
    constructor(@InjectModel('ArticleTag') private ArticleTagModel: Model<ArticleTagDocument>) {}
    
    async createArticleTag(articleTag): Promise<ArticleTag> {
        return await this.ArticleTagModel.create(articleTag);
    }
    async articleTagList() {
        return await this.ArticleTagModel.find().exec()
    }
    // 删除文章标签
    async removearticleTag(articleTag) {
        return await this.ArticleTagModel.deleteMany(articleTag);
    }
}