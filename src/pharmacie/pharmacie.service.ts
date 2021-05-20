import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QueryConfigDto } from 'src/products/dto/queryConfig.dto';
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

  async getProducts(options: QueryConfigDto) {
    const pharmacies = await this.pharmacyModel
      .find()
      .skip(Number(options.offset))
      .limit(Number(options.limit))
      .exec();
    return pharmacies ;
  }


      async getSinglePhamrmacie(pharmacieId: string) {
        const pharmacie = await this.findPharmacie(pharmacieId);
        return {
          pharmacie 
        };
      }



      private async findPharmacie(id: string): Promise<Pharmacie> {
        let pharmacie;
        try {
          pharmacie = await this.pharmacyModel.findById(id).exec();
        } catch (e) {
          throw new NotFoundException('Could Not Found this product ');
        }
    
        if (!pharmacie) {
          throw new NotFoundException('Could Not Found this product ');
        }
        return pharmacie;
      }

      async removePharmacie(id: string, user: User): Promise<any> {
       
        if (user.role == 'admin') {
          let pharmacie;
          try {
            pharmacie = await this.pharmacyModel.findByIdAndDelete(id).exec();
          } catch (e) {
            throw new NotFoundException(e);
          }
    
          if (!pharmacie) {
            throw new NotFoundException('Could Not Found this product ');
          }
          return pharmacie;
        }
        throw new UnauthorizedException('ONLY ADMINS CAN DELETE PRODUCTS');
      }


      async updatePharmacie(newPharmacie: Pharmacie, user: User): Promise<any> {
        if (user.role == 'admin') {
          if (!newPharmacie.id) {
            throw new NotFoundException('WE NEED ID RIGHT HERE PLEASE');
          }
          let pharmacie;
          try {
            pharmacie = await this.pharmacyModel
              .updateOne({ _id: newPharmacie.id }, newPharmacie)
              .exec();
          } catch (e) {
            throw new NotFoundException(e);
          }
    
          if (!pharmacie) {
            throw new NotFoundException('Could Not Found this product ');
          }
          return pharmacie;
        }
        throw new UnauthorizedException('ONLY ADMINS CAN UPDATE PRODUCTS');
      }

}



