'use client';

import { useState } from 'react';
import {
  Calendar, CheckCircle, Clock, AlertCircle, BookOpen,
  Users, FileText, MessageSquare, TrendingUp, Play
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/cn';

const workflowSteps = [
  {
    id: 1,
    title: 'Weekly Assessment Assigned',
    description: 'System assigns weekly assessment to students',
    icon: FileText,
    color: 'bg-blue-500',
  },
  {
    id: 2,
    title: 'Incomplete Reminders Sent',
    description: 'Automated reminders for incomplete assessments',
    icon: MessageSquare,
    color: 'bg-yellow-500',
  },
  {
    id: 3,
    title: 'Teacher Receives Class Readiness Report',
    description: 'Teacher gets overview of student preparation',
    icon: TrendingUp,
    color: 'bg-purple-500',
  },
  {
    id: 4,
    title: 'Class Occurs',
    description: 'Regular class session',
    icon: Users,
    color: 'bg-primary',
  },
  {
    id: 5,
    title: 'Attendance Recorded',
    description: 'Teacher marks student attendance',
    icon: CheckCircle,
    color: 'bg-green-500',
  },
  {
    id: 6,
    title: 'Homework Status Recorded',
    description: 'Track submitted/not submitted homework',
    icon: BookOpen,
    color: 'bg-indigo-500',
  },
  {
    id: 7,
    title: 'Teacher Observations Recorded',
    description: 'Teacher notes on student performance',
    icon: FileText,
    color: 'bg-pink-500',
  },
  {
    id: 8,
    title: 'Make-up Workflow Triggered',
    description: 'Absent students receive make-up session options',
    icon: Calendar,
    color: 'bg-orange-500',
  },
  {
    id: 9,
    title: 'Post-class Tasks Assigned',
    description: 'Additional practice or enrichment tasks',
    icon: Clock,
    color: 'bg-teal-500',
  },
  {
    id: 10,
    title: 'Progress Data Updated',
    description: 'All data consolidated and progress tracked',
    icon: TrendingUp,
    color: 'bg-success',
  },
];

export default function WeeklyClassWorkflow() {
  const [selectedClass, setSelectedClass] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [workflowStarted, setWorkflowStarted] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleStartWorkflow = () => {
    setWorkflowStarted(true);
    setCurrentStep(1);
  };

  const handleCompleteStep = (stepId: number) => {
    setCompletedSteps(prev => [...prev, stepId]);
    if (stepId < 10) {
      setCurrentStep(stepId + 1);
    } else {
      // Workflow complete
      setTimeout(() => {
        setWorkflowStarted(false);
        setCurrentStep(0);
        setCompletedSteps([]);
      }, 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel-strong overflow-hidden px-6 py-5">
        <div className="flex items-start justify-between">
          <div>
            <span className="eyebrow">Automation</span>
            <h1 className="text-3xl font-semibold">Weekly Class Workflow</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Automated 10-step workflow for each class session
            </p>
          </div>
        </div>
      </div>

      {/* Class Selection */}
      {!workflowStarted && (
        <Card>
          <CardHeader>
            <CardTitle>Start Weekly Workflow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">Select Class</label>
                <select
                  value={selectedClass}
                  onChange={e => setSelectedClass(e.target.value)}
                  className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="" className="bg-slate-900">Choose a class...</option>
                  <option value="class-1" className="bg-slate-900">Year 3 Mathematics - Monday 4:00 PM</option>
                  <option value="class-2" className="bg-slate-900">Year 3 Mathematics - Wednesday 4:00 PM</option>
                  <option value="class-3" className="bg-slate-900">Year 5 Advanced Mathematics</option>
                  <option value="class-4" className="bg-slate-900">Year 1 Literacy Foundation</option>
                  <option value="class-6" className="bg-slate-900">Year 6 NAPLAN Preparation</option>
                </select>
              </div>

              <Button
                className="w-full gap-2"
                onClick={handleStartWorkflow}
                disabled={!selectedClass}
              >
                <Play className="size-4" />
                Start Workflow
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Workflow Progress */}
      {workflowStarted && (
        <>
          {/* Progress Bar */}
          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-medium">Workflow Progress</span>
                <span className="text-sm text-muted-foreground">
                  {completedSteps.length}/10 steps completed
                </span>
              </div>
              <div className="h-3 rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-success transition-all"
                  style={{ width: `${(completedSteps.length / 10) * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Workflow Steps */}
          <div className="space-y-3">
            {workflowSteps.map((step) => {
              const isCompleted = completedSteps.includes(step.id);
              const isCurrent = currentStep === step.id;
              const Icon = step.icon;

              return (
                <Card
                  key={step.id}
                  className={cn(
                    'transition-all',
                    isCompleted && 'border-success/50 bg-success/5',
                    isCurrent && 'border-primary shadow-lg'
                  )}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-full',
                        isCompleted ? 'bg-success text-white' :
                        isCurrent ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                      )}>
                        {isCompleted ? <CheckCircle className="size-5" /> : <Icon className="size-5" />}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className={cn(
                              'font-semibold',
                              isCompleted && 'text-success'
                            )}>
                              Step {step.id}: {step.title}
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {step.description}
                            </p>
                          </div>
                          {isCurrent && (
                            <Button
                              size="sm"
                              onClick={() => handleCompleteStep(step.id)}
                            >
                              Complete
                            </Button>
                          )}
                          {isCompleted && (
                            <Badge className="bg-success/20 text-success">
                              ✓ Completed
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Workflow Complete Message */}
          {completedSteps.length === 10 && (
            <Card className="border-success/50 bg-success/5">
              <CardContent className="p-6 text-center">
                <CheckCircle className="mx-auto mb-4 size-12 text-success" />
                <h3 className="text-xl font-semibold text-success">Workflow Complete!</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  All 10 steps have been completed. Progress data has been updated.
                </p>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {/* Workflow History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Workflow Executions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { class: 'Year 3 Math - Monday', date: 'May 4, 2026', status: 'completed', steps: 10 },
              { class: 'Year 5 Advanced Math', date: 'May 4, 2026', status: 'completed', steps: 10 },
              { class: 'Year 1 Literacy', date: 'May 3, 2026', status: 'completed', steps: 10 },
            ].map((execution, index) => (
              <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="font-medium">{execution.class}</p>
                  <p className="text-sm text-muted-foreground">{execution.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">
                    {execution.steps}/10 steps
                  </span>
                  <Badge className="bg-success/20 text-success">
                    ✓ Complete
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
