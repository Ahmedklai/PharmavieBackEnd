import { IsNotEmpty, MinLength, MaxLength, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
    @ApiProperty({
        example: 'Example Title',
        description: 'Title of product',
        format: 'string',
        minLength: 6,
        maxLength: 255,
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(255)
    readonly name: string;


    @ApiProperty({
        example: 'Body exmaple ...',
        description: 'Main description of product',
        format: 'string',
    })
    @IsNotEmpty()
    @IsString()
    readonly description: string;
    @ApiProperty({
        example: 'path exmaple ...',
        description: 'The Url path for the product Image',
        format: 'string',
    })
    @IsNotEmpty()
    @IsString()
    readonly path: string;

    @ApiProperty({
        example: 'Sirop de 25 Ml',
        description: 'Main form of product',
        format: 'string',
    })
    @IsNotEmpty()
    @IsString()
    readonly form: string;

    @ApiProperty({
        example: 'Klais LAB',
        description: 'Main LAboratory of the  product',
        format: 'string',
    })
    @IsNotEmpty()
    @IsString()
    readonly laboratory: string;

    @ApiProperty({
        example: '2,5 Dt',
        description: 'Main price of the product',
        format: 'number',
    })
    @IsNotEmpty()
    @IsString()
    readonly publicPrice: number;
}