import { pgPool } from '@/lib/api/db/db';
import { NewFavorite, HTTPError } from '@/lib/api/schemas';
import { NextRequest, NextResponse } from 'next/server';
import { QueryResult } from 'pg';

const DB_SCHEMA: string = process.env.DB_SCHEMA as string;
const DB_FAVORITES_TABLE: string = process.env.DB_FAVORITES_TABLE as string;

// export const GET = async (request: NextRequest): Promise<NextResponse> => {
//   try {
//     const { userId } = await request.json();
//     if (!userId) {
//       throw new HTTPError('Must be logged in to get favorites.', 400);
//     }

//     const query = {
//       text: `SELECT * FROM ${DB_SCHEMA}.${DB_FAVORITES_TABLE} WHERE user_id = $1;`,
//       values: [userId],
//     };

//     const queryRes: QueryResult<Favorite> = await pgPool.query(query);
//     if (!queryRes.rowCount) {
//       throw new HTTPError('No favorites found for this user.', 404);
//     }
//     console.log(queryRes.rows);
//     return NextResponse.json({ favorites: queryRes.rows });
//   } catch (error) {
//     console.log(error);
//   }
// };

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const { userId, stationId, station }: NewFavorite = await request.json();

    console.log('Checking that all params are present...');
    if (!userId) {
      throw new HTTPError('Must be logged in to add favorites.', 400);
    }
    if (!stationId || !station) {
      throw new HTTPError('Failed to add new favorite. Missing station.', 400);
    }

    console.log('Attempting to add favorite to DB...');
    const query = {
      text: `INSERT INTO ${DB_SCHEMA}.${DB_FAVORITES_TABLE} (user_id, station_id, station) VALUES ($1, $2, $3) RETURNING id;`,
      values: [userId, stationId, station],
    };

    const queryRes: QueryResult<{ id: number }> = await pgPool.query(query);
    if (!queryRes.rowCount) {
      throw new HTTPError('Failed to add new favorite. Please try again later.', 500);
    }

    console.log(queryRes);
    console.log(queryRes.rows[0]);
    return NextResponse.json({ message: `${station.name} was added to your favorites.` });
  } catch (error) {
    let message: string = 'Internal server error';
    let status: number | undefined = undefined;

    if (error instanceof Error) {
      /*
        Looking for postgreSQL errors specifically.
        Error codes here: https://www.postgresql.org/docs/current/errcodes-appendix.html
      */
      if ('code' in error && 'constraint' in error) {
        if (error.code === '23503') {
          /*
            Foreign key violation. 
            This occurs when the foreign key (userId in this case) cannot be found in the table being referenced.
          */
          message = 'User not found.';
        } else if (error.code === '23505') {
          /*
            Unique constraint violation.
            This occurs when the given userId and stationId already exist in a row together, indicating that 
            the user has already favorited the given station. 
          */
          message = 'This station is already in your favorites.';
        } else {
          message = 'Error updating favorites. Please try again later.';
        }
      } else {
        message = error.message;
      }
    }
    if (error instanceof HTTPError) {
      status = error.status;
    }

    return NextResponse.json({ error: message }, { status: status || 500 });
  }
};
