import { redirect } from 'next/navigation';

import { appRoutes } from '@/lib/app-routes';

export default function StudentPage() {
  redirect(appRoutes.student.dashboard);
}
