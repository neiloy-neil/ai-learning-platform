'use client';

import Link from 'next/link';
import { useState } from 'react';

import PageHeader from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { useDemoData } from '@/features/demo/components/demo-data-provider';
import { appRoutes } from '@/lib/app-routes';

const toolOptions = [
  { value: 'quiz', label: 'Generate quiz' },
  { value: 'remediation-set', label: 'Generate remediation set' },
  { value: 'lesson-outline', label: 'Generate lesson outline' },
  { value: 'class-summary', label: 'Generate class summary' },
  { value: 'curriculum-sequence', label: 'Generate curriculum sequence' },
  { value: 'parent-summary', label: 'Generate parent summary' },
] as const;

export default function TeacherAiToolsView() {
  const { teacherArtifacts, teacherState, generateTeacherArtifact } = useDemoData();
  const [tool, setTool] = useState<(typeof toolOptions)[number]['value']>('quiz');
  const [focus, setFocus] = useState('Quadratics');
  const [className, setClassName] = useState(teacherState.classes[0]?.name ?? 'Algebra Foundations');
  const latestArtifacts = teacherArtifacts.slice(0, 3);

  return (
    <div className="space-y-8">
      <PageHeader />

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[0.85fr_1.15fr]">
        <Card glass>
          <CardHeader>
            <CardTitle>AI Tool Builder</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={tool} onValueChange={(value) => setTool(value as (typeof toolOptions)[number]['value'])}>
              <SelectTrigger>{toolOptions.find((option) => option.value === tool)?.label ?? 'Select tool'}</SelectTrigger>
              <SelectContent>
                {toolOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input placeholder="Focus area" value={focus} onChange={(event) => setFocus(event.target.value)} />
            <Select value={className} onValueChange={setClassName}>
              <SelectTrigger>{className}</SelectTrigger>
              <SelectContent>
                {teacherState.classes.map((teacherClass) => (
                  <SelectItem key={teacherClass.id} value={teacherClass.name}>
                    {teacherClass.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              className="w-full"
              onClick={() =>
                generateTeacherArtifact({
                  tool,
                  focus,
                  className,
                })
              }
            >
              Run AI placeholder
            </Button>
          </CardContent>
        </Card>

        <Card glass>
          <CardHeader>
            <CardTitle>Generated Drafts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {teacherArtifacts.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border/70 p-6 text-sm text-muted-foreground">
                Run one of the tools to generate quizzes, lesson artifacts, curriculum sequences, or parent summaries.
              </div>
            ) : (
              teacherArtifacts.map((artifact) => (
                <div className="rounded-3xl border border-border/70 p-5" key={artifact.id}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-foreground">{artifact.title}</p>
                      <p className="mt-2 text-sm text-muted-foreground">{artifact.summary}</p>
                    </div>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {artifact.tool}
                    </span>
                  </div>
                  <div className="mt-4 space-y-2">
                    {artifact.bullets.map((bullet) => (
                      <p className="text-sm text-muted-foreground" key={bullet}>
                        {bullet}
                      </p>
                    ))}
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[0.95fr_1.05fr]">
        <Card glass>
          <CardHeader>
            <CardTitle>Artifact Workflow</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-3xl border border-border/70 p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">1. Generate</p>
              <p className="mt-3 font-semibold text-foreground">Create a quiz, remediation set, summary, or sequence draft.</p>
            </div>
            <div className="rounded-3xl border border-border/70 p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">2. Route</p>
              <p className="mt-3 font-semibold text-foreground">Use the review desk, assignments page, or analytics view to act on the draft.</p>
            </div>
            <div className="rounded-3xl border border-border/70 p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">3. Follow Through</p>
              <p className="mt-3 font-semibold text-foreground">Tie the artifact to a learner, family update, or class intervention loop.</p>
            </div>
            <div className="flex flex-col gap-3 md:flex-row">
              <Button asChild className="md:flex-1" variant="secondary">
                <Link href={appRoutes.teacher.assignments}>Open assignments</Link>
              </Button>
              <Button asChild className="md:flex-1" variant="ghost">
                <Link href={appRoutes.teacher.review}>Open review desk</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card glass>
          <CardHeader>
            <CardTitle>Latest Artifact Signals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {latestArtifacts.length > 0 ? (
              latestArtifacts.map((artifact) => (
                <div className="rounded-3xl border border-border/70 p-4" key={`signal-${artifact.id}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-foreground">{artifact.title}</p>
                      <p className="mt-2 text-sm text-muted-foreground">{artifact.summary}</p>
                    </div>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {artifact.tool}
                    </span>
                  </div>
                  <div className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
                    {artifact.bullets.slice(0, 2).map((bullet) => (
                      <p key={`${artifact.id}-${bullet}`}>{bullet}</p>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-border/70 p-4 text-sm text-muted-foreground">
                New AI drafts will be mirrored here as short operational signals once you start generating them.
              </div>
            )}
            <div className="flex flex-col gap-3 md:flex-row">
              <Button asChild className="md:flex-1" variant="secondary">
                <Link href={appRoutes.teacher.analytics}>View in analytics</Link>
              </Button>
              <Button asChild className="md:flex-1" variant="ghost">
                <Link href={appRoutes.teacher.dashboard}>Open dashboard</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
