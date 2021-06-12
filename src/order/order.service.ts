import { Injectable } from '@nestjs/common';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { User } from 'src/user/entity/user.model';
import { CreateOrderDto } from './dto/createOrder.dto';

@Injectable()
export class OrderService {

   async insertProduct(product: CreateOrderDto, user: User) {
    
        let newOrder;
  
        try {
           console.log(user) ;
          
          var obj = JSON.parse(JSON.stringify(product));
         
        } catch (e) {
          return e;
        }
  
        return newOrder;
      }
  
   
   



}
