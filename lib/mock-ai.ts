import { QuestionDifficulty, type Question } from '@/lib/pcdc-types';

export type AiTutorCategory = 'explain-concept' | 'simplify-answer' | 'give-hint' | 'motivate' | 'recommend-next-step';
export type QuizDifficulty = 'easy' | 'medium' | 'hard';
export type TeacherAiTool =
  | 'quiz'
  | 'remediation-set'
  | 'lesson-outline'
  | 'class-summary'
  | 'curriculum-sequence'
  | 'parent-summary';

export type AiTutorReply = {
  category: AiTutorCategory;
  title: string;
  body: string;
  followUpLabel: string;
  followUpAction: 'practice' | 'revision' | 'study-plan' | 'assessment';
};

export type DemoGeneratedQuestion = Question & {
  generatedBy: 'ai';
};

export type DemoGeneratedQuiz = {
  id: string;
  ownerRole: 'student' | 'teacher';
  title: string;
  subject: string;
  conceptId: string;
  conceptName: string;
  difficulty: QuizDifficulty;
  questionCount: number;
  createdAt: string;
  questions: DemoGeneratedQuestion[];
};

export type DemoAiAssessment = {
  score: number;
  strengths: string[];
  mistakes: string[];
  nextConcepts: string[];
  studyAdvice: string;
};

export type DemoStudyPlanTask = {
  id: string;
  title: string;
  minutes: number;
  type: 'practice' | 'revision' | 'assessment' | 'reflection';
  reason: string;
};

export type DemoStudyPlan = {
  id: string;
  title: string;
  createdAt: string;
  rationale: string;
  tasks: DemoStudyPlanTask[];
};

export type TeacherAiArtifact = {
  id: string;
  tool: TeacherAiTool;
  title: string;
  summary: string;
  bullets: string[];
  createdAt: string;
};

function hashString(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash;
}

function pickFromSeed<T>(items: T[], seed: string, offset = 0): T {
  return items[(hashString(`${seed}:${offset}`) % items.length + items.length) % items.length];
}

export function classifyTutorPrompt(prompt: string): AiTutorCategory {
  const normalized = prompt.toLowerCase();
  if (normalized.includes('simpl') || normalized.includes('easy words')) {
    return 'simplify-answer';
  }
  if (normalized.includes('hint') || normalized.includes('stuck')) {
    return 'give-hint';
  }
  if (normalized.includes('motivat') || normalized.includes('encourag')) {
    return 'motivate';
  }
  if (normalized.includes('next') || normalized.includes('recommend') || normalized.includes('what should i do')) {
    return 'recommend-next-step';
  }
  return 'explain-concept';
}

export function buildTutorReply(input: {
  prompt: string;
  conceptName: string;
  recommendedConceptName: string;
}): AiTutorReply {
  const category = classifyTutorPrompt(input.prompt);
  const seed = `${input.prompt}:${input.conceptName}:${input.recommendedConceptName}`;

  const explanationFrames = [
    `${input.conceptName} becomes easier when you split it into one move at a time: identify the relationship, isolate the unknown, then verify the result.`,
    `Think of ${input.conceptName} as pattern recognition first and calculation second. Once the structure is clear, the steps become predictable.`,
    `The main skill in ${input.conceptName} is not speed. It is seeing what changes and what stays stable from one problem to the next.`,
  ];
  const simplifications = [
    `In simple terms, ${input.conceptName} asks you to keep the problem balanced while you peel away extra parts until the answer is obvious.`,
    `${input.conceptName} is really about spotting the cleanest route from the messy question to one clear result.`,
    `A simpler way to view ${input.conceptName}: treat each question like a sequence of small clean-up steps, not one giant leap.`,
  ];
  const hints = [
    `Start by naming the target before you compute anything. Once you know what the question is asking for, eliminate the distracting parts first.`,
    `Use the smallest reliable step next. If the problem feels large, do the one operation that makes the expression simpler, then pause and re-read it.`,
    `Check the representation before the arithmetic. Many mistakes here come from reading the structure incorrectly, not from the math itself.`,
  ];
  const motivation = [
    `You are closer than the mastery score suggests. One focused session on ${input.conceptName} can remove the confusion that keeps repeating.`,
    `Your weaker concepts are still fixable quickly because the gaps are concentrated, not spread across the whole path.`,
    `Progress here is usually stepwise, not gradual. A short clean review can change how the whole topic feels.`,
  ];
  const nextSteps = [
    `Your best next move is ${input.recommendedConceptName}. It unlocks higher-value progress because it sits directly under your current bottleneck.`,
    `I would move to ${input.recommendedConceptName} next because the evidence suggests it will deliver the fastest mastery lift this week.`,
    `The platform is steering you toward ${input.recommendedConceptName} because that topic has the highest payoff for your current readiness state.`,
  ];

  switch (category) {
    case 'simplify-answer':
      return {
        category,
        title: `Simplified ${input.conceptName}`,
        body: pickFromSeed(simplifications, seed),
        followUpLabel: 'Generate a short quiz',
        followUpAction: 'practice',
      };
    case 'give-hint':
      return {
        category,
        title: `Hint for ${input.conceptName}`,
        body: pickFromSeed(hints, seed),
        followUpLabel: 'Open revision set',
        followUpAction: 'revision',
      };
    case 'motivate':
      return {
        category,
        title: 'Momentum Check',
        body: pickFromSeed(motivation, seed),
        followUpLabel: 'Build a study plan',
        followUpAction: 'study-plan',
      };
    case 'recommend-next-step':
      return {
        category,
        title: 'Next Best Action',
        body: pickFromSeed(nextSteps, seed),
        followUpLabel: 'Start recommended work',
        followUpAction: 'practice',
      };
    default:
      return {
        category,
        title: `Explanation: ${input.conceptName}`,
        body: pickFromSeed(explanationFrames, seed),
        followUpLabel: 'Review weak concepts',
        followUpAction: 'revision',
      };
  }
}

