import { OrderSchema } from './order.model';
import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MailModule } from '../mail/mail.module';

@Module({


   imports : [MongooseModule.forFeature([{name : 'Order' , schema :  OrderSchema }]) ,MailModule ] ,
   controllers : [OrderController] ,
   providers : [OrderService] ,
   exports : [OrderService],
 })
export class OrderModule {

  



}
