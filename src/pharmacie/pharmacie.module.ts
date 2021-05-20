import { Module } from '@nestjs/common';
import { PharmacieService } from './pharmacie.service';
import { PharmacieController } from './pharmacie.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PharmacieSchema } from './pharmacie.model';

@Module({
  imports : [MongooseModule.forFeature([{name : 'Pharmacie' , schema : PharmacieSchema}])] ,
  controllers : [PharmacieController] ,
  providers : [PharmacieService] ,
  exports : [PharmacieService],
})
export class PharmacieModule {}
