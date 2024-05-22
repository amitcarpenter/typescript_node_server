import { Schema, model, Document } from 'mongoose';

interface ITag extends Document {
    name: string;
    products: Schema.Types.ObjectId[];
}

const tagSchema = new Schema<ITag>({
    name: { type: String, required: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});

const Tag = model<ITag>('Tag', tagSchema);

export { Tag, ITag };
