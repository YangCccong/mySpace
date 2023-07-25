import { Controller, Body, Post, Get, UseFilters, ForbiddenException } from '@nestjs/common';
import { RolesService } from './roles.service'
import { SaveRoleDto } from './dto/save-role.dto';
import { RemoveRoleDto } from './dto/remove-role.dto';
// import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { HttpException, BadRequestException } from '@nestjs/common';
   
import {
    ApiOperation,
    ApiTags,
    ApiQuery,
    ApiBody,
    ApiResponse,
  } from '@nestjs/swagger';
@Controller('role')
@ApiTags('角色管理')  // 设置分类
export class RolesController {
    constructor(private rolesService: RolesService) {}

    @ApiOperation({ summary: '角色创建/修改', description: ''})
    @ApiBody({ type: SaveRoleDto, description: '输入用户名和密码' })
    @Post('/save-current-role')
    async saveRole(@Body() saveRoleDto: SaveRoleDto) {
        const {_id} = saveRoleDto
        if(_id) {
            return this.rolesService.updataRole(saveRoleDto)
        } else {
            delete saveRoleDto._id
            return this.rolesService.saveRole(saveRoleDto)
        }
    }

    @ApiOperation({ summary: '角色删除', description: ''})
    @Post('/remove-current-role')
    async removeCurrentRole(@Body() removeRoleDto: RemoveRoleDto) {
        return this.rolesService.removeCurrentRole(removeRoleDto)
    }

    @ApiOperation({ summary: '角色列表', description: ''})
    @Get('/role-lists')
    async rolesList() {
        // 主动触发异常
        // throw new HttpException('请求失败', 200);
        // throw new ForbiddenException('请求失败', 400);
        return this.rolesService.rolesList()
    }
}
