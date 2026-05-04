'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, Clock, Calendar } from 'lucide-react';

export default function ClassManagementAdminView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Class Management</h1>
        <p className="mt-2 text-muted-foreground">Manage classes, schedules, and enrollment</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-500/10 p-2">
                <BookOpen className="size-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">24</p>
                <p className="text-sm text-muted-foreground">Total Classes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-500/10 p-2">
                <Users className="size-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">186</p>
                <p className="text-sm text-muted-foreground">Enrolled Students</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-orange-500/10 p-2">
                <Clock className="size-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">12</p>
                <p className="text-sm text-muted-foreground">This Week</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-purple-500/10 p-2">
                <Calendar className="size-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">8</p>
                <p className="text-sm text-muted-foreground">Available Slots</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Class Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">Class management interface coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}
