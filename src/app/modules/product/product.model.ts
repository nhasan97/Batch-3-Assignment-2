import { Schema, model } from 'mongoose';
import { Product, Inventory, Variant } from './product.interface';

const variantSchema = new Schema<Variant>({
  type: { type: String, required: [true, 'Type is required'], trim: true },
  value: { type: String, required: [true, 'Value is required'], trim: true },
});

const inventorySchema = new Schema<Inventory>({
  quantity: { type: Number, required: [true, 'Quantity is required'] },
  inStock: { type: Boolean, required: [true, 'In stock status is required'] },
});

const productSchema = new Schema<Product>({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
  },
  price: { type: Number, required: [true, 'Price is required'] },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
  },
  tags: { type: [String], required: [true, 'Tags are required'], trim: true },
  variants: {
    type: [variantSchema],
    required: [true, 'Variants are required'],
  },
  inventory: {
    type: inventorySchema,
    required: [true, 'Inventory is required'],
  },
});

export const ProductModel = model<Product>('Products', productSchema);
