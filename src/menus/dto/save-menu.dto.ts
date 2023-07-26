import { ApiProperty } from "@nestjs/swagger";
export class SaveMenuDto {
    _id?: string;

    @ApiProperty({ description: '菜单名称', default: '菜单名称' })
    name: string;

    @ApiProperty({ description: '父级菜单', default: '' })
    parentId: string;

    @ApiProperty({ description: '是否隐藏', default: '' })
    hidden: boolean

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

    @ApiProperty({ description: '菜单功能', default: [] })
    menuFunctions?: [];
}