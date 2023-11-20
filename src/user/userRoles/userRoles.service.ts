import { Injectable,  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { UserRoles, UserRolesDocument } from './schemas/user-roles.schema'

@Injectable()
export class UserRolesService {
    constructor(@InjectModel('UserRoles') private UserRolesModel: Model<UserRolesDocument>) {}

    // 创建 用户角色关系
    async createUserRole(userRole): Promise<UserRoles> {
        return this.UserRolesModel.create(userRole);
    }

    // 当前用户所绑定角色
    async findRolesByUserId(userId) {
        console.log(userId)
        return this.UserRolesModel.find(userId);
    }
}