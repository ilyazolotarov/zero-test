import { serve } from '@hono/node-server';
import { mustGetMutator, mustGetQuery } from '@repo/zero';
import { zeroDb } from '@repo/zero/database';
import { queries } from '@repo/zero/queries';
import { schema } from '@repo/zero/schema';
import { handleMutateRequest, handleQueryRequest } from '@repo/zero/server';
import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { streamText } from 'hono/streaming';
import { serverMutators } from './mutators';

const app = new Hono();
app.use(logger());
app.post('/zero/query', async (c) => {
  const result = await handleQueryRequest(
    (name, args) => {
      const query = mustGetQuery(queries, name);
      return query.fn({ args, ctx: { userId: 'anon' } });
    },
    schema,
    c.req.raw,
  );
  return c.json(result);
});

app.post('/zero/mutate', async (c) => {
  const result = await handleMutateRequest(
    zeroDb,
    (transact) =>
      transact((tx, name, args) => {
        const mutator = mustGetMutator(serverMutators, name);
        return mutator.fn({
          args,
          tx,
          ctx: { userId: 'anon' },
        });
      }),
    c.req.raw,
  );

  return c.json(result);
});

app.get('/stream', (c) => {
  return streamText(c, async (stream) => {
    // Write a text with a new line ('\n').
    await stream.writeln('Hello');
    for (let i = 0; i < 20; i++) {
      // Wait 2 second.
      await stream.sleep(2000);
      // Write a text without a new line.
      await stream.writeln(`Hono!`);
    }
  });
});

const server = serve({
  fetch: app.fetch,
  port: 3000,
});

console.log('Server is running on http://localhost:3000');

process.on('SIGINT', () => {
  server.close();
  process.exit(0);
});
process.on('SIGTERM', () => {
  server.close((err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    process.exit(0);
  });
});
