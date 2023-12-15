import { Injectable,  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { ArticleCategory, ArticleCategoryDocument } from './schemas/article-category.schema';
@Injectable()
export class ArticleCategoryService {
    constructor(@InjectModel('ArticleCategory') private ArticleCategoryModel: Model<ArticleCategoryDocument>) {}
    
    async createArticleCategory(ArticleCategory): Promise<ArticleCategory> {
        console.log(ArticleCategory, 'ArticleCategory service ===>>> ')
        return await this.ArticleCategoryModel.create(ArticleCategory);
    }
    async updataArticleCategory(ArticleCategory) {
        const { _id } = ArticleCategory
        return await this.ArticleCategoryModel.findOneAndUpdate({ _id }, ArticleCategory)
    }
    async getArticleCategoryList() {
        return await this.ArticleCategoryModel.find().exec()
    }
    // 删除文章标签
    async removeArticleCategory(ArticleCategory) {
        return await this.ArticleCategoryModel.deleteMany({
            _id: ArticleCategory._id
        });
    }
}