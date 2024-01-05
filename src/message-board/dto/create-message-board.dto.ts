import { IsNotEmpty, IsNumber, IsString } from'class-validator';

import { ApiProperty } from "@nestjs/swagger";

export class CreateMessageBoardDto {
    /**
     * replyID 回复id
     * avatar 头像
     * email 邮箱
     * name 昵称
     * comment 评论内容
     * qq QQ
     * website 网址
     * system 系统信息
     * ipInfo ip信息
     */
    @ApiProperty({ description: '回复ID', default: '' })
    readonly replyID?: string;

    @ApiProperty({ description: '邮箱', default: '591424149@qq.com' })
    @IsNotEmpty({ message: '邮箱不能为空' })
    readonly email: string;

    @ApiProperty({ description: '昵称', default: '青山常有雾' })
    @IsNotEmpty({ message: '昵称不能为空' })
    readonly name: string;

    @ApiProperty({ description: '评论内容', default: '评论内容' })
    @IsNotEmpty({ message: '评论内容不能为空' })
    readonly comment: string;

    @ApiProperty({ description: '头像', default: 'https://pica.zhimg.com/v2-0d323dcedba1a1f75962603ed23dbf3b_l.jpg?source=32738c0c' })
    @IsNotEmpty({ message: '非法参数-001' })
    readonly avatar: string;

    @ApiProperty({ description: 'QQ', default: '591424149' })
    readonly qq?: string;

    @ApiProperty({ description: '网址', default: 'https://www.yangcongcong.cn' })
    readonly website?: string;

    @ApiProperty({ description: '系统信息'})
    readonly system?: object;

    @ApiProperty({ description: 'ip信息'})
    readonly ipInfo?: object;

}
