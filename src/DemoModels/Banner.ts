import { Schema, model, Document } from 'mongoose';

interface IBanner extends Document {
  imageUrl: string;
  link: string;
  createdAt: Date;
  updatedAt: Date;
}

const BannerSchema = new Schema<IBanner>({
  imageUrl: { type: String, required: true },
  link: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Banner = model<IBanner>('Banner', BannerSchema);
