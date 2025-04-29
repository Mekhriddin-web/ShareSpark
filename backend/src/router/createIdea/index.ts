import { trpc } from '../../lib/trpc';
import { ideas } from '../../lib/ideas';
import { createIdeaTrpcInput } from './input';

export const createIdeaTrpcRoute = trpc.procedure.input(createIdeaTrpcInput).mutation(({ input }) => {
  if (ideas.find(idea => idea.nick === input.nick)) {
    throw new Error('Nick already exists');
  }
  ideas.unshift(input);
  return true;
});
