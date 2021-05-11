import * as mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import { Double } from 'typeorm';


export const PharmacieSchema = new mongoose.Schema(
  {
    nomprenom: { type: String, required: true },
    code: { type: String, required: true },
    region: { type: String, required: true },
    gouvernorat: { type: String, required: true },
    cp: { type: String, required: true },
    adresse: { type: String, required: true  },
    longitude: { type: Number , required: true },
    latitude: { type: Number , required: true },
    image: { type: String , required: true },
    tel: { type: String, required: true  },
    fax: { type: String },
    email: { type: String },
    hmatin: { type: String },
    hapresmidi: { type: String },
    hsoir: { type: String },
    journuit: { type: String },
  },
  { timestamps: true },
);

export interface Pharmacie extends mongoose.Document {
    nomprenom: string;
    code: string;
    gouvernorat: string;
    region: string;
    cp: string;
    adresse: string;
    longitude: number;
    latitude: number;
    image: string;
    tel: string;
    fax: string;
    email: string;
    hmatin: string;
    hapresmidi: string;
    hsoir: string;
    journuit: string;
}