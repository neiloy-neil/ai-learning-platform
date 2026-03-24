
import { NextResponse } from 'next/server';

/**
 * @api {get} /api/pcdc/student-responses
 * @apiName GetStudentResponses
 * @apiGroup StudentResponses
 *
 * @apiSuccess {Object[]} responses List of student responses.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [{
 *       "id": "resp1",
 *       "studentId": "student123",
 *       "questionId": "q1",
 *       "isCorrect": true,
 *       "attemptTimestamp": "2026-03-24T12:00:00.000Z"
 *     }]
 */
export async function GET() {
  // Placeholder data
  const placeholderResponses = [
    {
      id: "resp1",
      studentId: "student123",
      questionId: "q1",
      isCorrect: true,
      attemptTimestamp: new Date().toISOString()
    }
  ];
  return NextResponse.json(placeholderResponses);
}
