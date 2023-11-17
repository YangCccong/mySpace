import { Injectable,  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { UserRoles, UserRolesDocument } from './schemas/user-roles.schema'

@Injectable()
export class UserRolesService {
    constructor(@InjectModel('UserRoles') private UserRolesModel: Model<UserRolesDocument>) {}
    async createUserRole(userRole): Promise<UserRoles> {
        return this.UserRolesModel.create(userRole);
    }
}