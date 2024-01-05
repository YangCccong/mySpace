/**
 * https://github.com/typestack/class-validator#usage
 */
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class ArticleCategoryDto {
    /**
     * id abstractContent author disableComment fullContent
     * imageURL importance pageviews platforms reviewer
     * sourceURL status timestamp title type
     */
    _id?: string;

    @ApiProperty({ description: '分类名称', default: '前端--分类' })
    @IsNotEmpty({ message: '请输入分类名称' })
    name: string;

    @ApiProperty({ description: '分类类型', default: '菜单' })
    @IsNotEmpty({ message: '请输入分类类型' })
    type: string;

    @IsNotEmpty({ message: '请输入父级菜单' })
    @ApiProperty({ description: '父级菜单', default: '' })
    parentId: string;

    @ApiProperty({ description: '排序', default: 1 })
    sort: number;

    @IsNotEmpty({ message: '请选择状态' })
    @ApiProperty({ description: '状态', default: true })
    state: boolean | string;
}

export class RemoveArticleCategoryDto {
    @ApiProperty({ description: '删除索引', default: '' })
    _id: string;
}
