import { Controller, Body, Post, Get, UseFilters, ForbiddenException } from '@nestjs/common';
import { MenusService } from './menus.service'
import { SaveMenuDto } from './dto/save-menu.dto';
import { RemoveMenuDto } from './dto/remove-menu.dto';
   
import {
    ApiOperation,
    ApiTags,
  } from '@nestjs/swagger';
@Controller('menus')
@ApiTags('菜单管理')
export class MenusController {
    constructor(private menusService: MenusService) {}

    @ApiOperation({ summary: '菜单创建/修改', description: ''})
    @Post('/save-current-menu')
    async saveMenu(@Body() saveRoleDto: SaveMenuDto) {
        const {_id} = saveRoleDto
        if(_id) {
            return this.menusService.updataMenu(saveRoleDto)
        } else {
            delete saveRoleDto._id
            return this.menusService.saveMenu(saveRoleDto)
        }
    }

    @ApiOperation({ summary: '菜单删除', description: ''})
    @Post('/remove-current-menu')
    async removeCurrentMenu(@Body() removeRoleDto: RemoveMenuDto) {
        return this.menusService.removeCurrentMenu(removeRoleDto)
    }

    @ApiOperation({ summary: '菜单列表', description: ''})
    @Get('/menu-lists')
    async menusList() {
        return this.menusService.menusList()
    }
}
