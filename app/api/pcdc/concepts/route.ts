
import { NextResponse } from 'next/server';

/**
 * @api {get} /api/pcdc/concepts
 * @apiName GetConcepts
 * @apiGroup Concepts
 *
 * @apiSuccess {Object[]} concepts List of concepts.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [{
 *       "id": "algebra-linear-equations",
 *       "name": "Linear Equations",
 *       "subject": "math",
 *       "level": "grade-9"
 *     }]
 */
export async function GET() {
  // In a real implementation, you would fetch this data from a database.
  const placeholderConcepts = [
    {
      id: "algebra-linear-equations",
      name: "Linear Equations",
      subject: "math",
      level: "grade-9"
    }
  ];
  return NextResponse.json(placeholderConcepts);
}
