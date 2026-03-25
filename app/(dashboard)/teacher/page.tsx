import { redirect } from 'next/navigation';

import { appRoutes } from '@/lib/app-routes';

export default function TeacherPage() {
  redirect(appRoutes.teacher.dashboard);
}
