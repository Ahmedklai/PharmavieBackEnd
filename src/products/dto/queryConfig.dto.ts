import { IsNotEmpty, MinLength, MaxLength, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class QueryConfigDto {
    @ApiProperty({
        example: 0,
        description: 'Offset',
        format: 'number',
        minLength: 6,
        maxLength: 255,
    })
    @IsNotEmpty()
    @IsString()
   
    readonly offset: number;

    @ApiProperty({
        example: 0,
        description: 'Limit',
        format: 'number',
        minLength: 6,
        maxLength: 255,
    })
    @IsNotEmpty()
    @IsString()
   
    readonly limit: number;



   

   

   

}