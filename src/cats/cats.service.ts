import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Cat, CatDocument } from './schemas/cat.schema';
import { Injectable } from '@nestjs/common';

import { CreateCatDto } from './dto/create-cat.dto'
@Injectable()
export class CatsService {
    constructor(@InjectModel('Cat') private catModel: Model<CatDocument>) {}
    // private readonly cats = [];
    async create(createCatDto: CreateCatDto): Promise<Cat> {
        const createdCat = new this.catModel(createCatDto);
        return createdCat.save();
    }
    
    async findAll(): Promise<Cat[]> {
        return this.catModel.find().exec();
    }
}
