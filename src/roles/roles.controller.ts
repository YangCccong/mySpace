import { Controller, Body, Post, Get } from '@nestjs/common';
import { RolesService } from './roles.service'

import { SaveRoleDto } from './dto/save-role.dto';
import { RemoveRoleDto } from './dto/remove-role.dto';
@Controller('role')
export class RolesController {
    constructor(private rolesService: RolesService) {}

    @Post('/save-current-role')
    async saveRole(@Body() saveRoleDto: SaveRoleDto) {
        return this.rolesService.saveRole(saveRoleDto)
    }

    @Post('/remove-current-role')
    async removeCurrentRole(@Body() removeRoleDto: RemoveRoleDto) {
        return this.rolesService.removeCurrentRole(removeRoleDto)
    }
    @Get('/role-lists')
    async rolesList() {
        return this.rolesService.rolesList()
    }
}
