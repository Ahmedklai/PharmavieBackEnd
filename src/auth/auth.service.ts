import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/entity/user.model';
import * as Cryptr from 'cryptr';
import { sign } from 'jsonwebtoken';
import { JwtPayload } from './interfaces/jwt-payload.interface';
require("dotenv").config();

@Injectable()
export class AuthService {
    cryptr: any;

    constructor(
      @InjectModel('User') private readonly userModel: Model<User>,
      
      private readonly jwtService: JwtService,
    ) {
      this.cryptr = new Cryptr('process.env.JWT_SECRET');
    }

    async createAccessToken(userId: string) {
        // const accessToken = this.jwtService.sign({userId});
        const accessToken = sign({userId}, process.env.JWT_SECRET , { expiresIn: 3600 });
        return accessToken;
      }



      async validateUser(jwtPayload: JwtPayload): Promise<any> {
        const user = await this.userModel.findOne({_id: jwtPayload.userId});
        if (!user) {
          throw new UnauthorizedException('User not found.');
        }
        return user;
      }







  // ***********************
  // ╔╦╗╔═╗╔╦╗╦ ╦╔═╗╔╦╗╔═╗
  // ║║║║╣  ║ ╠═╣║ ║ ║║╚═╗
  // ╩ ╩╚═╝ ╩ ╩ ╩╚═╝═╩╝╚═╝
  // ***********************


      encryptText(text: string): string {
        return this.cryptr.encrypt(text);
      }
     
}









