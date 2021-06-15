import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  HttpStatus,
  UseGuards,
  Req,
  Query,
  Put,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Comment, Product } from './product.model';
import { ProductsService } from './products.service';
import { User } from 'src/user/decorators/user.decorator';
import { CreateProductDto } from './dto/createProduc.dto';
import { ApiHeader, ApiParam } from '@nestjs/swagger';
import { QueryConfigDto } from './dto/queryConfig.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth.',
  })
  @Post('/add')
  @UseGuards(JwtAuthGuard)
  async addProduct(@Body() product: CreateProductDto, @User() user) {
    return await this.productsService.insertProduct(product, user);
  }

  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth.',
  })
  @Get('/getAll')
  async getAllProducts(@Req() req) {
    const products = await this.productsService.getProducts(req.query);
    return products;
  }

  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth.',
  })
  @ApiParam({ name: 'id', description: 'id of article we want to get.' })
  @Get('/get/:id')
  @UseGuards(JwtAuthGuard)
  async getProductById(@Param('id') id) {
    const product = await this.productsService.getSingleProduct(id);
    return product;
  }

  @Get('/get/category/:cat')
  async getProductByCategory(@Param('cat') cat) {
    const product = await this.productsService.findProductByCategory(cat);
    return product;
  }

  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth.',
  })
  @ApiParam({
    name: 'name',
    description: 'The first part of the name of your products',
  })
  @Get('/get/name/:name')
  async getProductByName(@Param('name') name) {
    const product = await this.productsService.findProductByName(name);
    return product;
  }

  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth.',
  })
  @ApiParam({ name: 'id', description: 'id of article we want to delete.' })
  @Delete('/remove/:id')
  @UseGuards(JwtAuthGuard)
  async removeProduct(@User() user, @Param('id') id) {
    console.log(user);
    await this.productsService.removeProduct(id, user);
    return {
      statusCode: HttpStatus.OK,
      message: 'Product  deleted successfully',
    };
  }

  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth.',
  })
  @ApiParam({ name: 'Product', description: 'Product body y compris lid' })
  @Put('/update')
  @UseGuards(JwtAuthGuard)
  async updateProduct(@User() user, @Body() product: Product) {
    const addProduct = await this.productsService.updateProduct(product, user);
    return {
      statusCode: HttpStatus.OK,
      message: 'Product  updated successfully',
      data: addProduct,
    };
  }

  @Get('/promotions')
  async getPromotion(@Query() query: QueryConfigDto) {
    const promotions = await this.productsService.getPromotions(query);
    return {
      statusCode: HttpStatus.OK,
      message: 'promotions are here',
      data: promotions,
    };
  }
  @Get('/bestSelling')
  async getbest(@Query() query: QueryConfigDto) {
    const promotions = await this.productsService.getBestSelling(query);
    return {
      statusCode: HttpStatus.OK,
      message: 'promotions are here',
      data: promotions,
    };
  }
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth.',
  })
  @ApiParam({
    name: 'product id',
    description: 'product id to add comment',
  })
  @UseGuards(JwtAuthGuard)
  @Post('/add-comment/:productId')
  async addComment(@Param('productId') productId,@Body() newComment:Comment,@User() user) {
    const comment = await this.productsService.addComment(newComment,user,productId);
    return comment;
  }
  
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth.',
  })
  @ApiParam({
    name: 'product id',
    description: 'product id to get comments',
  })
  @Get('/comments/:productId')
  async getComments(@Param('productId') productId) {
    const comments = await this.productsService.getComments(productId);
    return comments;
  }
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth.',
  })
  @ApiParam({
    name: 'name',
    description: 'The first part of the name of your products',
  })
  @UseGuards(JwtAuthGuard)
  @Delete('/comment/:productId/:commentId')
   async deleteComment(@Param('productId') productId,@Param('commentId') commentId) {
    const comments = await this.productsService.deleteComment(productId,commentId)
     return comments;
  }
}
