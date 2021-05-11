
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PharmacieModule } from './pharmacie/pharmacie.module';
const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoHostname = process.env.MONGO_HOSTNAME;
const mongoPort = process.env.MONGO_PORT;



@Module({
  imports: [ MongooseModule.forRoot('mongodb://admin:password@localhost:27017') , ProductsModule, AuthModule , UserModule, PharmacieModule],
  controllers: [AppController ],
  providers: [AppService],
})
export class AppModule {}
