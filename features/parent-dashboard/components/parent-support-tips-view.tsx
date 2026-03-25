'use client';

import { useEffect } from 'react';

import PageHeader from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDemoData } from '@/features/demo/components/demo-data-provider';

export default function ParentSupportTipsView() {
  const { parentProfiles, selectedParentStudentId, generateParentSupport, selectedParentSupport } = useDemoData();
  const selectedProfile = parentProfiles.find((profile) => profile.student.id === selectedParentStudentId) ?? parentProfiles[0];

  useEffect(() => {
    if (!selectedParentSupport && selectedProfile) {
      generateParentSupport(selectedProfile.student.id);
    }
  }, [generateParentSupport, selectedParentSupport, selectedProfile]);

  return (
    <div className="space-y-8">
      <PageHeader />

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[0.9fr_1.1fr]">
        <Card glass>
          <CardHeader>
            <CardTitle>At-Home Support Suggestions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedProfile.supportTips.map((tip) => (
              <div className="rounded-3xl border border-border/70 p-4" key={tip.id}>
                <p className="font-semibold text-foreground">{tip.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">{tip.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card glass>
          <CardHeader>
            <CardTitle>AI Helper</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full" onClick={() => generateParentSupport(selectedProfile.student.id)} variant="secondary">
              Refresh AI support message
            </Button>
            {selectedParentSupport ? (
              <div className="space-y-4 rounded-3xl border border-border/70 p-5">
                <div>
                  <p className="font-semibold text-foreground">Explain the weakness</p>
                  <p className="mt-2 text-sm text-muted-foreground">{selectedParentSupport.explanation}</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Create a home plan</p>
                  <p className="mt-2 text-sm text-muted-foreground">{selectedParentSupport.homePlan}</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Encouragement message</p>
                  <p className="mt-2 text-sm text-muted-foreground">{selectedParentSupport.encouragement}</p>
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
