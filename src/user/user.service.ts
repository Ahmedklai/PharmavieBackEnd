import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/creatUser.dto';
import { User } from './entity/user.model';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  
    constructor(

        @InjectModel('User') private readonly userModel: Model<User>,

    ) {

    }

    // ┌─┐┬─┐┌─┐┌─┐┌┬┐┌─┐  ┬ ┬┌─┐┌─┐┬─┐
    // │  ├┬┘├┤ ├─┤ │ ├┤   │ │└─┐├┤ ├┬┘
    // └─┘┴└─└─┘┴ ┴ ┴ └─┘  └─┘└─┘└─┘┴└─

    
    async register(userData: CreateUserDto): Promise<Partial<User>> {
        const user =  await this.userModel.create({
          ...userData
        });
        
        user.salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, user.salt);
        try {
          await user.save();
        } catch (e) {
          throw new ConflictException(`Le username et le email doivent être unique`);
        }
        return user ;
    
      }
    


}
