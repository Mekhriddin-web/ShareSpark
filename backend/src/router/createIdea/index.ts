import { trpc } from '../../lib/trpc';
import { createIdeaTrpcInput } from './input';

export const createIdeaTrpcRoute = trpc.procedure.input(createIdeaTrpcInput).mutation(async ({ input, ctx }) => {
  if (!ctx.me) {
    throw new Error('Not authenticated');
  }

  const exIdea = await ctx.prisma.idea.findUnique({
    where: {
      nick: input.nick,
    },
  });
  if (exIdea) {
    throw new Error('Nick already exists');
  }
  await ctx.prisma.idea.create({
    data: { ...input, authorId: ctx.me.id },
  });
  return true;
});
