import { model, Schema } from 'mongoose';

/*
Properties must be added to both the interface and schema.
*/

export interface IDog {
  name: string;
  breed: string;
  color: string;
  weight: number;
}

const schema = new Schema<IDog>(
  {
    name: { type: String, required: true },
    breed: { type: String, required: true },
    color: { type: String, required: true },
    weight: { type: Number, required: true },
  },
  { timestamps: true },
);

export const Dog = model<IDog>('Dog', schema, 'dogs');
