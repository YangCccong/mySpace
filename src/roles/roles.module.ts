import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from './schemas/role.schema';
import { UserRolesModule } from './RoleMenus/role-menus.module'

@Module({
  imports: [MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]), UserRolesModule],
  controllers: [RolesController],
  providers: [RolesService]
})
export class RolesModule {}
