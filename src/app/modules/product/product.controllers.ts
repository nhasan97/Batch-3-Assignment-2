import { Request, Response } from 'express';
import { productServices } from './product.services';
import { Product } from './product.interface';
import productValidationSchema from './product.validation';
import sendResponse from '../../utilities';

/*

----------------controller for inserting new product data in DB----------------*/
const addProduct = async (req: Request, res: Response) => {
  try {
    const product: Product = req.body; //extracting data from request body

    const zodParsedData = productValidationSchema.parse(product); //validating extracted data using zod

    const response = await productServices.addProductInDB(zodParsedData); //calling the service function, passing the data to it for saving in DB and receiving the response

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
      query = {
        $or: [
          {
            name: {
              $regex: req.query?.searchTerm,
              $options: 'i',
            },
          },
          {
            category: {
              $regex: req.query?.searchTerm,
              $options: 'i',
            },
          },
          {
            description: {
              $regex: req.query?.searchTerm,
              $options: 'i',
            },
          },
        ],
      }; //defining query based on request query
    }

    const response = await productServices.getProductsFromDB(query); //calling the service function, passing the query to it for searching in DB and receiving the response

    if (response.length > 0) {
      sendResponse(res, 200, true, 'Products fetched successfully!', response); //sending response to client
    } else {
      sendResponse(res, 200, false, 'No product found!'); //sending response to client
    }
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

    if (response !== null) {
      sendResponse(res, 200, true, 'Product fetched successfully!', response); //sending response to client
    } else {
      sendResponse(res, 200, false, 'No such product found!'); //sending response to client
    }
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

    const zodParsedData = productValidationSchema.parse(product); //validating extracted data using zod

    //calling the service function, passing the product id to it for updating in DB and receiving the response
    const response = await productServices.updateProductInfo(
      productId,
      zodParsedData,
    );

    if (response !== null) {
      sendResponse(res, 200, true, 'Product updated successfully!', response); //sending response to client
    } else {
      sendResponse(res, 200, false, 'No such product found!'); //sending response to client
    }
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

    if (response !== null) {
      sendResponse(res, 200, true, 'Product deleted successfully!', null); //sending response to client
    } else {
      sendResponse(res, 200, false, 'No such product found!'); //sending response to client
    }
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
