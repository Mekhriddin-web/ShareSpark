import express from 'express';
import cors from 'cors';

import { trpcRouter } from './router';
import { applyTrpcToExpressApp } from './lib/trpc';
import { AppContext, createAppContext } from './lib/ctx';

void (async () => {
  let ctx: AppContext | null = null;

  try {
    ctx = createAppContext();
    const expressApp = express();
    expressApp.use(cors());

    expressApp.get('/ping', (req, res) => {
      res.send('pong');
    });

    await applyTrpcToExpressApp(expressApp, ctx, trpcRouter);

    expressApp.listen(3000, () => {
      console.info('Server is running on http://localhost:3000');
    });
  } catch (error) {
    console.error('Error starting server:', error);
    await ctx?.stop();
  }
})();
