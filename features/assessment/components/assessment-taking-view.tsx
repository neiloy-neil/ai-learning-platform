
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AssessmentTakingView({ assessmentId }: { assessmentId: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Assessment Title</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Assessment ID: {assessmentId}</p>
        <p>Questions will be displayed here.</p>
        <Button>Submit Assessment</Button>
      </CardContent>
    </Card>
  );
}
