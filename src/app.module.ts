
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PharmacieModule } from './pharmacie/pharmacie.module';
import { ThrottlerModule } from '@nestjs/throttler/dist/throttler.module';
import {OrderModule } from './order/order.module';
import { MailModule } from './mail/mail.module';
const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoHostname = process.env.MONGO_HOSTNAME;
const mongoPort = process.env.MONGO_PORT;



@Module({
  imports: [ MongooseModule.forRoot('mongodb://admin:password@localhost:27017') , ProductsModule, AuthModule , UserModule, PharmacieModule , OrderModule , 
  ThrottlerModule.forRoot({
    ttl: 60,
    limit: 10,
  }), MailModule,
],
  controllers: [AppController,  ],
  providers: [AppService, ],
})
export class AppModule {}
