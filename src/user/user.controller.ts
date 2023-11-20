import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRolesService } from './userRoles/userRoles.service'
import { CreateUserDto, RemoveUserDto } from './dto/create-user.dto';
import { AuthService } from '../auth/auth.service';
import { RolesService } from '../roles/roles.service';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

import {
  ApiTags,
  ApiOperation
} from '@nestjs/swagger';
@ApiTags('用户管理')  // 设置分类
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly UserRolesService: UserRolesService,
    private readonly AuthService: AuthService,
    private readonly RolesService: RolesService,
  ) {}
  
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

  @ApiOperation({ summary: '获取用户权限及信息'})
  @Post('/info')

  async userInfo(@Body() body) {
    const { token } = body
    // 通过token 获取当前用户
    const currentUser = await this.AuthService.jwtGetInfo(token)
    const user = await this.userService.getUser({ username: currentUser['username']})
    console.log(user)
    const { _id, username, fullname, email } = user
    const menus = []
    const roles = []
    // 通过用户查找角色
    const rolesIds = (await this.UserRolesService.findRolesByUserId({ userId: _id })).map(item => item.roleId);
    // 通过角色id集合查找角色信息
    const rolesInfo = await this.RolesService.getRoleInfoByIds(rolesIds);
    return {
      _id,
      username,
      fullname,
      email,
      ...rolesInfo
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
