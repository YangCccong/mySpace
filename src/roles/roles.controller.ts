import { Controller, Body, Post, Get, UseGuards, UseFilters, ForbiddenException } from '@nestjs/common';
import { RolesService } from './roles.service'
import { SaveRoleDto } from './dto/save-role.dto';
import { RemoveRoleDto } from './dto/remove-role.dto';
import { AuthGuard } from '@nestjs/passport';
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
@ApiTags('角色管理')

export class RolesController {
    constructor(private rolesService: RolesService) {}

    @ApiOperation({ summary: '角色创建/修改', description: ''})
    @ApiBody({ type: SaveRoleDto, description: '输入用户名和密码' })
    @Post('/save-current-role')
    @UseGuards(AuthGuard('jwt'))

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
}
