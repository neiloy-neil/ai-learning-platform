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
      },
      {
        student: { id: 'student-2', name: 'Mia Carter' },
        mastery: [],
        goals: [],
        alerts: [],
        weeklyActivity: [{ day: 'Mon', minutes: 10 }],
      },
    ],
    selectedParentStudentId: 'student-1',
    selectParentStudent: vi.fn(),
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
