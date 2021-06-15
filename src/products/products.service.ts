import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Exception } from 'handlebars/runtime';
import { Model } from 'mongoose';
import { User } from 'src/user/entity/user.model';
import { CreateProductDto } from './dto/createProduc.dto';
import { QueryConfigDto } from './dto/queryConfig.dto';

import { Comment, Product, ProductsSchema } from './product.model';
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}
  async getPromotions(options: QueryConfigDto) {
    const products = await this.productModel
      .find()
      .where({ isPromotion: true })
      .skip(Number(options.offset))
      .limit(Number(options.limit))
      .exec();
    return products.map((product) => ({
      id: product.id,
      createdAt: product.createdAt,
      name: product.name,
      description: product.description,
      publicPrice: product.publicPrice,
      path: product.path,
      form: product.form,
      laboratory: product.laboratory,
      isPromotion: product.isPromotion,
      newPrice: product.newPrice,
      pharmacies : product.pharmacies 
    }));
  }
  async getBestSelling(options: QueryConfigDto) {
    const products = await this.productModel
      .find()
      .where({ isBestSelling: true })
      .skip(Number(options.offset))
      .limit(Number(options.limit))
      .exec();
    return products.map((product) => ({
      id: product.id,
      createdAt: product.createdAt,
      name: product.name,
      description: product.description,
      publicPrice: product.publicPrice,
      path: product.path,
      form: product.form,
      isBestSelling: product.isBestSelling,
      laboratory: product.laboratory,
      isPromotion: product.isPromotion,
      newPrice: product.newPrice,
      pharmacies : product.pharmacies 
    }));
  }
  async insertProduct(product: CreateProductDto, user: User) {
    if (user.role == 'admin') {
      let newProduct;

      try {
        var obj = JSON.parse(JSON.stringify(product));
        newProduct = new this.productModel(obj);
        newProduct.save();
      } catch (e) {
        return e;
      }

      return newProduct;
    }

    throw new UnauthorizedException('ONLY ADMINS CAN ADD PRODUCTS');
  }

  async getProducts(options: QueryConfigDto) {
    const products = await this.productModel
      .find()
      .skip(Number(options.offset))
      .limit(Number(options.limit))
      .exec();
    return products.map((product) => ({
      id: product.id,
      createdAt: product.createdAt,
      name: product.name,
      description: product.description,
      publicPrice: product.publicPrice,
      path: product.path,
      form: product.form,
      laboratory: product.laboratory,
      newPrice:product.newPrice,
      conditioning:product.conditioning,
      isBestSelling:product.isBestSelling,
      isPromotion:product.isPromotion,
      rating:product.rating,
      presentation:product.presentation,
      specification:product.specification,
      DurationOfConversation:product.DurationOfConversation,
      pharmacies:product.pharmacies
    }));
  }



 


  async getSingleProduct(productId: string) {
    const product = await  this.findProduct(productId);
    return {
      id: product.id,
      createdAt: product.createdAt,
      name: product.name,
      description: product.description,
      publicPrice: product.publicPrice,
      path: product.path,
      form: product.form,
      laboratory: product.laboratory,
      newPrice:product.newPrice,
      conditioning:product.conditioning,
      isBestSelling:product.isBestSelling,
      isPromotion:product.isPromotion,
      rating:product.rating,
      presentation:product.presentation,
      specification:product.specification,
      DurationOfConversation:product.DurationOfConversation,
      pharmacies:product.pharmacies
    };
  }
  private async findProduct(id: string): Promise<Product> {
    let product;
    try {
      product =await this.productModel.findById(id).populate('Pharmacy').exec();
      // console.log((await this.productModel.findById(id)).populated('Pharmacy').exec())
    } catch (e) {
      throw new NotFoundException('Could Not Found this product ');
    }

    if (!product) {
      throw new NotFoundException('Could Not Found this product ');
    }
    return product;
  }

  /////////////////////////////////////////

  async findProductByCategory(category: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.find({ form: category }).exec();
    } catch (e) {
      throw new NotFoundException('Could Not Found this product ');
    }

    if (!product) {
      throw new NotFoundException('Could Not Found this product ');
    }
    return product;
  }
  async findProductByName(name: string): Promise<Product> {
    let product;
    try {
      var regexp = new RegExp("^"+ name);
      product = await this.productModel.find({ name: regexp }).exec();
    } catch (e) {
      throw new NotFoundException('Could Not Found this product ');
    }

    if (!product) {
      throw new NotFoundException('Could Not Found this product ');
    }
    return product;
  }

  async removeProduct(id: string, user: User): Promise<any> {
    console.log(user);
    if (user.role == 'admin') {
      let product;
      try {
        product = await this.productModel.findByIdAndDelete(id).exec();
      } catch (e) {
        throw new NotFoundException(e);
      }

      if (!product) {
        throw new NotFoundException('Could Not Found this product ');
      }
      return product;
    }
    throw new UnauthorizedException('ONLY ADMINS CAN DELETE PRODUCTS');
  }
  async addComment(newComment:Comment,user:User,productId:string){
    try {
      let product = await this.productModel.findById(productId);
      if (!product) {
        throw new NotFoundException('No Product with this id');
      }
      newComment.username = user.userName;
      product.comments.push(newComment) ;
      product.save();
      return newComment;
    } catch (error) {
      console.error(error);
      throw  new NotFoundException('No Product with this id');
    }
  }
  async getComments(productId:string){
    try {
      let product = await this.productModel.findById(productId);
      if (!product) {
        throw new NotFoundException('No Product with this id');
      }
      return product.comments;
    } catch (error) {
      throw  new NotFoundException('No Product with this id');
    }
  }
  async deleteComment(productId:string,commentId:string){
    try {
      let product = await this.productModel.findById(productId);
      if (!product) {
        throw new NotFoundException('No Product with this id');
      }
      let index = product.comments.findIndex(comment=>comment.id === commentId);
      if(index === -1){
        throw new NotFoundException('Comment not found');
      }
      product.comments.splice(index,1);
      product.save();
      return product.comments;
    } catch (error) {
      throw  new NotFoundException(error.message);
    }
  }
  async updateProduct(newProduct: Product, user: User): Promise<any> {
    if (user.role == 'admin') {
      if (!newProduct.id) {
        throw new NotFoundException('WE NEED ID RIGHT HERE PLEASE');
      }
      let product;
      try {
        product = await this.productModel
          .updateOne({ _id: newProduct.id }, newProduct)
          .exec();
      } catch (e) {
        throw new NotFoundException(e);
      }

      if (!product) {
        throw new NotFoundException('Could Not Found this product ');
      }
      return product;
    }
    throw new UnauthorizedException('ONLY ADMINS CAN UPDATE PRODUCTS');
  }
}
