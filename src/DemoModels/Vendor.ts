import { Schema, model, Document } from 'mongoose';

interface IVendor extends Document {
  name: string;
  email: string;
  products: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const VendorSchema = new Schema<IVendor>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Vendor = model<IVendor>('Vendor', VendorSchema);
