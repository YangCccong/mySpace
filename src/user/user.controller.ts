import { Controller, Request, Post, Body, UseGuards, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

import {
  ApiTags,
  ApiOperation
} from '@nestjs/swagger';
@ApiTags('用户管理')  // 设置分类
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @ApiOperation({ summary: '用户创建', description: '' })
  @Post('/signup')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    const { password, username } = createUserDto
    const saltOrRounds = 10;
    // bcrypt 散列用户密码
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const result = await this.userService.createUser(
      username,
      hashedPassword,
    );
    return result;
  }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
