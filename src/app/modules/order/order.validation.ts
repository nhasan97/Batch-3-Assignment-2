import { z } from 'zod';

const orderValidationSchema = z.object({
  email: z.string().min(1).email(),
  productId: z.string(),
  price: z.number(),
  quantity: z.number(),
});

export default orderValidationSchema;
