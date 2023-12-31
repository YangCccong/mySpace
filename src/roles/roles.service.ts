import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Role, RoleDocument } from './schemas/role.schema';

import { SaveRoleDto } from './dto/save-role.dto';
import { RemoveRoleDto } from './dto/remove-role.dto';
import { RoleMenusService } from './RoleMenus/role-menus.service'
@Injectable()
export class RolesService {
    constructor(@InjectModel('Role') private roleModel: Model<RoleDocument>, private RoleMenusService: RoleMenusService) { }

    async saveRole(SaveRoleDto: SaveRoleDto) {
        console.log(SaveRoleDto, 'SaveRoleDto === ')
        const createdCat = new this.roleModel(SaveRoleDto);
        return createdCat.save();
    }

    async updataRole(SaveRoleDto: SaveRoleDto) {
        const { _id } = SaveRoleDto
        return this.roleModel.findOneAndUpdate({ _id }, SaveRoleDto)
    }

    async removeCurrentRole(removeRoleDto: RemoveRoleDto) {
        const { _id } = removeRoleDto
        return this.roleModel.findByIdAndRemove({ _id });
    }

    async rolesList(): Promise<Role[]> {
        return this.roleModel.find({}, { routes: 0, __v: 0 }).exec()
    }

    async getRoleInfoByIds(roleIds) {
        const roles = await this.roleModel.find({ _id: { $in: roleIds }}, {name: 1, _id: 0})
        const { menus, menuIds } = await this.RoleMenusService.getMenuIdsByRoleId(roleIds)
        return {
            menuIds,
            roles,
            menus
        }
    }
    
}
