import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserRoles, UserRolesSchema } from './schemas/user-roles.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserRoles.name, schema: UserRolesSchema }
    ]),
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
