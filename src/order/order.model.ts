import * as mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import { Pharmacie, PharmacieSchema } from '../pharmacie/pharmacie.model';
import { Product, ProductsSchema } from '../products/product.model';
import {UserSchema , User} from '../user/entity/user.model';

export const OrderSchema = new mongoose.Schema(
  {
    user : {type : UserSchema} , 
    pharmacies: { type: PharmacieSchema},
   products :  {type : [ProductsSchema]}
  },
  { timestamps: true },
);

export interface Order extends mongoose.Document {
  user : User;
  products : Product[];
  pharmacies : Pharmacie;
}