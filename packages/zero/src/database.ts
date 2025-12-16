import { db } from '@repo/database';
import { zeroDrizzle } from '@rocicorp/zero/server/adapters/drizzle';
import { schema } from '#schema';

export const zeroDb = zeroDrizzle(schema, db);
