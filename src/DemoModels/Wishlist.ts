import { Schema, model, Document } from 'mongoose';

interface IWishlist extends Document {
  user: Schema.Types.ObjectId;
  products: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const WishlistSchema = new Schema<IWishlist>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Wishlist = model<IWishlist>('Wishlist', WishlistSchema);
