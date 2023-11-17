import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserRolesModule } from './userRoles/userRoles.module'
// import { UserRolesService } from './userRoles/userRoles.service';
@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), UserRolesModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
