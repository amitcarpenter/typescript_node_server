import { Schema, model, Document } from 'mongoose';

interface IFAQ extends Document {
  question: string;
  answer: string;
  createdAt: Date;
  updatedAt: Date;
}

const FAQSchema = new Schema<IFAQ>({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const FAQ = model<IFAQ>('FAQ', FAQSchema);
