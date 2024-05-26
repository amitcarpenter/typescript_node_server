import { Schema, model, Document } from 'mongoose';

interface IOrderItem {
  product: Schema.Types.ObjectId;
  quantity: number;
  price: number;
}

interface IAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  zip: string;
}

interface IOrder extends Document {
  user: Schema.Types.ObjectId;
  orderItems: IOrderItem[];
  shippingAddress: IAddress;
  payment: Schema.Types.ObjectId;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt: Date;
  isDelivered: boolean;
  deliveredAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
});

const AddressSchema = new Schema<IAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  zip: { type: String, required: true }
});

const OrderSchema = new Schema<IOrder>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  orderItems: [OrderItemSchema],
  shippingAddress: AddressSchema,
  payment: { type: Schema.Types.ObjectId, ref: 'Payment' },
  taxPrice: { type: Number, required: true },
  shippingPrice: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  isPaid: { type: Boolean, default: false },
  paidAt: { type: Date },
  isDelivered: { type: Boolean, default: false },
  deliveredAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Order = model<IOrder>('Order', OrderSchema);
