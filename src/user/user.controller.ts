import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRolesService } from './userRoles/userRoles.service'
import { CreateUserDto, RemoveUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

import {
  ApiTags,
  ApiOperation
} from '@nestjs/swagger';
@ApiTags('用户管理')  // 设置分类
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly UserRolesService: UserRolesService) {}
  
  @ApiOperation({ summary: '用户创建', description: '' })
  @Post('/signup')
  async createUser(@Body() user: CreateUserDto): Promise<User> {
    const { _id, password } = user
    const saltOrRounds = 10;
    // bcrypt 散列用户密码
    if(_id) {
        return this.userService.updataUser(user)
    } else {
        delete user._id
        const hashedPassword = await bcrypt.hash(password, saltOrRounds);
        const result = await this.userService.createUser({
          ...user,
          password: hashedPassword,
        });
        return result;
    }
  }


  @ApiOperation({ summary: '用户删除', description: ''})
  @Post('/remove-current-user')
  async removeCurrentUser(@Body() removeRoleDto: RemoveUserDto) {
    return this.userService.removeCurrentUser(removeRoleDto)
  }

  @ApiOperation({ summary: '用户列表', description: ''})
  @Get('/users-lists')
  async usersList() {
      return this.userService.usersList()
  }

  @ApiOperation({ summary: '用户分配角色', description: ''})
  @Post('/assign-roles')
  async usersAssignRoles(@Body() data) {
    const { userId, rolesIds } = data
    const promises = rolesIds.map(roleId => {
      return this.UserRolesService.createUserRole({userId, roleId})
    })
    Promise.all(promises).then(res => {
      return res
    })
  }
}
