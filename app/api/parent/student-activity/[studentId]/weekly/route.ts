import { NextResponse } from 'next/server';

import { weeklyActivity } from '@/lib/db/data';

export async function GET(
  _request: Request,
  context: { params: Promise<{ studentId: string }> },
) {
  try {
    const { studentId } = await context.params;

    if (!studentId) {
      return new NextResponse('Student ID is required', { status: 400 });
    }

    return NextResponse.json(weeklyActivity);
  } catch (error) {
    console.error('[PARENT_WEEKLY_ACTIVITY_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
