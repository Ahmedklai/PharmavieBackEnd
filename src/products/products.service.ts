import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './product.model';
@Injectable()
export class ProductsService {

  constructor (@InjectModel('Product') private readonly productModel : Model<Product>) {}
  
  async insertProduct(product : Product) {
    var obj = JSON.parse(JSON.stringify(product));
    const newProduct = new this.productModel(
      obj
    );
    newProduct.save();
    return newProduct;
   }

    async getProducts() {
        const products = await this.productModel.find().exec();
        return products.map(product => ({
          id: product.id,
          name: product.name,
          description: product.description,
          publicPrice: product.publicPrice,
          path : product.path ,
        }));
      }    


      async getSingleProduct(productId: string) {
        const product = await this.findProduct(productId);
        return {
          id: product.id,
          name: product.name,
          description: product.description,
          publicPrice: product.publicPrice,
          path : product.path ,
      
      }    }
 private async   findProduct(id: string ) : Promise<Product> {
    let product ;
   try {
       product = await this.productModel.findById(id).exec();
   } catch (e) {
    throw new NotFoundException('Could Not Found this product ');
   }

   if (!product) {
    throw new NotFoundException('Could Not Found this product ');
   }
        return  product ;
    }

     async   removeProduct(id: string ) : Promise<any> {
      let product ;
     try {
         product = await this.productModel.findByIdAndDelete(id).exec();
       
     } catch (e) {
      throw new NotFoundException( e);
     }
  
     if (!product) {
      throw new NotFoundException('Could Not Found this product ');
     }
      
      }


  }




