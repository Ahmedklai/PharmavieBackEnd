import {
    IsNotEmpty,
    MinLength,
    MaxLength,
    IsEmail,
    IsString,
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
  import { isBoolean } from 'node:util';
  
  export class CreatePharmacieDto {
    @ApiProperty({
      example: 'Ahmed Klai',
      description: 'Name of the Owner ',
      format: 'string',
      minLength: 6,
      maxLength: 255,
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(255)
    readonly nomprenom: string;
  
    @ApiProperty({
      example: '121241243254552415',
      description: 'Code of the pharmacie',
      format: 'string',
    })
    @IsNotEmpty()
    @IsString()
    readonly code: string;


    @ApiProperty({
      example: 'Tunis',
      description: 'The gouvernorat of the Pharmacy ',
      format: 'string',
    })
    @IsNotEmpty()
    @IsString()
    readonly gouvernorat: string;
  
    @ApiProperty({
      example: '7100',
      description: 'Postal Code',
      format: 'string',
    })
    @IsNotEmpty()
    @IsString()
    readonly cp: string;
  
    @ApiProperty({
      example: 'La marsa',
      description: 'region of the Pharmacy ',
      format: 'string',
    })
    @IsNotEmpty()
    @IsString()
    readonly region: string;
  
    @ApiProperty({
      example: '71 133 122',
      description: 'Main tel number',
      format: 'string',
    })
    @IsNotEmpty()
    @IsString()
    readonly tel: string;


    @ApiProperty({
        example: '71 134 122',
        description: 'Main fax number',
        format: 'string',
    })
    @IsNotEmpty()
    readonly fax;


    @ApiProperty({
      example: 'Place 7 Novembre, 2070 la marsa',
      description: 'the complete adresse ',
      format: 'string',
    })
    @IsNotEmpty()
    @IsString()
    readonly adresse: string;

    
    @ApiProperty({
        example: 9.52596037231,
        description: 'the longitude of the Pharmacy location ',
        format: 'number',
     
    })
    @IsNotEmpty()
    readonly longitude;

    @ApiProperty({
        example: 9.52596037231,
        description: 'the longitude of the Pharmacy location ',
        format: 'number',
     
    })
    @IsNotEmpty()
    readonly latitude;

    @ApiProperty({
        example: "https:/dhgnjmkdgag.sadgf",
        description: 'the path of the pharmacy image ',
        format: 'string',
     
    })
    @IsNotEmpty()
    readonly image;

    @ApiProperty({
        example: "hammouda@hmed.ahmed",
        description: 'email of the pharmacy ',
        format: 'string',
     
    })
    @IsNotEmpty()
    readonly email;

    @ApiProperty({
        example: "08H a 17H30",
        description: 'Hour of work in the morning',
        format: 'string',
     
    })
    @IsNotEmpty()
    readonly hmatin;

    @ApiProperty({
        example: "08H a 17H30",
        description: 'Hour of work in the afternoon',
        format: 'string',
     
    })
    @IsNotEmpty()
    readonly hapresmidi;

    @ApiProperty({
        example: "08H a 17H30",
        description: 'Hour of work in the soir',
        format: 'string',
     
    })
    @IsNotEmpty()
    readonly hsoir;

    @ApiProperty({
        example: "J pour jour et N pour nuit ",
        description: 'Night or morning pharmacy ',
        format: 'string',
     
    })
    @IsNotEmpty()
    readonly journuit;
  }
  


