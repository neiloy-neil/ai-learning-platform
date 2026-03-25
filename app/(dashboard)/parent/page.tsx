import { redirect } from 'next/navigation';

import { appRoutes } from '@/lib/app-routes';

export default function ParentPage() {
  redirect(appRoutes.parent.dashboard);
}
