import express from 'express';
import { orderControllers } from './order.controllers';

const router = express.Router();

router.post('/api/orders', orderControllers.saveOrder); //route for inserting new order data in DB.

export const orderRoutes = router;
