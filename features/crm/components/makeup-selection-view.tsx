'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/cn';
import {
  Calendar,
  Clock,
  BookOpen,
  Monitor,
  Users,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Info,
} from 'lucide-react';
import { MakeUpOption, AcademicImportance, MissedLessonConcept } from '@/lib/pcdc-types';
import { findAvailableMakeupClasses } from '@/lib/db/observations-data';

interface MakeupOption {
  option: MakeUpOption;
  title: string;
  description: string;
  icon: any;
  color: string;
  suitable: boolean;
}

interface MakeUpSelectionProps {
  studentId: string;
  studentName: string;
  classId: string;
  className: string;
  absenceDate: Date;
  missedConcepts: MissedLessonConcept[];
  academicImportance: AcademicImportance;
  onSelectOption: (option: MakeUpOption, selectedClassId?: string) => void;
}

export default function MakeUpSelectionView({
  studentName,
  className,
  absenceDate,
  missedConcepts,
  academicImportance,
  onSelectOption,
}: MakeUpSelectionProps) {
  const [selectedOption, setSelectedOption] = useState<MakeUpOption | null>(null);
  const [selectedClassId, setSelectedClassId] = useState<string>('');
  const [showOptions, setShowOptions] = useState(false);

  // Get available classes for alternate class option
  const availableClasses = findAvailableMakeupClasses('class-1', 'Year 3');

  const makeupOptions: MakeupOption[] = [
    {
      option: MakeUpOption.ALTERNATE_CLASS,
      title: 'Attend Alternate Class',
      description: 'Join another class at the same level to make up the missed lesson',
      icon: Users,
      color: 'blue',
      suitable: availableClasses.length > 0,
    },
    {
      option: MakeUpOption.BOOKLET_CATCHUP,
      title: 'Booklet Catch-Up',
      description: 'Collect the booklet and complete the work independently at home',
      icon: BookOpen,
      color: 'green',
      suitable: true,
    },
    {
      option: MakeUpOption.AI_TASKS,
      title: 'AI Catch-Up Tasks',
      description: 'Complete personalized AI-generated tasks based on missed concepts',
      icon: Monitor,
      color: 'purple',
      suitable: academicImportance !== AcademicImportance.CRITICAL,
    },
    {
      option: MakeUpOption.TUTOR_SESSION,
      title: '1-on-1 Tutor Session',
      description: 'Schedule a private tutoring session to cover missed material',
      icon: Users,
      color: 'orange',
      suitable: academicImportance === AcademicImportance.CRITICAL,
    },
  ];

  const getImportanceBadge = (importance: AcademicImportance) => {
    const config = {
      [AcademicImportance.CRITICAL]: { label: 'Critical', color: 'bg-red-500/20 text-red-600 border-red-500/30' },
      [AcademicImportance.IMPORTANT]: { label: 'Important', color: 'bg-orange-500/20 text-orange-600 border-orange-500/30' },
      [AcademicImportance.OPTIONAL]: { label: 'Optional', color: 'bg-blue-500/20 text-blue-600 border-blue-500/30' },
    };
    const { label, color } = config[importance];
    return <Badge className={cn('border', color)}>{label}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Absence Information */}
      <Card className="glass-card">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-xl">
            <AlertCircle className="size-5 text-warning" />
            Missed Lesson Details
          </CardTitle>
          <p className="text-sm text-muted-foreground">Information about the absent class and missed concepts</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Student</p>
              <p className="font-semibold text-foreground">{studentName}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Class</p>
              <p className="font-semibold text-foreground">{className}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="font-semibold text-foreground">{absenceDate.toLocaleDateString()}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Academic Importance</p>
              <div>{getImportanceBadge(academicImportance)}</div>
            </div>
          </div>

          {/* Missed Concepts */}
          <div className="rounded-lg bg-muted/50 p-4">
            <p className="mb-2 font-medium text-foreground">Missed Concepts:</p>
            <div className="space-y-2">
              {missedConcepts.map((concept) => (
                <div key={concept.conceptId} className="flex items-start gap-2 rounded-md bg-background/50 p-2">
                  <BookOpen className="mt-0.5 size-4 text-primary" />
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{concept.conceptName}</p>
                    <p className="text-xs text-muted-foreground">
                      Booklet {concept.bookletNumber}
                      {concept.pageNumber && ` • ${concept.pageNumber}`}
                    </p>
                  </div>
                  <Badge
                    className={cn(
                      'border',
                      concept.importance === AcademicImportance.CRITICAL
                        ? 'bg-red-500/20 text-red-600 border-red-500/30'
                        : concept.importance === AcademicImportance.IMPORTANT
                        ? 'bg-orange-500/20 text-orange-600 border-orange-500/30'
                        : 'bg-blue-500/20 text-blue-600 border-blue-500/30'
                    )}
                  >
                    {concept.importance}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {academicImportance === AcademicImportance.CRITICAL && (
            <div className="rounded-lg bg-yellow-500/10 p-3 border border-yellow-500/20">
              <div className="flex items-start gap-2">
                <Info className="mt-0.5 size-4 text-yellow-600" />
                <div>
                  <p className="text-sm font-medium text-yellow-700 dark:text-yellow-400">
                    Important: Independent Check Required
                  </p>
                  <p className="text-xs text-yellow-600 dark:text-yellow-500">
                    This lesson contains critical concepts. An independent check will be required after completion.
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Make-up Options */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-xl">Choose Your Make-up Option</CardTitle>
          <p className="text-sm text-muted-foreground">Select the most convenient way to catch up on missed material</p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {makeupOptions.map(({ option, title, description, icon: Icon, color, suitable }) => (
              <button
                key={option}
                onClick={() => {
                  if (suitable) {
                    setSelectedOption(option);
                    setShowOptions(true);
                  }
                }}
                disabled={!suitable}
                className={cn(
                  'rounded-lg border-2 p-4 text-left transition-all',
                  selectedOption === option
                    ? 'border-primary bg-primary/5'
                    : suitable
                    ? 'border-border bg-card hover:border-primary/50'
                    : 'border-border bg-muted/30 opacity-60 cursor-not-allowed'
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        'rounded-lg p-2',
                        color === 'blue' && 'bg-blue-500/10 text-blue-600',
                        color === 'green' && 'bg-green-500/10 text-green-600',
                        color === 'purple' && 'bg-purple-500/10 text-purple-600',
                        color === 'orange' && 'bg-orange-500/10 text-orange-600'
                      )}
                    >
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                    </div>
                  </div>
                  {!suitable && (
                    <Badge variant="secondary" className="text-xs">
                      Not Available
                    </Badge>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Alternate Class Selection */}
          {selectedOption === MakeUpOption.ALTERNATE_CLASS && showOptions && (
            <div className="mt-6 space-y-4">
              <h4 className="font-medium text-foreground">Select a Class:</h4>
              <div className="grid gap-3 md:grid-cols-2">
                {availableClasses.map((cls) => (
                  <button
                    key={cls.classId}
                    onClick={() => setSelectedClassId(cls.classId)}
                    className={cn(
                      'rounded-lg border-2 p-4 text-left transition-all',
                      selectedClassId === cls.classId
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <Calendar className="size-5 text-primary" />
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{cls.className}</p>
                        <div className="mt-1 flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="size-3" />
                            {cls.day} {cls.time}
                          </span>
                          <span>{cls.availableSeats} seats available</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Confirm Selection */}
          {showOptions && selectedOption && (
            <div className="mt-6">
              <Button
                onClick={() => {
                  if (selectedOption === MakeUpOption.ALTERNATE_CLASS && !selectedClassId) {
                    alert('Please select a class');
                    return;
                  }
                  onSelectOption(selectedOption, selectedClassId || undefined);
                }}
                className="w-full"
                size="lg"
              >
                Confirm Make-up Option
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
