import type { DemoUserKey } from '@/lib/mocks';

export function getDemoUserKeyFromEmail(email: string): DemoUserKey {
  const normalizedEmail = email.toLowerCase();
  if (normalizedEmail.includes('maya') || normalizedEmail.includes('teacher')) return 'teacher';
  if (normalizedEmail.includes('jordan') || normalizedEmail.includes('parent')) return 'parent';
  return 'student';
}
