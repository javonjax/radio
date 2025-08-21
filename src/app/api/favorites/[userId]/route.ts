import { pgPool } from '@/lib/api/db/db';
import { Favorite, HTTPError } from '@/lib/api/schemas';
import { NextRequest, NextResponse } from 'next/server';
import { QueryResult } from 'pg';

const DB_SCHEMA: string = process.env.DB_SCHEMA as string;
const DB_FAVORITES_TABLE: string = process.env.DB_FAVORITES_TABLE as string;

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) => {
  try {
    const { userId }: { userId: string } = await params;
    console.log(userId);
    if (!userId) {
      throw new HTTPError('Must be logged in to get favorites.', 400);
    }

    const query = {
      text: `SELECT * FROM ${DB_SCHEMA}.${DB_FAVORITES_TABLE} WHERE user_id = $1;`,
      values: [userId],
    };

    const queryRes: QueryResult<Favorite> = await pgPool.query(query);
    if (!queryRes.rowCount) {
      throw new HTTPError('No favorites found for this user.', 404);
    }
    console.log(queryRes.rows);
    return NextResponse.json(queryRes.rows);
  } catch (error) {
    let message: string = 'Internal server error';
    let status: number | undefined = undefined;

    if (error instanceof Error) {
      message = error.message;
    }
    if (error instanceof HTTPError) {
      status = error.status;
    }

    return NextResponse.json({ error: message }, { status: status || 500 });
  }
};
