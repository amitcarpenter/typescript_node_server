import { Schema, model, Document } from 'mongoose';

interface ISubscription extends Document {
  user: Schema.Types.ObjectId;
  plan: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const SubscriptionSchema = new Schema<ISubscription>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  plan: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Subscription = model<ISubscription>('Subscription', SubscriptionSchema);
