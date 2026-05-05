'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ClassList from './class-list';
import ClassDetails from './class-details';

export default function ClassManagementAdminView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Class Management</h1>
        <p className="mt-2 text-muted-foreground">Manage classes, schedules, and enrollment</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <ClassList />
        <ClassDetails />
      </div>
    </div>
  );
}
