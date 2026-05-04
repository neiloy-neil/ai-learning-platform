import { describe, expect, it } from 'vitest';

import { appRoutes, getDefaultRouteForRole } from '@/lib/app-routes';
import { UserRole } from '@/lib/pcdc-types';

describe('getDefaultRouteForRole', () => {
  it('returns the canonical student dashboard route', () => {
    expect(getDefaultRouteForRole(UserRole.STUDENT)).toBe(appRoutes.student.dashboard);
  });

  it('returns the canonical teacher dashboard route', () => {
    expect(getDefaultRouteForRole(UserRole.TEACHER)).toBe(appRoutes.teacher.dashboard);
  });

  it('returns the canonical parent dashboard route', () => {
    expect(getDefaultRouteForRole(UserRole.PARENT)).toBe(appRoutes.parent.dashboard);
  });
});
