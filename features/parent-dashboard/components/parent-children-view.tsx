'use client';

import PageHeader from '@/components/layout/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress-bar';
import { useDemoData } from '@/features/demo/components/demo-data-provider';

export default function ParentChildrenView() {
  const { parentProfiles } = useDemoData();

  return (
    <div className="space-y-8">
      <PageHeader />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {parentProfiles.map((profile) => {
          const averageMastery =
            profile.mastery.length === 0
              ? 0
              : Math.round(profile.mastery.reduce((sum, item) => sum + item.masteryScore, 0) / profile.mastery.length);

          return (
            <Card glass key={profile.student.id}>
              <CardHeader>
                <CardTitle>{profile.student.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{profile.digest.summary}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Average mastery</span>
                    <span className="font-semibold text-foreground">{averageMastery}%</span>
                  </div>
                  <ProgressBar value={averageMastery} />
                </div>
                <div className="rounded-2xl border border-border/70 p-4 text-sm text-muted-foreground">
                  {profile.digest.attendanceTone}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
