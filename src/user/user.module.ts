import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entity/user.model';
import { AuthModule } from 'src/auth/auth.module';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';

@Module({
  imports : [
    AuthModule,
    MongooseModule.forFeature([{name : 'User' , schema : UserSchema}])] ,
  providers: [UserService , JwtStrategy],
  controllers: [UserController]
})
export class UserModule {}
