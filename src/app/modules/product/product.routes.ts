import express from 'express';
import { productControllers } from './product.controllers';

const router = express.Router();

router.post('/api/products', productControllers.addProduct);
router.get('/api/products', productControllers.getProducts);
router.get('/api/products/:productId', productControllers.getProductById);
router.put('/api/products/:productId', productControllers.updateProductInfo);

export const productRoutes = router;
