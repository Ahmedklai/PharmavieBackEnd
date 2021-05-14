import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import {ConfigModule , ConfigService } from '@nestjs/config'
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UserSchema } from 'src/user/entity/user.model';
import { JwtStrategy } from './strategies/jwt.strategy';
require("dotenv").config();
@Module({
    imports: [
      MongooseModule.forFeature([
        { name: 'User', schema: UserSchema },
      
      ]),
      PassportModule.register({defaultStrategy : 'jwt'} , ) ,
      
      JwtModule.register({
        secret: process.env.JWT_SECRET,
        
      }),
     
    ],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService],
  })
  export class AuthModule {}
