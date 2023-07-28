import { ApiProperty } from "@nestjs/swagger";
export class SaveMenuDto {
    _id?: string;

    @ApiProperty({ description: '类型', default: '' })
    type: string;

    @ApiProperty({ description: '菜单名称', default: '' })
    name: string;

    @ApiProperty({ description: '权限标识', default: '' })
    permissionCode: string;

    @ApiProperty({ description: '父级菜单', default: '' })
    parentId: string;

    @ApiProperty({ description: '是否隐藏', default: '' })
    hidden: boolean;
    
    @ApiProperty({ description: '跳转方式', default: '1' })
    jumpMethod: string;

    @ApiProperty({ description: '跳转路径', default: 'icon' })
    path: string;

    @ApiProperty({ description: '菜单图标', default: '/test' })
    icon: string;

    @ApiProperty({ description: '排序', default: 1 })
    sort: number;

    @ApiProperty({ description: '状态', default: true })
    state: boolean;
}