import { Controller, Post, Body, Get, Request } from '@nestjs/common';
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
    const { _id } = user
    const saltOrRounds = 10;
    const defaultPass = '123456';
    // bcrypt 散列用户密码
    if(_id) {
        return this.userService.updataUser(user)
    } else {
        delete user._id
        const hashedPassword = await bcrypt.hash(defaultPass, saltOrRounds);
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


  @ApiOperation({ summary: '获取当前用户角色', description: ''})
  @Post('/roles-by-userId')
  async rolesByUserId(@Body() body) {
    const { _id } = body
    const rolesIds = (await this.UserRolesService.findRolesByUserId({ userId: _id })).map(item => item.roleId);
    console.log(rolesIds)
    return rolesIds
  }

  @ApiOperation({ summary: '用户密码修改', description: ''})
  @Post('/change-password')
  async changePassword(@Body() body) {
    const { _id, newPass } = body
    const hashedPassword = await bcrypt.hash(newPass, 10);
    console.log(hashedPassword)
    await this.userService.updataUser({ _id,  password: hashedPassword })
    const token = await this.AuthService.generateToken(_id)
    return {
      message: '密码修改成功',
      token
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
    await this.UserRolesService.removeUserRole(userId)
    const promises = rolesIds.map(roleId => {
      return this.UserRolesService.createUserRole({userId, roleId})
    })
    Promise.all(promises).then(res => {
      return res
    })
  }
}
