import { redirect } from 'next/navigation';

import { appRoutes } from '@/lib/app-routes';

export default function LegacyParentRootPage() {
  redirect(appRoutes.parent.dashboard);
}
