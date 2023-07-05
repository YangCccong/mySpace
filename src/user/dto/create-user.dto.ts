/**
 * https://github.com/typestack/class-validator#usage
 */
import { IsOptional, IsEnum, IsNotEmpty, MinLength, MaxLength, } from 'class-validator';
import { Type } from 'class-transformer';
export class CreateUserDto {

    @IsNotEmpty({ message: '用户名不能为空' })
    username: string;

    @IsNotEmpty({ message: '密码不能为空' })
    @MinLength(6, {
        message: '密码长度不能小于6位',
    })
    @MaxLength(20, {
        message: '密码长度不能超过20位',
    })
    password: string;

    @IsOptional()
    @IsEnum({ 禁用: 0, 可用: 1 }, {
        message: 'status只能传入数字0或1',
    })
    @Type(() => Number) //如果传递的是string类型，不报错，自动转成number类型
    status: number;
}
