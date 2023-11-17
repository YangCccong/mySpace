import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import {UserRolesService } from './userRoles.service'
@Controller('UserRoles')
export class userRolesController {
  constructor(private readonly userService: UserRolesService) {}

}
