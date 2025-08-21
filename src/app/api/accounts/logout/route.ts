import { HTTPError } from '@/lib/api/schemas';
import { deleteSession } from '@/lib/session';
import { NextResponse } from 'next/server';

export const POST = async (): Promise<NextResponse> => {
  try {
    await deleteSession();
    return NextResponse.json({ message: 'Logout successful.' });
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
