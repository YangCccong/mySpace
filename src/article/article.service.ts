import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Article, ArticleDocument } from './schemas/article.schema';
import { Model } from 'mongoose';

@Injectable()
export class ArticleService {
    constructor(@InjectModel('Article') private articleModel: Model<ArticleDocument>) { }
    async saveRole(SaveRoleDto) {
        const createdCat = new this.articleModel(SaveRoleDto);
        return createdCat.save();
    }

    async updataRole(SaveRoleDto) {
        const { _id } = SaveRoleDto
        return this.articleModel.findOneAndUpdate({ _id }, SaveRoleDto)
    }


    async removeCurrentMenu(RemoveMenuDto) {
        const { _id } = RemoveMenuDto
        return this.articleModel.findByIdAndRemove({ _id });
        // return this.menuModel.deleteOne(RemoveMenuDto);
    }
    
    async menusList() {
        return await this.articleModel.find().exec()
    }
}
