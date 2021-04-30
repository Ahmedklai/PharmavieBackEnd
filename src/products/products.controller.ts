import { Controller,Post,Body,Get,Param,Patch,Delete ,HttpStatus, UseGuards, Req, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Product } from './product.model';
import { ProductsService}from './products.service'
import { User } from 'src/user/decorators/user.decorator';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Post('/add')
    @UseGuards(JwtAuthGuard)
    async addProduct(
        @Body() product: Product,
        @User() user ,
        
    ) {
        console.log(user);
        
        const addProduct = await this.productsService.insertProduct(
            product , user
        );
      
        return {
            statusCode: HttpStatus.OK,
            message: 'Product  added successfully',
            data: addProduct,
        };
    }


    @Get('/getAll')
    @UseGuards(JwtAuthGuard)

    async  getAllProducts () {
        const products = await this.productsService.getProducts();
        return products ;
    } 
    @Get('/get/:id')
    @UseGuards(JwtAuthGuard)
    async  getProductById (@Param('id') id) {
        const product = await this.productsService.getSingleProduct(id);
        return product ;
    } 
    @Get('/get/category/:cat')
   
    async  getProductByCategory (@Param('cat')cat)  {
        const product = await this.productsService.findProductByCategory(cat);
        return product ;
    } 

    @Delete('/remove')
    @UseGuards(JwtAuthGuard)
    async removeProduct(
        @User() user ,
        @Body() id: string,
        
    ) {
    console.log(user) ;
      await this.productsService.removeProduct(id ,user);
        return {
            statusCode: HttpStatus.OK,
            message: 'Product  deleted successfully',
          
        };
    }
    @Put('/update')
    @UseGuards(JwtAuthGuard)
    async updateProduct(
        @User() user ,
        @Body() product: Product,
        
    ) {
        
        const addProduct = await this.productsService.updateProduct(
            product , user
        );
      
        return {
            statusCode: HttpStatus.OK,
            message: 'Product  updated successfully',
            data: addProduct,
        };
    }


}
