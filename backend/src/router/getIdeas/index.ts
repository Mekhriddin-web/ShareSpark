import { ideas } from '../../lib/ideas';
import { trpc } from '../../lib/trpc';

export const getIdeasTrpcRoute = trpc.procedure.query(() => {
  return { ideas };
});
