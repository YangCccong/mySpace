/**
 * https://github.com/typestack/class-validator#usage
 */
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class ArticleTagDto {
    /**
     * id abstractContent author disableComment fullContent
     * imageURL importance pageviews platforms reviewer
     * sourceURL status timestamp title type
     */
    _id?: string;

    @ApiProperty({ description: '标签名称', default: '青山常有雾' })
    @IsNotEmpty({ message: '请输入标签名称' })
    name: string;

}
