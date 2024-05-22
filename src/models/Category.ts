import { Schema, model, Document } from 'mongoose';

interface ICategory extends Document {
    name: string;
    description?: string;
    products: Schema.Types.ObjectId[];
}

const categorySchema = new Schema<ICategory>({
    name: { type: String, required: true },
    description: { type: String },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});

const Category = model<ICategory>('Category', categorySchema);

export { Category, ICategory };
