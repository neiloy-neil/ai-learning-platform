import { NextResponse } from 'next/server';

import { parentAlerts } from '@/lib/db/data';

export async function GET(
  _request: Request,
  context: { params: Promise<{ studentId: string }> },
) {
  try {
    const { studentId } = await context.params;

    if (!studentId) {
      return new NextResponse('Student ID is required', { status: 400 });
    }

    const alerts = parentAlerts.filter((alert) => alert.studentId === studentId);
    return NextResponse.json(alerts);
  } catch (error) {
    console.error('[PARENT_ALERTS_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
