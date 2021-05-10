import * as mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
const ContentScema = new mongoose.Schema({
  vitamine: { type: String, required: true },
  percentage: { type: Number, required: true },
});
mongoose.model('Content', ContentScema);

export const ProductsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    publicPrice: { type: Number, required: true },
    path: { type: String, required: true },
    laboratory: { type: String },
    conditioning: { type: String },
    dosage: { type: String },
    form: { type: String },
    presentation: { type: String },
    isPromotion: { type: Boolean },
    newPrice: { type: Number },
    therapeutiClass: { type: String },
    subClass: { type: String },
    specification: { type: String },
    DurationOfConversation: { type: String },
    use: { type: String },
    contreIndications: { type: String },
    tableOfContent: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Content' }],
    isBestSelling: { type: Boolean },
  },
  { timestamps: true },
);

export interface Product extends mongoose.Document {
  isPromotion: true;
  id: string;
  createdAt: string;
  name: string;
  description: string;
  publicPrice: number;
  path: string;
  laboratory: string;
  conditioning: string;
  dosage: string;
  form: string;
  presentation: string;
  therapeutiClass: string;
  subClass: string;
  specification: string;
  DurationOfConversation: string;
  use: string;
  contreIndications: string;
  tableOfContent: [{ vitamine: string; percentage: number }];
  newPrice: number;
  isBestSelling: number;
}