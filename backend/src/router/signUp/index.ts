import { trpc } from '../../lib/trpc';
import { getPasswordHash } from '../../utils/getPasswordHash';
import { signJWT } from '../../utils/signJWT';
import { createSignUpTrpcInput } from './input';

export const createSignUpTrpcRoute = trpc.procedure.input(createSignUpTrpcInput).mutation(async ({ input, ctx }) => {
  const exUser = await ctx.prisma.user.findUnique({
    where: {
      nick: input.nick,
    },
  });

  if (exUser) {
    throw new Error('User already exists');
  }

  const user = await ctx.prisma.user.create({
    data: {
      nick: input.nick,
      password: getPasswordHash(input.password),
    },
  });

  const token = signJWT(user.id)

  return {token};
});
