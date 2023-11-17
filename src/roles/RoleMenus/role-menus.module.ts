import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleMenus, RoleMenusSchema } from './schemas/role-menus.schema'
import { RoleMenusController } from './role-menus.controller';
import { RoleMenusService } from './role-menus.service';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: RoleMenus.name, schema: RoleMenusSchema }])
  ],
  controllers: [RoleMenusController],
  providers: [RoleMenusService],
  exports: [RoleMenusService]
})
export class UserRolesModule {}
