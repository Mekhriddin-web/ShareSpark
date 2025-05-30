import express from 'express';
import cors from 'cors';

import { trpcRouter } from './router';
import { applyTrpcToExpressApp } from './lib/trpc';
import { AppContext, createAppContext } from './lib/ctx';
import { applyPassportToExpressApp } from './lib/passport';
import { env } from './lib/env';

void (async () => {
  let ctx: AppContext | null = null;

  try {
    ctx = createAppContext();
    const expressApp = express();
    expressApp.use(cors());

    expressApp.get('/ping', (req, res) => {
      res.send('pong');
    });

    applyPassportToExpressApp(expressApp, ctx);

    await applyTrpcToExpressApp(expressApp, ctx, trpcRouter);

    expressApp.listen(env.PORT, () => {
      console.info(`Server is running on http://localhost:${env.PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    await ctx?.stop();
  }
})();
