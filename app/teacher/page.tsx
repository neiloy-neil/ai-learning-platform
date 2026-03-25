import { redirect } from 'next/navigation';

import { appRoutes } from '@/lib/app-routes';

export default function LegacyTeacherRootPage() {
  redirect(appRoutes.teacher.dashboard);
}
