import * as mongoose from 'mongoose';

export const ProductsSchema = new mongoose.Schema({
   name: { type: String, required: true  },
   description: { type: String, required: true },
   publicPrice: { type: Number, required: true },
   path : { type: String, required: true },
   laboratory:{ type: String, },
   conditioning:{ type: String, },
   dosage: { type: String,  },
   form: { type: String,  },
   presentation: { type: String,  },
   therapeutiClass : { type: String,  },
   subClass: { type: String,  },
   specification: { type: String,  },
   DurationOfConversation: { type: String,  },
   use: { type: String, },
   contreIndications: { type: String, },
   tableOfContent : { type: String,  },
});

export interface Product extends mongoose.Document {
  id: string;
  createdAt: string;
  name: string;
  description: string;
  publicPrice: number;
  path : string ;
  laboratory: string;
  conditioning: string;
  dosage: string;
  form: string;
  presentation: string;
  therapeutiClass : string;
  subClass: string;
  specification: string;
  DurationOfConversation: string;
  use: string;
  contreIndications: string;
  tableOfContent : string;
}