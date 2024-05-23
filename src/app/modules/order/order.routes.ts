import express from 'express';
import { orderControllers } from './order.controllers';

const router = express.Router();

router.post('/api/orders', orderControllers.saveOrder); //route for inserting new order data in DB.

router.get('/api/orders', orderControllers.getOrders); //route for getting all or specific orders from DB.

export const orderRoutes = router;
