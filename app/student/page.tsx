import { redirect } from 'next/navigation';

import { appRoutes } from '@/lib/app-routes';

export default function LegacyStudentRootPage() {
  redirect(appRoutes.student.dashboard);
}
