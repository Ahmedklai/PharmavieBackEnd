import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/entity/user.model';

import { Product } from './product.model';
@Injectable()
export class ProductsService {

  constructor (@InjectModel('Product') private readonly productModel : Model<Product>) {}
  
  async insertProduct(product : Product , user : User) {
  if(user.role == 'admin') {

    var obj = JSON.parse(JSON.stringify(product));
    const newProduct = new this.productModel(
      obj
    );
    newProduct.save();
    return newProduct;
  }

    throw new UnauthorizedException("ONLY ADMINS CAN ADD PRODUCTS")
   }

    async getProducts() {
        const products = await this.productModel.find().exec();
        return products.map(product => ({
          id: product.id,
          createdAt: product.createdAt,
          name: product.name,
          description: product.description,
          publicPrice: product.publicPrice,
          path : product.path ,
          form : product.form,
          laboratory: product.laboratory,
        }));
      }    


      async getSingleProduct(productId: string) {
        const product = await this.findProduct(productId);
        return {
          id: product.id,
          createdAt: product.createdAt,
          name: product.name,
          description: product.description,
          publicPrice: product.publicPrice,
          path : product.path ,
          form : product.form,
          laboratory: product.laboratory,
      
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

    /////////////////////////////////////////

     async   findProductByCategory(category: string ) : Promise<Product> {
      let product ;
     try {
         product = await this.productModel.find({form: category}).exec()
     } catch (e) {
      throw new NotFoundException('Could Not Found this product ');
     }
  
     if (!product) {
      throw new NotFoundException('Could Not Found this product ');
     }
          return  product ;
      }
  

     async   removeProduct(id: string , user :User) : Promise<any> {
       console.log(user)
     if (user.role == 'admin') 
     {
      let product ;
     try {
         product = await this.productModel.findByIdAndDelete(id).exec();
       
     } catch (e) {
      throw new NotFoundException( e);
     }
  
     if (!product) {
      throw new NotFoundException('Could Not Found this product ');
     }
     return (product);
    }
     throw new UnauthorizedException("ONLY ADMINS CAN DELETE PRODUCTS")
      
      }

      async   updateProduct( newProduct : Product , user : User) : Promise<any> {
   
        if (user.role == 'admin') {
      if(!newProduct.id) {
        throw new NotFoundException("WE NEED ID RIGHT HERE PLEASE") ;
      }
        let product ;
       try {
           product = await this.productModel.updateOne({_id:newProduct.id},newProduct).exec();
  

       } catch (e) {
        throw new NotFoundException( e);
       }
    
       if (!product) {
        throw new NotFoundException('Could Not Found this product ');
       }
       return (product) ;
        
        }
        throw new UnauthorizedException("ONLY ADMINS CAN UPDATE PRODUCTS") ;
      }
       

  }




