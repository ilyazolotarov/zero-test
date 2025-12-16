import { defineQueries, defineQuery } from '@rocicorp/zero';
import z from 'zod';
import { zql } from '#schema';

export const queries = defineQueries({
  projects: {
    list: defineQuery(
      z.object({
        orderBy: z
          .array(
            z.object({
              field: z.enum(['createdAt', 'name']),
              direction: z.enum(['asc', 'desc']),
            }),
          )
          .optional()
          .default([]),
        limit: z.number().min(1).max(1000).optional().default(100),
      }),
      ({ args }) => {
        let query = zql.projects;
        args.orderBy.forEach(({ field, direction }) => {
          query = query.orderBy(field, direction);
        });
        return query.orderBy('id', 'desc').limit(args.limit);
      },
    ),
  },
});
