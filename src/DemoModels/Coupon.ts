import { Schema, model, Document } from 'mongoose';

interface ICoupon extends Document {
  code: string;
  discount: number;
  expirationDate: Date;
  createdAt: Date;
}

const CouponSchema = new Schema<ICoupon>({
  code: { type: String, required: true, unique: true },
  discount: { type: Number, required: true },
  expirationDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const Coupon = model<ICoupon>('Coupon', CouponSchema);
