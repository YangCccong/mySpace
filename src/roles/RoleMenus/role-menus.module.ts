import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleMenus, RoleMenusSchema } from './schemas/role-menus.schema'
import { RoleMenusController } from './role-menus.controller';
import { RoleMenusService } from './role-menus.service';
import { MenusModule } from '../../menus/menus.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: RoleMenus.name, schema: RoleMenusSchema }]),
    MenusModule
  ],
  controllers: [RoleMenusController],
  providers: [RoleMenusService],
  exports: [RoleMenusService]
})
export class UserRolesModule {}
