import { Request, Response } from 'express';
import { productServices } from './product.services';
import { Product } from './product.interface';

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

/*

----------------controller for inserting new product data in DB----------------*/
const addProduct = async (req: Request, res: Response) => {
  try {
    const product: Product = req.body; //extracting data from request body

    const response = await productServices.addProductInDB(product); //calling the service function, passing the data to it for saving in DB and receiving the response

    sendResponse(res, 200, true, 'Product created successfully!', response); //sending response to client
  } catch (error) {
    sendResponse(res, 400, false, 'Product creation failed!', error); //sending error to client
  }
};

/*

 --------------controller for getting all or specific product from DB----------------*/
const getProducts = async (req: Request, res: Response) => {
  try {
    let query: object = {};
    if (req.query?.searchTerm) {
      query = { name: req.query?.searchTerm }; //defining query based on request query
    }

    const response = await productServices.getProductsFromDB(query); //calling the service function, passing the query to it for searching in DB and receiving the response

    sendResponse(res, 200, true, 'Products fetched successfully!', response); //sending response to client
  } catch (error) {
    sendResponse(res, 400, false, 'Products fetch failed!', error); //sending error to client
  }
};

/* 

--------------controller for getting specific product by id----------------*/
const getProductById = async (req: Request, res: Response) => {
  try {
    const productId: string = req.params?.productId; //extracting product id from request params

    const response = await productServices.getProductByIdFromDB(productId); //calling the service function, passing the product id to it for searching in DB and receiving the response

    sendResponse(res, 200, true, 'Product fetched successfully!', response); //sending response to client
  } catch (error) {
    sendResponse(res, 400, false, 'Product fetch failed!', error); //sending error to client
  }
};

/*

 --------------controller for updating specific product info in DB----------------*/
const updateProductInfo = async (req: Request, res: Response) => {
  try {
    const productId: string = req.params?.productId; //extracting product id from request params

    const product: Product = req.body; //extracting product data from request body

    //calling the service function, passing the product id to it for updating in DB and receiving the response
    const response = await productServices.updateProductInfo(
      productId,
      product,
    );

    sendResponse(res, 200, true, 'Product updated successfully!', response); //sending response to client
  } catch (error) {
    sendResponse(res, 400, false, 'Product update failed!', error); //sending error to client
  }
};

/* 

--------------controller for deleting specific product from DB----------------*/
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId: string = req.params?.productId; //extracting product id from request params

    const response = await productServices.deleteProductFromDB(productId); //calling the service function, passing the product id to it for deleting product from DB and receiving the response

    sendResponse(res, 200, true, 'Product deleted successfully!', response); //sending response to client
  } catch (error) {
    sendResponse(res, 400, false, 'Product delete failed!', error); //sending error to client
  }
};

export const productControllers = {
  addProduct,
  getProducts,
  getProductById,
  updateProductInfo,
  deleteProduct,
};
