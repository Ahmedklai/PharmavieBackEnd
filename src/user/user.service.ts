import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/creatUser.dto';
import { User } from './entity/user.model';
import * as bcrypt from 'bcrypt';

import { LoginUserDto } from './dto/loginUser.dto';
import { AuthService } from 'src/auth/auth.service';
@Injectable()
export class UserService {
  
  
    constructor(

        @InjectModel('User') 
        private readonly userModel: Model<User>,
       
        private readonly authService: AuthService,
    ) {

    }

    // ┌─┐┬─┐┌─┐┌─┐┌┬┐┌─┐  ┬ ┬┌─┐┌─┐┬─┐
    // │  ├┬┘├┤ ├─┤ │ ├┤   │ │└─┐├┤ ├┬┘
    // └─┘┴└─└─┘┴ ┴ ┴ └─┘  └─┘└─┘└─┘┴└─

    
    async register(userData: CreateUserDto): Promise<any> {
      const email = userData.email ;
      const userName = userData.userName ;
        
        
         if (await this.userModel.findOne({email}))
         throw new ConflictException(`Le username et le email doivent être unique`);
         if (await this.userModel.findOne({userName}))
         throw new ConflictException(`Le username et le email doivent être unique`);
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
        return {
          
          accessToken: await this.authService.createAccessToken(user._id),
        };
      }


    // ┬  ┌─┐┌─┐┬┌┐┌
    // │  │ ││ ┬││││
    // ┴─┘└─┘└─┘┴┘└┘
 async login( userData: LoginUserDto) {
 
  const user = await this.findUserByEmail(userData.email);
        console.log(user);
     
        await this.checkPassword(userData.password, user);
        await user.save();
        return {
            userName: user.userName,
            email: user.email,
            role :user.role ,
            // accessToken: await this.authService.createAccessToken(user._id),
            // refreshToken: await this.authService.createRefreshToken(req, user._id),
        };
    }
    
    private async findUserByEmail(email: string): Promise<User> {
      const user = await this.userModel.findOne({email});
      
      if (!user) {
      
        throw new NotFoundException('Wrong email or password.');
      }
      
      return user;
    }
    private async checkPassword(attemptPass: string, user) {
      const  hashedPass = await bcrypt.hash(attemptPass , user.salt)
      const match = hashedPass === user.password;
      if (!match) {
          
          throw new NotFoundException('Wrong email or password...');
      }
   
      return match;
    }



  


}
