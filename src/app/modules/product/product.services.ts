import { Product } from './product.interface';
import { ProductModel } from './product.model';

const addProductInDB = async (product: Product) => {
  const response = await ProductModel.create(product);
  return response;
};

export const productServices = {
  addProductInDB,
};
