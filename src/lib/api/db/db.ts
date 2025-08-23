import { Pool } from 'pg';
import { loadEnvConfig } from '@next/env'; // This function is necessary because this script runs outside of the next.js runtime.

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const dbConfig: string = process.env.PG_CONFIG as string;
const connectionString: string = process.env.NEXT_PUBLIC_SUPABASE_URL as string;

const globalObj = global as unknown as { pgPool: Pool | undefined };

export const pgPool =
  globalObj.pgPool ||
  (process.env.NODE_ENV === 'development'
    ? new Pool(JSON.parse(dbConfig))
    : new Pool({ connectionString }));

if (process.env.NODE_ENV !== 'production') globalObj.pgPool = pgPool;
