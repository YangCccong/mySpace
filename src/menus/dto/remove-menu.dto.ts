import { ApiProperty } from "@nestjs/swagger";
export class RemoveMenuDto {
    @ApiProperty({ description: '删除id', default: '' })
    readonly _id: string;
}