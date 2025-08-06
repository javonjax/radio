import { Pool } from 'pg';
import { loadEnvConfig } from '@next/env'; // This function is necessary because this script runs outside of the next.js runtime.

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const dbConfig: string = process.env.PG_CONFIG as string;

const globalObj = global as unknown as { pgPool: Pool | undefined };

export const pgPool = globalObj.pgPool || new Pool(JSON.parse(dbConfig));

if (process.env.NODE_ENV !== 'production') globalObj.pgPool = pgPool;
