import { Controller, Body, Post, Get, UseGuards, UseFilters, ForbiddenException } from '@nestjs/common';
import { RolesService } from './roles.service'
import { SaveRoleDto } from './dto/save-role.dto';
import { RemoveRoleDto } from './dto/remove-role.dto';
import { AuthGuard } from '@nestjs/passport';
// import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { HttpException, BadRequestException } from '@nestjs/common';
import { RoleMenusService } from './RoleMenus/role-menus.service'

   
import {
    ApiOperation,
    ApiTags,
    ApiQuery,
    ApiBody,
    ApiResponse,
  } from '@nestjs/swagger';

@Controller('role')
@ApiTags('角色管理')

export class RolesController {
    constructor(private rolesService: RolesService, private RoleMenusService: RoleMenusService) {}

    @ApiOperation({ summary: '角色创建/修改', description: ''})
    @ApiBody({ type: SaveRoleDto, description: '输入用户名和密码' })
    @Post('/save-current-role')
    @UseGuards(AuthGuard('jwt'))

    async saveRole(@Body() saveRoleDto: SaveRoleDto) {
        console.log(saveRoleDto,'====>>> ')
        const { _id, routes } = saveRoleDto
        let id = _id || ''
        let role = undefined
        if(id) {
            console.log(id,1)
            role = await this.rolesService.updataRole(saveRoleDto)
        } else {
            console.log(id,2)
            delete saveRoleDto._id
            role = await this.rolesService.saveRole(saveRoleDto)
            console.log(role, 'role === ')
        }
        console.log(role, '当前角色 ====>>>> ')
        await this.RoleMenusService.removeRoleMenus(id);
        const promises = routes.map(menuId => {
            return this.RoleMenusService.createRoleMenus({ roleId: _id, menuId })
        })
        Promise.all(promises).then(res => {
            return res
        })
    }

    @ApiOperation({ summary: '角色删除', description: ''})
    @Post('/remove-current-role')
    @UseGuards(AuthGuard('jwt')) 

    async removeCurrentRole(@Body() removeRoleDto: RemoveRoleDto) {
        return this.rolesService.removeCurrentRole(removeRoleDto)
    }

    @ApiOperation({ summary: '角色列表', description: ''})
    @Get('/role-lists')
    @UseGuards(AuthGuard('jwt'))
    async rolesList() {
        return this.rolesService.rolesList()
    }

    @ApiOperation({ summary: '当前角色菜单', description: ''})
    @Post('/role-menus')
    @UseGuards(AuthGuard('jwt'))
    async rolesMenus(@Body() currentRole) {
        // console.log(currentRoleId)
        const { currentRoleId } = currentRole
        return this.rolesService.getRoleInfoByIds([currentRoleId])
    }
}