export function createGeneratedQuiz(input: {
  conceptId: string;
  conceptName: string;
  subject: string;
  difficulty: QuizDifficulty;
  questionCount: number;
  ownerRole: 'student' | 'teacher';
}): DemoGeneratedQuiz {
  const starter = input.conceptName.split(' ')[0];
  const frames = [
    {
      text: `Which statement best matches the core pattern in ${input.conceptName}?`,
      options: ['Identify the changing quantity', 'Ignore the structure', 'Guess from the last step', 'Use only memorized rules'],
      correct: 0,
      explanation: `The fastest way into ${input.conceptName} is to identify the structure before applying any procedure.`,
    },
    {
      text: `A student misses a ${input.conceptName} item. What is the best first check?`,
      options: ['Whether the target was identified correctly', 'Whether the handwriting is neat', 'Whether the numbers are large', 'Whether the answer is long'],
      correct: 0,
      explanation: `Most early mistakes in ${input.conceptName} come from misreading what needs to be isolated or compared.`,
    },
    {
      text: `Which move usually improves accuracy most in ${input.conceptName}?`,
      options: ['One small simplifying step at a time', 'Doing two operations at once', 'Skipping verification', 'Switching methods mid-solution'],
      correct: 0,
      explanation: `Controlled, incremental steps reduce avoidable errors and make the path easier to audit.`,
    },
    {
      text: `Why is ${starter.toLowerCase()} readiness important before moving ahead?`,
      options: ['It supports later topics', 'It replaces all later topics', 'It removes the need for feedback', 'It makes every problem identical'],
      correct: 0,
      explanation: `${input.conceptName} acts as a dependency in the learning path, so stable fluency improves later outcomes.`,
    },
  ];

  const difficulties: Record<QuizDifficulty, QuestionDifficulty> = {
    easy: QuestionDifficulty.EASY,
    medium: QuestionDifficulty.MEDIUM,
    hard: QuestionDifficulty.HARD,
  };

  const questions: DemoGeneratedQuestion[] = Array.from({ length: input.questionCount }, (_, index) => {
    const frame = frames[index % frames.length];
    return {
      id: `ai-question-${input.conceptId}-${index + 1}`,
      text: frame.text,
      difficulty: difficulties[input.difficulty],
      conceptIds: [input.conceptId],
      options: frame.options.map((text, optionIndex) => ({
        id: String.fromCharCode(97 + optionIndex),
        text,
      })),
      correctOptionId: String.fromCharCode(97 + frame.correct),
      explanation: frame.explanation,
      generatedBy: 'ai',
    };
  });

  return {
    id: `ai-quiz-${input.conceptId}-${input.difficulty}-${input.questionCount}`.toLowerCase(),
    ownerRole: input.ownerRole,
    title: `AI Quiz: ${input.conceptName}`,
    subject: input.subject,
    conceptId: input.conceptId,
    conceptName: input.conceptName,
    difficulty: input.difficulty,
    questionCount: input.questionCount,
    createdAt: new Date().toISOString(),
    questions,
  };
}

export function assessGeneratedQuiz(input: {
  quiz: DemoGeneratedQuiz;
  answers: Array<{ questionId: string; selectedOptionId: string }>;
}): DemoAiAssessment {
  const answerMap = new Map(input.answers.map((answer) => [answer.questionId, answer.selectedOptionId]));
  const correctCount = input.quiz.questions.filter((question) => answerMap.get(question.id) === question.correctOptionId).length;
  const score = input.quiz.questions.length === 0 ? 0 : Math.round((correctCount / input.quiz.questions.length) * 100);

  return {
    score,
    strengths: score >= 80
      ? [`You are reading ${input.quiz.conceptName} structures accurately.`]
      : [`You already recognize the main idea in ${input.quiz.conceptName} when the wording stays direct.`],
    mistakes: score >= 80
      ? ['Minor hesitation still shows up when you need to justify the step order.']
      : ['The current mistakes point to structure-reading gaps before the calculation even begins.'],
    nextConcepts: score >= 80 ? [input.quiz.conceptName, 'Challenge set'] : [input.quiz.conceptName, 'Revision queue'],
    studyAdvice:
      score >= 80
        ? `Move to a slightly harder set, then return once more this week to keep ${input.quiz.conceptName} stable.`
        : `Use a short revision block on ${input.quiz.conceptName}, then take a second low-stakes quiz while the explanation is still fresh.`,
  };
}

