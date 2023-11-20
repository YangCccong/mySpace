import { Injectable,  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { RoleMenus, RoleMenusDocument } from './schemas/role-menus.schema';
import { MenusService } from '../../menus/menus.service'
@Injectable()
export class RoleMenusService {
    constructor(@InjectModel('RoleMenus') private RoleMenusModel: Model<RoleMenusDocument>, private MenusService: MenusService) {}
    // 角色关联菜单
    async createRoleMenus(userRole): Promise<RoleMenus> {
        return this.RoleMenusModel.create(userRole);
    }

    // 通过角色获取对应菜单
    async getMenuIdsByRoleId(roleIds) {
        const roleMenus = await this.RoleMenusModel.find({ roleId: { $in: roleIds }});
        const menuIds = roleMenus.map(item => item.menuId)
        const menus = await this.MenusService.getMenuInfoByMenuId(menuIds)
        console.log(menus, 'menus')
        return menus
    }
}