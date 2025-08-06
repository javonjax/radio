import { NextResponse } from 'next/server';
import { pgPool } from '@/lib/api/db/db';

export const GET = async (): Promise<NextResponse> => {
  const res = await pgPool.query('SELECT NOW()');
  return NextResponse.json({ time: res.rows[0] });
};
