import { Controller,Post,Body,Get,Param,Patch,Delete,HttpStatus } from '@nestjs/common';
import { Product } from './product.model';
import { ProductsService}from './products.service'


@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Post('/add')
    async addProduct(
        @Body() product: Product,
        
    ) {
        
        const addProduct = await this.productsService.insertProduct(
            product
        );
      
        return {
            statusCode: HttpStatus.OK,
            message: 'Product  added successfully',
            data: addProduct,
        };
    }


    @Get('/getAll')
    async  getAllProducts () {
        const products = await this.productsService.getProducts();
        return products ;
    } 

    @Post('/remove')
    async removeProduct(
        @Body() id: string,
        
    ) {
        
      await this.productsService.removeProduct(id);
        return {
            statusCode: HttpStatus.OK,
            message: 'Product  deleted successfully',
          
        };
    }


}
