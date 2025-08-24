import { Pool } from 'pg';
import { loadEnvConfig } from '@next/env'; // This function is necessary because this script runs outside of the next.js runtime.

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const env: string = process.env.NODE_ENV as string;

const connectionString: string = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
console.log(env, 'poo');

const globalObj = global as unknown as { pgPool: Pool | undefined };

export const pgPool = globalObj.pgPool || new Pool({ connectionString });

if (process.env.NODE_ENV !== 'production') globalObj.pgPool = pgPool;
