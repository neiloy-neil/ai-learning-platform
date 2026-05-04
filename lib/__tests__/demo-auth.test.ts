import { describe, expect, it } from 'vitest';

import { getDemoUserKeyFromEmail } from '@/lib/demo-auth';

describe('getDemoUserKeyFromEmail', () => {
  it('maps teacher-like emails to the teacher demo user', () => {
    expect(getDemoUserKeyFromEmail('maya@example.com')).toBe('teacher');
    expect(getDemoUserKeyFromEmail('teacher+demo@example.com')).toBe('teacher');
  });

  it('maps parent-like emails to the parent demo user', () => {
    expect(getDemoUserKeyFromEmail('jordan@example.com')).toBe('parent');
    expect(getDemoUserKeyFromEmail('parent+demo@example.com')).toBe('parent');
  });

  it('falls back to the student demo user', () => {
    expect(getDemoUserKeyFromEmail('alex@example.com')).toBe('student');
    expect(getDemoUserKeyFromEmail('someone-else@example.com')).toBe('student');
  });
});
