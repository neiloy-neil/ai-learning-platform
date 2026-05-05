
'use client';

import AssessmentTakingView from '@/features/assessment/components/assessment-taking-view';

export default function AssessmentTakingPage({ params }: { params: { assessmentId: string } }) {
  return <AssessmentTakingView assessmentId={params.assessmentId} />;
}
