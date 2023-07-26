import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable  } from '@nestjs/common';
import { Menu, MenuDocument } from './schemas/menu.schema';

import { SaveMenuDto } from './dto/save-menu.dto';
import { RemoveMenuDto } from './dto/remove-menu.dto';
@Injectable()
export class MenusService {
    constructor(@InjectModel('Menu') private menuModel: Model<MenuDocument>){}
    
    async saveMenu(SaveMenuDto: SaveMenuDto) {
        const createdCat = new this.menuModel(SaveMenuDto);
        return createdCat.save();
    }

    async updataMenu(SaveMenuDto: SaveMenuDto) {
        const { _id } = SaveMenuDto
        return this.menuModel.findOneAndUpdate({ _id }, SaveMenuDto)
    }

    async removeCurrentMenu(RemoveMenuDto: RemoveMenuDto) {
        const { _id } = RemoveMenuDto
        return this.menuModel.findByIdAndRemove({ _id });
        // return this.menuModel.deleteOne(RemoveMenuDto);
    }
    
    async menusList(): Promise<Menu[]> {
        return await this.menuModel.find().exec()
    }
}
