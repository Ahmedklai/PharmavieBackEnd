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
import { Product } from './product.model';
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
  @UseGuards(JwtAuthGuard)
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
}
