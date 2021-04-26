import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsSchema } from './product.model';

@Module({

  imports : [MongooseModule.forFeature([{name : 'Product' , schema : ProductsSchema}])] ,
  controllers : [ProductsController] ,
  providers : [ProductsService] ,
  exports : [ProductsService],



})
export class ProductsModule {}
