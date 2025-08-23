import { pgPool } from '@/lib/api/db/db';
import { Favorite, HTTPError } from '@/lib/api/schemas';
import { NextRequest, NextResponse } from 'next/server';
import { QueryResult } from 'pg';

const DB_SCHEMA: string = process.env.DB_SCHEMA as string;
const DB_FAVORITES_TABLE: string = process.env.DB_FAVORITES_TABLE as string;

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
): Promise<NextResponse> => {
  try {
    const { userId }: { userId: string } = await params;
    const page: string | null = request.nextUrl.searchParams.get('page');
    const itemsPerPage: number = 10;
    if (!userId) {
      throw new HTTPError('Must be logged in to get favorites.', 400);
    }

    let queryText;
    if (!page || !page.length) {
      queryText = `SELECT * FROM ${DB_SCHEMA}.${DB_FAVORITES_TABLE} WHERE user_id = $1;`;
    } else if (page === '1') {
      queryText = `SELECT * FROM ${DB_SCHEMA}.${DB_FAVORITES_TABLE} WHERE user_id = $1 LIMIT ${itemsPerPage + 1};`;
    } else {
      queryText = `SELECT * FROM ${DB_SCHEMA}.${DB_FAVORITES_TABLE} WHERE user_id = $1 OFFSET ${(Number(page) - 1) * itemsPerPage} LIMIT ${itemsPerPage + 1};`;
    }

    const query = {
      text: queryText,
      values: [userId],
    };

    const queryRes: QueryResult<Favorite> = await pgPool.query(query);
    let hasMore: boolean = false;
    if (queryRes.rowCount === itemsPerPage + 1) {
      hasMore = true;
    }

    return NextResponse.json({ favorites: queryRes.rows.slice(0, -1), hasMore: hasMore });
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
