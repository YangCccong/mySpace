import { Injectable,  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { RoleMenus, RoleMenusDocument } from './schemas/role-menus.schema'

@Injectable()
export class RoleMenusService {
    constructor(@InjectModel('RoleMenus') private RoleMenusModel: Model<RoleMenusDocument>) {}
    async createRoleMenus(userRole): Promise<RoleMenus> {
        return this.RoleMenusModel.create(userRole);
    }
}