import { initTRPC } from '@trpc/server';
import _ from 'lodash';
import { z } from 'zod';

const ideas = _.times(100, i => ({
  nick: `cool-idea-nick-${i}`,
  name: `Idea ${i}`,
  description: `Description of idea ${i}... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
}));

const trpc = initTRPC.create();

export const trpcRouter = trpc.router({
  getIdeas: trpc.procedure.query(() => {
    return { ideas };
  }),
  getIdea: trpc.procedure.input(z.object({ ideaNick: z.string() })).query(({ input }) => {
    const idea = ideas.find(idea => idea.nick === input.ideaNick);
    
    return {idea: idea || null};
  }),
});

export type TrpcRouter = typeof trpcRouter;
