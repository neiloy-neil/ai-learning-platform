'use client';

import { useState } from 'react';

import PageHeader from '@/components/layout/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { useDemoData } from '@/features/demo/components/demo-data-provider';

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
    </div>
  );
}
