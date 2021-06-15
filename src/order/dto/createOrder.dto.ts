import {
   IsNotEmpty,
   MinLength,
   MaxLength,
   IsEmail,
   IsString,
 } from 'class-validator';
 import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entity/user.model';
import { Pharmacie } from 'src/pharmacie/pharmacie.model';
import { Product } from 'src/products/product.model';

 
 export class CreateOrderDto {
  
 
   @ApiProperty({
     example: '{name : "Pharmacie XYZ , adresse : "tu" ...}',
     description: 'Pharmacie Object',
     format: 'string',
   })
   @IsNotEmpty()
   @IsString()
   readonly pharrmacie: Pharmacie;
   @ApiProperty({
     example: '{product1 , product2 .....}',
     description: 'Table of products ',
     format: 'string',
   })
   @IsNotEmpty()
   @IsString()
   readonly products: Product[];
 
 
 }
 