import { z } from 'zod';

export const createSignInTrpcInput = z.object({
  nick: z.string().min(1),
  password: z.string().min(1),
});
