import { HTTPError, Session } from '@/lib/api/schemas';
import { getActiveSession } from '@/lib/session';
import { NextResponse } from 'next/server';

export const GET = async (): Promise<NextResponse> => {
  try {
    const session: Session = await getActiveSession();
    return NextResponse.json(session);
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
