import { trpc } from '../../lib/trpc';
import { updateIdeaTrpcInput } from './input';

export const updateIdeaTrpcRoute = trpc.procedure.input(updateIdeaTrpcInput).mutation(async ({ input, ctx }) => {
  const { ideaId, ...ideaInput } = input;

  if (!ctx.me) {
    throw new Error('Not authenticated');
  }

  const idea = await ctx.prisma.idea.findUnique({
    where: {
      id: ideaId,
    },
  });

  if (!idea) {
    throw new Error('Idea not found');
  }

  if (idea.authorId !== ctx.me.id) {
    throw new Error('Not your idea');
  }

  if (idea.nick !== input.nick) {
    const existingIdea = await ctx.prisma.idea.findUnique({
      where: {
        nick: input.nick,
      },
    });

    if (existingIdea) {
      throw new Error('Idea with this nick already exists');
    }
  }

  await ctx.prisma.idea.update({
    where: {
      id: ideaId,
    },
    data: {
      ...ideaInput,
    },
  });

  return true;
});
