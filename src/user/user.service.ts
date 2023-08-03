import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema'
@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) { }

  async createUser(user: CreateUserDto): Promise<User> {
    return this.userModel.create(user);
  }


  async updataUser(SaveRoleDto) {
    const { _id } = SaveRoleDto
    return this.userModel.findOneAndUpdate({ _id }, SaveRoleDto)
  }

  async removeCurrentUser(removeRoleDto) {
    const { _id } = removeRoleDto
    return this.userModel.findByIdAndRemove({ _id });
    // return this.userModel.deleteOne(removeRoleDto);
  }

  async usersList(): Promise<User[]> {
    return this.userModel.find().exec()
  }

  async getUser(query: object): Promise<User> {
    return this.userModel.findOne(query);
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
