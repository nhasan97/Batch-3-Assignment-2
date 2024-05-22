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
const getProductByIdFromDB = async (productId: string) => {
  const response = await ProductModel.findOne({ _id: productId });
  return response;
};

//service function for updating specific product info in DB
const updateProductInfo = async (productId: string, product: Product) => {
  const query = { _id: productId };

  //   const options = { upsert: true };

  const updatedInfo = {
    $set: {
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      tags: product.tags,
      variants: product.variants,
      inventory: product.inventory,
    },
  };

  const response = await ProductModel.findOneAndUpdate(
    query,
    updatedInfo,
    // options,
  );

  console.log(response);

  return response;
};

export const productServices = {
  addProductInDB,
  getProductsFromDB,
  getProductByIdFromDB,
  updateProductInfo,
};