export function createStudyPlan(input: {
  studentName: string;
  availableMinutes: number;
  focusConceptName: string;
  assessmentTitle: string;
}): DemoStudyPlan {
  const tasks: DemoStudyPlanTask[] = [
    {
      id: 'plan-1',
      title: `Warm-up practice on ${input.focusConceptName}`,
      minutes: Math.max(15, Math.round(input.availableMinutes * 0.3)),
      type: 'practice',
      reason: 'This is the concept with the strongest short-term payoff for mastery growth.',
    },
    {
      id: 'plan-2',
      title: `Revision queue refresh`,
      minutes: Math.max(10, Math.round(input.availableMinutes * 0.25)),
      type: 'revision',
      reason: 'A quick spaced review keeps older weak concepts from decaying further.',
    },
    {
      id: 'plan-3',
      title: `Assessment prep: ${input.assessmentTitle}`,
      minutes: Math.max(15, Math.round(input.availableMinutes * 0.3)),
      type: 'assessment',
      reason: 'This creates direct readiness for the next due checkpoint.',
    },
    {
      id: 'plan-4',
      title: 'Reflection and confidence check',
      minutes: Math.max(5, input.availableMinutes - Math.round(input.availableMinutes * 0.85)),
      type: 'reflection',
      reason: 'Logging what felt easy or difficult improves the next recommendation cycle.',
    },
  ];

  return {
    id: `study-plan-${input.focusConceptName.toLowerCase().replace(/\s+/g, '-')}`,
    title: `${input.studentName}'s AI Study Plan`,
    createdAt: new Date().toISOString(),
    rationale: `This plan prioritizes ${input.focusConceptName} first, then balances revision and assessment readiness inside a ${input.availableMinutes}-minute study window.`,
    tasks,
  };
}

export function createTeacherAiArtifact(input: {
  tool: TeacherAiTool;
  focus: string;
  className: string;
}): TeacherAiArtifact {
  const library: Record<TeacherAiTool, { title: string; summary: string; bullets: string[] }> = {
    quiz: {
      title: `AI Quiz Draft for ${input.focus}`,
      summary: `A short checkpoint focused on ${input.focus} for ${input.className}.`,
      bullets: ['3 foundational checks', '1 transfer question', 'Teacher review note included'],
    },
    'remediation-set': {
      title: `Remediation Set: ${input.focus}`,
      summary: `A guided intervention sequence designed to repair repeated mistakes in ${input.focus}.`,
      bullets: ['Target misconception prompts', 'Confidence tracking', 'Exit check item'],
    },
    'lesson-outline': {
      title: `Lesson Outline: ${input.focus}`,
      summary: `A class-ready outline that moves from concept framing to independent practice.`,
      bullets: ['Hook and misconception check', 'Worked example sequence', 'Independent practice block'],
    },
    'class-summary': {
      title: `Class Summary: ${input.className}`,
      summary: `A leadership-style snapshot of performance, risk, and next interventions for ${input.className}.`,
      bullets: ['Top growth area', 'Highest risk cluster', 'Recommended teacher action'],
    },
    'curriculum-sequence': {
      title: `Curriculum Sequence for ${input.focus}`,
      summary: `A weekly progression that ladders prerequisites, core work, and mastery checkpoints.`,
      bullets: ['Week-by-week objectives', 'Prerequisite checkpoints', 'Assessment anchors'],
    },
    'parent-summary': {
      title: `Parent Summary for ${input.focus}`,
      summary: `Plain-language take-home guidance that explains the learning issue and what to do next.`,
      bullets: ['Plain-language explanation', 'Home support action', 'Follow-up question for the student'],
    },
  };

  const template = library[input.tool];
  return {
    id: `artifact-${input.tool}-${input.focus.toLowerCase().replace(/\s+/g, '-')}`,
    tool: input.tool,
    title: template.title,
    summary: template.summary,
    bullets: template.bullets,
    createdAt: new Date().toISOString(),
  };
}

export function createParentSupportMessage(input: {
  studentName: string;
  weakConceptName: string;
}) {
  return {
    explanation: `${input.weakConceptName} is currently the weakest area for ${input.studentName}. The issue is not overall ability; it is repeated confusion around the same pattern.`,
    homePlan: `Ask ${input.studentName} to explain one ${input.weakConceptName} example aloud, then have them complete one short practice block and one quick review question.`,
    encouragement: `${input.studentName}, you do not need to solve everything tonight. One clean, focused step on ${input.weakConceptName} is enough to move the week forward.`,
  };
}
