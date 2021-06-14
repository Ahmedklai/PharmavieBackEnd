import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { MailService } from 'src/mail/mail.service';
import { QueryConfigDto } from 'src/products/dto/queryConfig.dto';
import { User } from 'src/user/entity/user.model';
import { CreateOrderDto } from './dto/createOrder.dto';
import { Order } from './order.model';

@Injectable()
export class OrderService {
   constructor(
      @InjectModel('Order') private readonly orderModel: Model<Order>
      , private mailService: MailService
      ) {}
   async insertOrder(order: CreateOrderDto, user: User) {
    
        let newOrder;
  
        try {
          order['user'] = user ; 
         var obj = JSON.parse(JSON.stringify(order));
         
         newOrder = new this.orderModel(obj);
         newOrder.save();
         
        } catch (e) {
          return e;
        }
        await this.mailService.sendUserConfirmation(user , newOrder );
        return newOrder;
      }
  

      async getOrders() {
         const products = await this.orderModel
           .find()
          
           .exec();
         return products.map((product) => ({
           id: product.id,
           user : product.user,
           pharmacie: product.pharmacie,
           products : product.products,
           
         }));
       }
   
   



}
