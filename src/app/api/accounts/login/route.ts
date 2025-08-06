import { User } from '@/lib/api/schemas';
import { checkIfUserExists, HTTPError } from '@/lib/api/utils';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const { email, password } = await request.json();

    console.log('Checking that all params are present...');
    if (!email || !password) {
      throw new HTTPError('Missing login parameters.', 400);
    }

    const user: User = await checkIfUserExists('email', email);

    if (!user) {
      throw new HTTPError('Invalid email or password.', 404);
    }

    const isPasswordMatch: boolean = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordMatch) {
      throw new HTTPError('Invalid email or password.', 404);
    }

    return NextResponse.json({ message: 'User has logged in.' });
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
