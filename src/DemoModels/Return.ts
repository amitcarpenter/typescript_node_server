import { Schema, model, Document } from 'mongoose';

interface IReturn extends Document {
  order: Schema.Types.ObjectId;
  product: Schema.Types.ObjectId;
  reason: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReturnSchema = new Schema<IReturn>({
  order: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  reason: { type: String, required: true },
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Return = model<IReturn>('Return', ReturnSchema);
