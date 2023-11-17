import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { RoleMenusService } from './role-menus.service'
@Controller('RoleMenus')
export class RoleMenusController {
  constructor(private readonly userService: RoleMenusService) {}

}
