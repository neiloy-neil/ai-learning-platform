import { redirect } from 'next/navigation';

import { appRoutes } from '@/lib/app-routes';

export default function PracticePage() {
  redirect(appRoutes.student.practice);
}
