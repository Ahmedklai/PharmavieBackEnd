import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/entity/user.model';
import { CreatePharmacieDto } from './dto/createPharmacie.dto';
import { Pharmacie } from './pharmacie.model';

@Injectable()
export class PharmacieService {

  constructor( 
      
    @InjectModel('Pharmacie') private readonly pharmacyModel: Model<Pharmacie>,)
    
    {}

    async insertPharmacie(pharmacie: CreatePharmacieDto, user: User) {
        if (user.role == 'admin') {
          let newPharmacie;
    
          try {
            var obj = JSON.parse(JSON.stringify(pharmacie));
            newPharmacie = new this.pharmacyModel(obj);
            newPharmacie.save();
          } catch (e) {
            return e;
          }
    
          return newPharmacie;
        }
    
        throw new UnauthorizedException('ONLY ADMINS CAN ADD PRODUCTS');
      }

}
