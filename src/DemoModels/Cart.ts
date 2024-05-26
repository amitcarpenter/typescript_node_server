import { Schema, model, Document } from 'mongoose';

interface ICart extends Document {
  user: Schema.Types.ObjectId;
  cartItems: Array<{
    product: Schema.Types.ObjectId;
    quantity: number;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const CartSchema = new Schema<ICart>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  cartItems: [
    {
      product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true }
    }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Cart = model<ICart>('Cart', CartSchema);
