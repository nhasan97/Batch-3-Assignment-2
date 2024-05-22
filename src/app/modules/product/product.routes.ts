import express from 'express';
import { productControllers } from './product.controllers';

const router = express.Router();

router.post('/api/products', productControllers.addProduct); //route for inserting new product data in DB.

router.get('/api/products', productControllers.getProducts); //route for getting all or specific product from DB.

router.get('/api/products/:productId', productControllers.getProductById); // route for getting specific product by id from DB.

router.put('/api/products/:productId', productControllers.updateProductInfo); // route for updating specific product info in DB.

router.delete('/api/products/:productId', productControllers.deleteProduct); // route for deleting specific product from DB.

export const productRoutes = router;
