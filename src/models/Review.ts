import { Schema, model, Document } from 'mongoose';

interface IReview extends Document {
    comment: string;
    rating: number;
    product: Schema.Types.ObjectId;
    user: Schema.Types.ObjectId;
    createdAt: Date;
}

const reviewSchema = new Schema<IReview>({
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
});

const Review = model<IReview>('Review', reviewSchema);

export { Review, IReview };
