import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { productRoutes } from './app/modules/product/product.routes';
import { orderRoutes } from './app/modules/order/order.routes';
import sendResponse from './app/utilities';

const app: Application = express();
// const port = 3000;

app.use(express.json());
app.use(cors());

app.use(productRoutes);
app.use(orderRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Server started!');
});

app.all('*', (req: Request, res: Response) => {
  sendResponse(res, 400, false, 'Route not found');
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    sendResponse(res, 400, false, 'Something went wrong');
  }
});

export default app;
