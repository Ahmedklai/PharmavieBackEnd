
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


 import { User } from 'src/user/decorators/user.decorator';
 
 import { ApiHeader, ApiParam } from '@nestjs/swagger';

import { CreateProductDto } from 'src/products/dto/createProduc.dto';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/createOrder.dto';

@Controller('order')
export class OrderController {
   constructor(private readonly orderService: OrderService) {}
   @ApiHeader({
      name: 'Bearer',
      description: 'the token we need for auth.',
    })
    @Post('/add')
    @UseGuards(JwtAuthGuard)
    async addOrder(@Body() order: CreateOrderDto, @User() user) {
      return await this.orderService.insertOrder(order, user);
    }


    @ApiHeader({
      name: 'Bearer',
      description: 'the token we need for auth.',
    })
    @Post('/getAll')
    @UseGuards(JwtAuthGuard)
    async getAllOrders() {
      return await this.orderService.getOrders();
    }


  







}
