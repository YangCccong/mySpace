import { IsNotEmpty } from 'class-validator';

export class LoginDTO {
    readonly iv: string;

    readonly encryptedData: string;

    @IsNotEmpty({ message: 'code不能为空' })
    readonly code: string;
}