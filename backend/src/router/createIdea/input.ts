import { z } from 'zod';

export const createIdeaTrpcInput = z.object({
  name: z.string().min(1, 'Name is required'),
  nick: z
    .string()
    .min(1, 'Nick is required')
    .regex(/^[a-z0-9-]+$/, 'Nick may contain only lowercase letters, numbers and dashes'),
  description: z.string().min(1, 'Description is required'),
  text: z.string().min(10, 'Text should be at least 10 characters long'),
});
