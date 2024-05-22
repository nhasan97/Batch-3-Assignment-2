import { Schema, model } from 'mongoose';
import { Product, Inventory, Variant } from './product.interface';

const variantSchema = new Schema<Variant>({
  type: { type: String, required: true },
  value: { type: String, required: true },
});

const inventorySchema = new Schema<Inventory>({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});

const productSchema = new Schema<Product>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  variants: { type: [variantSchema], required: true },
  inventory: inventorySchema,
});

export const ProductModel = model<Product>('Products', productSchema);
