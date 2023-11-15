/**
 * https://github.com/typestack/class-validator#usage
 */
import { IsNotEmpty, MinLength, MaxLength, } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class ArticleDto {
    /**
     * id abstractContent author disableComment fullContent
     * imageURL importance pageviews platforms reviewer
     * sourceURL status timestamp title type
     */
    _id?: string;


    @ApiProperty({ description: '内容', default: '抽象内容' })
    @IsNotEmpty({ message: '请输入内容' })
    abstractContent: string;

    @ApiProperty({ description: '是否禁用', default: true })
    disableComment: boolean;

    @ApiProperty({ description: '完整内容', default: '完整内容' })
    fullContent: string;

    @ApiProperty({ description: '图片资源', default: 'https://baidu.com' })
    imageURL: string;

    @ApiProperty({ description: '重要度', default: 1 })
    importance: number;

    @ApiProperty({ description: '视图', default: 1 })
    pageviews: number;

    @ApiProperty({ description: '平台', default: [] })
    platforms: [];

    @ApiProperty({ description: '视图1', default: '视图1' })
    reviewer: string;

    @ApiProperty({ description: '图片资源', default: 'https://baidu.com' })
    sourceURL: string;

    @ApiProperty({ description: '状态', default: 'open' })
    status: string;

    @ApiProperty({ description: '时间', default: 1 })
    timestamp: number;

    @ApiProperty({ description: '标题', default: '标题' })
    title: string;

    @ApiProperty({ description: '类型', default: '类型' })
    type: string;
    
}

export class RemoveArticleDto {
    @ApiProperty({ description: 'id', default: '' })
    _id: string;
}
