import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Order } from 'src/order/order.model';
import { Product } from 'src/products/product.model';
import { User } from '../user/entity/user.model';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: User  , order: Order) {
    const url = `https://www.facebook.com/Ahmedklaixx/`;

    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to pharmavie ! Confirm your Email',
      template: './confirmation', // `.hbs` extension is appended automatically
      context: { // ✏️ filling curly brackets with content
        name: user.userName,
        productName : order.products[1].name ,
        productPrice : order.products[1].publicPrice ,
        fullPrice : order.products[1].publicPrice + 20  ,
        url,
      },
    });
  }
}
