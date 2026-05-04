import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import LoginView from '@/features/auth/components/login-view';

const loginAsDemo = vi.fn();

vi.mock('@/features/auth/components/auth-provider', () => ({
  useAuth: () => ({
    loginAsDemo,
  }),
}));

describe('LoginView', () => {
  it('renders the demo role entry cards', () => {
    render(<LoginView />);

    expect(screen.getByText('Student Demo')).toBeInTheDocument();
    expect(screen.getByText('Teacher Demo')).toBeInTheDocument();
    expect(screen.getByText('Parent Demo')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Enter demo as student' })).toBeInTheDocument();
  });
});
