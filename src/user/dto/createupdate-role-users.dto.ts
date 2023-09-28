import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'
export class CreateOrUpdateRoleUsersDto {
  @ApiProperty({ description: '用户ID' })
  @IsString({ each: true, message: 'userIds 集合中有类型错误' })
  @IsNotEmpty({ message: 'userIds 不能为空' })
  userId: string

  @ApiProperty({ description: '角色ID集合' })
  @IsString({ each: true, message: 'rolesIds 集合中有类型错误' })
  @IsNotEmpty({ message: 'rolesIds不能为空' })
  rolesIds: string[]

  // @ApiProperty({ description: 'create/cancel', enum: ['create', 'cancel'] })
  // @IsString({ message: 'type 类型错误，正确类型 string' })
  // @IsIn(['create', 'cancel'], { message: '可选值为 create / cancel' })
  // type: 'create' | 'cancel'
}
