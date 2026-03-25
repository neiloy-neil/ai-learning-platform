import { describe, expect, it } from 'vitest';

import {
  buildParentChildProfiles,
  buildRecommendation,
  completePracticeSession,
  createInitialStudentState,
  createInitialTeacherManagementState,
} from '@/lib/mocks';

describe('demo student logic', () => {
  it('updates assessment status, attempts, and mastery after a completed session', () => {
    const state = createInitialStudentState();
    const nextState = completePracticeSession(state, {
      assessmentId: 'assess-1',
      mode: 'assessment-review',
      answers: [
        { questionId: 'question-1', selectedOptionId: 'b', confidenceRating: 5 },
        { questionId: 'question-2', selectedOptionId: 'a', confidenceRating: 4 },
      ],
    });

    const assessment = nextState.assessments.find((item) => item.id === 'assess-1');
    const linearMastery = nextState.mastery.find((item) => item.conceptId === 'linear-equations');

    expect(nextState.attempts).toHaveLength(state.attempts.length + 2);
    expect(assessment?.status).toBe('Reviewed');
    expect(assessment?.lastScore).toBe(100);
    expect(linearMastery?.lastUpdated.getTime()).toBeGreaterThan(state.mastery[0].lastUpdated.getTime());
  });

  it('keeps recommendation output stable and actionable', () => {
    const recommendation = buildRecommendation(createInitialStudentState().mastery);

    expect(recommendation.nextConceptId).toBeTruthy();
    expect(recommendation.href).toContain('/student/practice');
    expect(recommendation.ctaLabel.length).toBeGreaterThan(0);
    expect(recommendation.reason.length).toBeGreaterThan(0);
  });
});

describe('demo role data', () => {
  it('builds multiple parent child profiles for switching', () => {
    const profiles = buildParentChildProfiles(createInitialStudentState());

    expect(profiles).toHaveLength(2);
    expect(profiles.map((profile) => profile.student.name)).toEqual(
      expect.arrayContaining(['Alex Carter', 'Mia Carter']),
    );
  });

  it('seeds teacher state with assignments, nudges, and threads', () => {
    const teacherState = createInitialTeacherManagementState();

    expect(teacherState.classes.length).toBeGreaterThan(0);
    expect(teacherState.assignments.length).toBeGreaterThan(0);
    expect(teacherState.nudges.length).toBeGreaterThan(0);
    expect(teacherState.threads.length).toBeGreaterThan(0);
  });
});
