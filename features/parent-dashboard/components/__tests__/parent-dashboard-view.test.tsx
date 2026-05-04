import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import ParentDashboardView from '@/features/parent-dashboard/components/parent-dashboard-view';

vi.mock('@/features/demo/components/demo-data-provider', () => ({
  useDemoData: () => ({
    parentProfiles: [
      {
        student: { id: 'student-1', name: 'Alex Carter' },
        mastery: [
          { conceptId: 'linear-equations', masteryScore: 90 },
          { conceptId: 'quadratics', masteryScore: 45 },
        ],
        goals: [{ id: 'goal-1', text: 'Raise quadratics mastery', progress: 50, status: 'active' }],
        alerts: [{ id: 'alert-1', message: 'Quadratics needs attention.', type: 'grade_drop' }],
        weeklyActivity: [{ day: 'Mon', minutes: 30 }],
        digest: { summary: 'Alex had a steady week.', attendanceTone: 'Steady weekly effort.' },
        changes: [{ id: 'change-1', title: 'Quadratics moved', description: 'Slight lift from last week.', tone: 'positive' }],
        supportTips: [{ id: 'tip-1', title: 'Review aloud', description: 'Explain one example out loud.' }],
        upcomingAssessments: [{ id: 'assessment-1', title: 'Algebra Diagnostic', dueLabel: '03/29/2026' }],
        missedWork: [{ id: 'missed-1', title: 'Quadratics revision', status: 'Overdue' }],
        teacherMessagesPreview: [{ id: 'message-1', sender: 'Maya Thompson', text: 'Short review tonight would help.' }],
      },
      {
        student: { id: 'student-2', name: 'Mia Carter' },
        mastery: [],
        goals: [],
        alerts: [],
        weeklyActivity: [{ day: 'Mon', minutes: 10 }],
        digest: { summary: 'Mia has one overdue task.', attendanceTone: 'Needs one catch-up block.' },
        changes: [],
        supportTips: [],
        upcomingAssessments: [],
        missedWork: [],
        teacherMessagesPreview: [],
      },
    ],
    selectedParentStudentId: 'student-1',
    selectParentStudent: vi.fn(),
    selectedParentSupport: null,
    generateParentSupport: vi.fn(),
  }),
}));

describe('ParentDashboardView', () => {
  it('renders the selected child and linked children control', () => {
    render(<ParentDashboardView />);

    expect(screen.getByText('Parent Dashboard')).toBeInTheDocument();
    expect(screen.getAllByText('Alex Carter').length).toBeGreaterThan(0);
    expect(screen.getByText('Linked children')).toBeInTheDocument();
    expect(screen.getAllByText('Quadratics needs attention.').length).toBeGreaterThan(0);
  });
});
