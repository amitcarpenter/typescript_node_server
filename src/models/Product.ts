import { Schema, model, Document } from "mongoose";
import { Category } from "./Category";
import { Review } from "./Review";
import { User } from "./User";
import { Tag } from "./Tag";
import { Inventory } from "./Inventory";

interface InventoryI {
  stock: number;
  product: Schema.Types.ObjectId;
}

interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  brand?: string;
  imageUrl?: string;
  category: Schema.Types.ObjectId;
  reviews: Schema.Types.ObjectId[];
  tags: Schema.Types.ObjectId[];
  inventory: InventoryI;
  createdBy: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    brand: { type: String },
    imageUrl: { type: String },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    inventory: {
      stock: { type: Number, required: true },
      product: { type: Schema.Types.ObjectId },
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Product = model<IProduct>("Product", productSchema);

export { Product, IProduct };
