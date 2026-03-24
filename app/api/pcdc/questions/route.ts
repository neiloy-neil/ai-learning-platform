
import { NextResponse } from 'next/server';
import { QuestionDifficulty } from '@/lib/pcdc-types';

/**
 * @api {get} /api/pcdc/questions
 * @apiName GetQuestions
 * @apiGroup Questions
 *
 * @apiSuccess {Object[]} questions List of questions.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [{
 *       "id": "q1",
 *       "text": "What is 2 + 2?",
 *       "difficulty": "easy",
 *       "conceptIds": ["arithmetic-addition"]
 *     }]
 */
export async function GET() {
  // Placeholder data
  const placeholderQuestions = [
    {
      id: "q1",
      text: "What is 2 + 2?",
      difficulty: QuestionDifficulty.EASY,
      conceptIds: ["arithmetic-addition"]
    }
  ];
  return NextResponse.json(placeholderQuestions);
}
