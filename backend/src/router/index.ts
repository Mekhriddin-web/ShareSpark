import { trpc } from '../lib/trpc';
import { createIdeaTrpcRoute } from './createIdea';
import { getIdeaTrpcRoute } from './getIdea';
import { getIdeasTrpcRoute } from './getIdeas';
import { createSignUpTrpcRoute } from './signUp';

export const trpcRouter = trpc.router({
  getIdea: getIdeaTrpcRoute,
  getIdeas: getIdeasTrpcRoute,
  createIdea: createIdeaTrpcRoute,
  signUp: createSignUpTrpcRoute,
});

export type TrpcRouter = typeof trpcRouter;
