/**
 * https://github.com/typestack/class-validator#usage
 */
import { IsNotEmpty, MinLength, MaxLength, } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {

    @ApiProperty({ description: 'id', default: '' })
    _id?: string;


    @ApiProperty({ description: '账号', default: 'admin' })
    @IsNotEmpty({ message: '账号不能为空' })
    username: string;

    @ApiProperty({ description: '密码', default: '123456' })
    @IsNotEmpty({ message: '密码不能为空' })
    @MinLength(6, {
        message: '密码长度不能小于6位',
    })
    @MaxLength(20, {
        message: '密码长度不能超过20位',
    })
    password: string;

    @ApiProperty({ description: '姓名', default: '张三' })
    fullname: string;

    @ApiProperty({ description: '邮箱', default: '591424149@qq.com' })
    email: string;
}

export class RemoveUserDto {
    @ApiProperty({ description: 'id', default: '' })
    _id: string;
}
