
// lib/mock-data.ts

import { QuestionDifficulty } from "./pcdc-types";

export const mockAssessments = [
    {
      id: "diagnostic1",
      title: "Initial Diagnostic Assessment",
      description: "A quick assessment to determine your current skill level.",
      questionCount: 3,
      conceptIds: ['c1', 'c2', 'c3'],
      status: "Completed",
    },
    {
      id: "assess1",
      title: "Algebra Diagnostic Test",
      description: "Test your foundational knowledge of Algebra.",
      questionCount: 10,
      conceptIds: ['c1', 'c2'],
      status: "In Progress",
    },
    {
      id: "assess2",
      title: "Weekly Quiz - Week 3",
      description: "A short quiz on this week's topics, including Linear Equations.",
      questionCount: 5,
      conceptIds: ['c2'],
      status: "Upcoming",
    },
    {
      id: "assess3",
      title: "Geometry Fundamentals Check",
      description: "Assess your understanding of basic geometric principles.",
      questionCount: 15,
      conceptIds: [],
      status: "Upcoming",
    },
];

export const mockQuestionsForAssessments = [
    {
        id: 'dq1', 
        text: 'What is 5 + 3?',
        difficulty: QuestionDifficulty.EASY,
        conceptIds: ['c1'],
        options: [{id: 'a', text: '7'}, {id: 'b', text: '8'}, {id: 'c', text: '9'}],
        correctOptionId: 'b',
        explanation: '5 plus 3 equals 8.'
    },
    {
        id: 'dq2', 
        text: 'If a = 5 and b = 3, what is a - b?',
        difficulty: QuestionDifficulty.MEDIUM,
        conceptIds: ['c1'],
        options: [{id: 'a', text: '2'}, {id: 'b', text: '8'}, {id: 'c', text: '15'}],
        correctOptionId: 'a',
        explanation: '5 minus 3 equals 2.'
    },
    {
        id: 'dq3', 
        text: 'What is a prime number?',
        difficulty: QuestionDifficulty.HARD,
        conceptIds: ['c3'],
        options: [{id: 'a', text: 'A number divisible by 2'}, {id: 'b', text: 'A number greater than 1 with no divisors other than 1 and itself'}, {id: 'c', text: 'Any odd number'}],
        correctOptionId: 'b',
        explanation: 'A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself.'
    },
];
