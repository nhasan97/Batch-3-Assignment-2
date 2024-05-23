import { productServices } from '../product/product.services';
import { Order } from './order.interface';
import { orderModel } from './order.model';

//service function for inserting order in DB
const saveOrderInDB = async (orderDetails: Order) => {
  const productExists = await productServices.getProductByIdFromDB(
    orderDetails.productId,
  ); // checking if the product exists or not

  if (productExists) {
    if (
      productExists.inventory.inStock === true && // checking whether the product is in stock or not
      productExists.inventory.quantity >= orderDetails.quantity // checking whether the product quantity in stock is sufficient or not
    ) {
      const response = await orderModel.create(orderDetails); //saving order in DB

      const updateResponse = await productServices.updateProductInventory(
        productExists._id,
        productExists.inventory.quantity,
        orderDetails.quantity,
      ); //calling service function for updating inventory in DB

      console.log(updateResponse); //modifiedCount: 1

      return response;
    } else {
      return {
        success: false,
        message: 'Insufficient quantity available in inventory',
      };
    }
  } else {
    return {
      success: false,
      message: 'Product not found',
    };
  }
};

//service function for fetching all or specific product data from DB
const getOrdersFromDB = async (query: object) => {
  const response = await orderModel.find(query);
  return response;
};

export const orderServices = {
  saveOrderInDB,
  getOrdersFromDB,
};
