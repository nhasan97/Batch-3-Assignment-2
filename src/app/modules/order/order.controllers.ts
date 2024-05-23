import { Request, Response } from 'express';
import { Order } from './order.interface';
import { orderServices } from './order.services';
import sendResponse from '../../utilities';
import orderValidationSchema from './order.validation';

/*

----------------controller for inserting new order data in DB----------------*/
const saveOrder = async (req: Request, res: Response) => {
  try {
    const orderDetails: Order = req.body; //extracting order details from request body

    const zodParsedData = orderValidationSchema.parse(orderDetails); //validating extracted data using zod

    const response = await orderServices.saveOrderInDB(zodParsedData); //calling the service function, passing the data to it for saving in DB and receiving the response

    sendResponse(res, 200, true, 'Order created successfully!', response); //sending response to client
  } catch (error) {
    sendResponse(res, 400, false, 'Order failed!', error); //sending error to client
  }
};

/*

 --------------controller for getting all or specific orders from DB----------------*/
const getOrders = async (req: Request, res: Response) => {
  try {
    let query: object = {};
    if (req.query?.email) {
      query = { email: req.query?.email }; //defining query based on request query
    }

    const response = await orderServices.getOrdersFromDB(query); //calling the service function, passing the query to it for searching in DB and receiving the response

    sendResponse(res, 200, true, 'Orders fetched successfully!', response); //sending response to client
  } catch (error) {
    sendResponse(res, 400, false, 'Orders fetch failed!', error); //sending error to client
  }
};

export const orderControllers = {
  saveOrder,
  getOrders,
};
