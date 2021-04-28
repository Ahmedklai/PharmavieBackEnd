import * as mongoose from 'mongoose';




export const UserSchema =  new mongoose.Schema({
   userName: { type: String, required: true  },
   email: { type: String, 
    required: true , lowercase: true,
    maxlength: 255,
    minlength: 6, },
   salt: { type: String },
   password : { type: String, required: true },
 

});


export interface User extends mongoose.Document {
 
  userName: string;
  email: string;
  salt: number;
  password : string ;


}
