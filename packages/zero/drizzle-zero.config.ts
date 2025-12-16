import * as drizzleSchema from '@repo/database/schema';
import { type ColumnsConfig, drizzleZeroConfig } from 'drizzle-zero';

type TablesConfig = {
  [K in keyof typeof drizzleSchema]: ColumnsConfig<(typeof drizzleSchema)[K]>;
};

export default drizzleZeroConfig(drizzleSchema, {
  tables: {
    projects: true,
  } satisfies TablesConfig,
});
