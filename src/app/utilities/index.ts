import { Product } from '../modules/product/product.interface';
import { Response } from 'express';

// ----------------function for formatting and sending response to client----------------
const sendResponse = (
  res: Response,
  statusCode: number,
  operationalStatus: boolean,
  message: string,
  toSend: Product | unknown,
) => {
  res.status(statusCode).json({
    success: operationalStatus,
    message: message,
    data: toSend,
  });
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
