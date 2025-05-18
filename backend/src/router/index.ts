import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

import { trpc } from '../lib/trpc';
import { createIdeaTrpcRoute } from './createIdea';
import { getIdeaTrpcRoute } from './getIdea';
import { getIdeasTrpcRoute } from './getIdeas';
import { getMeTrpcRoute } from './getMe';
import { createSignInTrpcRoute } from './signIn';
import { createSignUpTrpcRoute } from './signUp';
import { updateIdeaTrpcRoute } from './updateIdea';

export const trpcRouter = trpc.router({
  getIdea: getIdeaTrpcRoute,
  getIdeas: getIdeasTrpcRoute,
  updateIdea: updateIdeaTrpcRoute,
  createIdea: createIdeaTrpcRoute,
  signUp: createSignUpTrpcRoute,
  signIn: createSignInTrpcRoute,
  getMe: getMeTrpcRoute,
});

export type TrpcRouter = typeof trpcRouter;

export type TrpcRouterInput = inferRouterInputs<TrpcRouter>;
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>;
