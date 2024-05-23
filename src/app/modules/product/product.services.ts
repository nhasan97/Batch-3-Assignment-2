import { Product } from './product.interface';
import { ProductModel } from './product.model';
import { manageInventory } from '../../utilities';
import { inventoryValidationSchema } from './product.validation';

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

  const response = await ProductModel.findOneAndUpdate(query, updatedInfo, {
    returnDocument: 'after',
  });

  return response;
};

/*

service function for updating inventory in DB based on order placement*/
const updateProductInventory = async (
  productId: any,
  previousQuantity: number,
  orderedQuantity: number,
) => {
  const { newQuantity, newInStockStatus } = manageInventory(
    previousQuantity,
    orderedQuantity,
  ); /*passing the previous and ordered quantities to manageInventory function 
  for calculating new remaining quantity and inStock status and receiving them*/

  const updatedInfo = {
    quantity: newQuantity,
    inStock: newInStockStatus,
  };
  const zodParsedData = inventoryValidationSchema.parse(updatedInfo); //validating data using zod

  //updating inventory in DB
  const response = await ProductModel.updateOne(
    { _id: productId },
    {
      $set: {
        inventory: {
          quantity: zodParsedData.quantity,
          inStock: zodParsedData.inStock,
        },
      },
    },
  );

  return response;
};

/*

service function for deleting product from DB*/
const deleteProductFromDB = async (productId: string) => {
  const query = { _id: productId };
  const response = ProductModel.findOneAndDelete(query);
  return response;
};

export const productServices = {
  addProductInDB,
  getProductsFromDB,
  getProductByIdFromDB,
  updateProductInfo,
  updateProductInventory,
  deleteProductFromDB,
};
