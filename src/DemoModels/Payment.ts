import { Schema, model, Document } from 'mongoose';

interface IPayment extends Document {
  order: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  paymentMethod: string;
  paymentResult: {
    id: string;
    status: string;
    update_time: string;
    email_address: string;
  };
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentResultSchema = new Schema({
  id: { type: String },
  status: { type: String },
  update_time: { type: String },
  email_address: { type: String }
});

const PaymentSchema = new Schema<IPayment>({
  order: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  paymentMethod: { type: String, required: true },
  paymentResult: PaymentResultSchema,
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Payment = model<IPayment>('Payment', PaymentSchema);
