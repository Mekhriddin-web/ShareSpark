import { z } from 'zod';

import { createIdeaTrpcInput } from '../createIdea/input';

export const updateIdeaTrpcInput = createIdeaTrpcInput.extend({
  ideaId: z.string().min(1),
});
