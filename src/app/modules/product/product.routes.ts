import express from 'express';
import { productControllers } from './product.controllers';

const router = express.Router();

router.post('/api/products', productControllers.addProduct);

export const productRoutes = router;
