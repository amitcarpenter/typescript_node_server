import { Schema, model, Document } from 'mongoose';

interface IInventory extends Document {
    stock: number;
    product: Schema.Types.ObjectId;
}

const inventorySchema = new Schema<IInventory>({
    stock: { type: Number, required: true },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true }
});

const Inventory = model<IInventory>('Inventory', inventorySchema);

export { Inventory, IInventory };
