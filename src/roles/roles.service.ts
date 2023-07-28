import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable  } from '@nestjs/common';
import { Role, RoleDocument } from './schemas/role.schema';

import { SaveRoleDto } from './dto/save-role.dto';
import { RemoveRoleDto } from './dto/remove-role.dto';
@Injectable()
export class RolesService {
    constructor(@InjectModel('Role') private roleModel: Model<RoleDocument>){}
    
    async saveRole(SaveRoleDto: SaveRoleDto) {
        const createdCat = new this.roleModel(SaveRoleDto);
        return createdCat.save();
    }

    async updataRole(SaveRoleDto: SaveRoleDto) {
        const { _id } = SaveRoleDto
        return this.roleModel.findOneAndUpdate({ _id }, SaveRoleDto)
    }

    async removeCurrentRole(removeRoleDto: RemoveRoleDto) {
        return this.roleModel.deleteOne(removeRoleDto);
    }

    async rolesList(): Promise<Role[]> {
        return this.roleModel.find().exec()
    }
}
