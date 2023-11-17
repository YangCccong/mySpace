import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRoles, UserRolesSchema } from './schemas/user-roles.schema';
import { userRolesController } from './userRoles.controller';
import { UserRolesService } from './userRoles.service';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserRoles.name, schema: UserRolesSchema }])
  ],
  controllers: [userRolesController],
  providers: [UserRolesService],
  exports: [UserRolesService]
})
export class UserRolesModule {}
