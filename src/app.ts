import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { productRoutes } from './app/modules/product/product.routes';

const app: Application = express();
// const port = 3000;

app.use(express.json());
app.use(cors());

app.use(productRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
