import { Request, Response } from 'express';
import { productServices } from './product.services';
import { Product } from './product.interface';

//function for formatting and sending response to client
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

const addProduct = async (req: Request, res: Response) => {
  try {
    //extracting data from request body
    const product = req.body;

    //calling the service function, passing the data to it for saving in DB and receiving the response
    const response = await productServices.addProductInDB(product);

    //sending response to client
    sendResponse(res, 200, true, 'Product created successfully!', response);
  } catch (error) {
    //sending error to client
    sendResponse(res, 400, false, 'Product creation failed!', error);
  }
};

const getProducts = async (req: Request, res: Response) => {
  //defining query based on request query
  let query: object = {};
  if (req.query?.searchTerm) {
    query = { name: req.query?.searchTerm };
  }

  //calling the service function, passing the query to it for searching in DB and receiving the response
  const response = await productServices.getProductsFromDB(query);

  //sending response to client
  sendResponse(res, 200, true, 'Products fetched successfully!', response);
};

const getProductById = async (req: Request, res: Response) => {
  //defining query based on productId sent with request
  const query: object = { _id: req.params?.productId };

  //calling the service function, passing the query to it for searching in DB and receiving the response
  const response = await productServices.getProductByIdFromDB(query);

  //sending response to client
  sendResponse(res, 200, true, 'Product fetched successfully!', response);
};

export const productControllers = {
  addProduct,
  getProducts,
  getProductById,
};
