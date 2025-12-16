import { defineMutator, defineMutators } from '@repo/zero';
import z from 'zod';

export const mutators = defineMutators({
  projects: {
    create: defineMutator(
      z.object({
        id: z.uuidv7(),
        name: z.string().min(1).max(255),
        description: z.string().max(1024).optional(),
      }),
      async ({ tx, args }) => {
        await tx.mutate.projects.insert({
          id: args.id,
          name: args.name,
          description: args.description,
          createdAt: Date.now(),
        });
      },
    ),
  },
});
