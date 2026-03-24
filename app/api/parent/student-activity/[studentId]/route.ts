import { NextResponse } from 'next/server';

import { studentActivities } from '@/lib/db/data';

export async function GET(
  _request: Request,
  context: { params: Promise<{ studentId: string }> },
) {
  try {
    const { studentId } = await context.params;

    if (!studentId) {
      return new NextResponse('Student ID is required', { status: 400 });
    }

    const activities = studentActivities.filter((activity) => activity.studentId === studentId);
    return NextResponse.json(activities);
  } catch (error) {
    console.error('[PARENT_STUDENT_ACTIVITIES_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
