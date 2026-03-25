import { redirect } from 'next/navigation';

import { appRoutes } from '@/lib/app-routes';

export default function LearningPathPage() {
  redirect(appRoutes.student.learningPath);
}
