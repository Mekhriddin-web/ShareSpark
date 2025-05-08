import { initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { type Express } from 'express';
import { expressHandler } from 'trpc-playground/handlers/express'
import superjson from 'superjson';

import { TrpcRouter } from '../router';
import { AppContext } from './ctx';

export const trpc = initTRPC.context<AppContext>().create({
  transformer: superjson,
});

export const applyTrpcToExpressApp = async (expressApp: Express, appContext: AppContext, trpcRouter: TrpcRouter) => {
  expressApp.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: trpcRouter,
      createContext: () => appContext,
    })
  )

  const playgroundHandler = await expressHandler({
    trpcApiEndpoint: '/trpc',
    playgroundEndpoint: '/trpc-playground',
    router: trpcRouter,
    request: {
      superjson: true,
    },
  });

  expressApp.use('/trpc-playground', playgroundHandler);
};
