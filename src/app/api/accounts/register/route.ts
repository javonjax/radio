import { pgPool } from '@/lib/api/db/db';
import { NextRequest, NextResponse } from 'next/server';
import { QueryResult } from 'pg';
import bcrypt from 'bcrypt';
import { HTTPError, User } from '@/lib/api/schemas';
import { createSession } from '@/lib/session';

const DB_SCHEMA: string = process.env.DB_SCHEMA as string;
const DB_USERS_TABLE: string = process.env.DB_USERS_TABLE as string;

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const { email, password } = await request.json();

    console.log('Checking that all params are present...');
    if (!email || !password) {
      throw new HTTPError('Missing registration parameters.', 400);
    }

    console.log('Checking if an account is registered under the given email...');
    let query = {
      text: `SELECT * FROM ${DB_SCHEMA}.${DB_USERS_TABLE} WHERE email = $1;`,
      values: [email],
    };
    const existsUnderEmail: QueryResult<User> = await pgPool.query(query);
    if (existsUnderEmail.rowCount && existsUnderEmail.rowCount > 0) {
      throw new HTTPError('An account is already registered with this email address.', 409);
    }

    // Encrypt password.
    const salt: string = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash(password, salt);

    console.log('Attempting to register account...');
    query = {
      text: `INSERT INTO ${DB_SCHEMA}.${DB_USERS_TABLE} (email, password_hash) VALUES ($1, $2) RETURNING id;`,
      values: [email, hashedPassword],
    };

    const queryRes: QueryResult<{ id: number }> = await pgPool.query(query);
    if (!queryRes.rowCount) {
      throw new HTTPError('Registration failed. Please try again later.', 500);
    }
    console.log(queryRes);
    console.log(queryRes.rows[0]);
    const userId: number = queryRes.rows[0].id;
    await createSession(userId);

    return NextResponse.json({ message: 'Registration successful.' });
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
