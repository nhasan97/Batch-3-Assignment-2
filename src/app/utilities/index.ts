import { Order } from '../modules/order/order.interface';
import { Product } from '../modules/product/product.interface';
import { Response } from 'express';

// ----------------function for formatting and sending response to client----------------
const sendResponse = (
  res: Response,
  statusCode: number,
  operationalStatus: boolean,
  message: string = 'Something went wrong!',
  toSend: Product | Order | unknown = null,
) => {
  if (operationalStatus === true) {
    res.status(statusCode).json({
      success: operationalStatus,
      message: message,
      data: toSend,
    });
  } else {
    res.status(statusCode).json({
      success: operationalStatus,
      message: message,
    });
  }
};

// ----------function for managing product inventory based on order placement----------
export const manageInventory = (
  previousQuantity: number,
  orderedQuantity: number,
) => {
  const newQuantity: number = previousQuantity - orderedQuantity; //calculating new stock quantity after order placement

  let newInStockStatus: boolean;
  //defining new inStock status based on new stock quantity
  if (newQuantity === 0) {
    newInStockStatus = false;
  } else {
    newInStockStatus = true;
  }

  return { newQuantity, newInStockStatus };
};

export default sendResponse;
