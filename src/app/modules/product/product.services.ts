import { Product } from './product.interface';
import { ProductModel } from './product.model';

//service function for inserting product data in DB
const addProductInDB = async (product: Product) => {
  const response = await ProductModel.create(product);
  return response;
};

//service function for fetching all or specific product data from DB
const getProductsFromDB = async (query: object) => {
  const response = await ProductModel.find(query);
  return response;
};

//service function for fetching specific product data by id from DB
const getProductByIdFromDB = async (query: object) => {
  const response = await ProductModel.findOne(query);
  return response;
};

export const productServices = {
  addProductInDB,
  getProductsFromDB,
  getProductByIdFromDB,
};
