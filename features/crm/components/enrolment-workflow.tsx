'use client';

import { useState } from 'react';
import { UserPlus, RefreshCw, UserX, Search, CheckCircle, AlertCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { students } from '@/lib/db/crm-data';
import { classes } from '@/lib/db/enrolment-data';
import { cn } from '@/lib/cn';

type WorkflowType = 'enrol' | 'change' | 'withdraw' | null;

export default function EnrolmentWorkflow() {
  const [activeWorkflow, setActiveWorkflow] = useState<WorkflowType>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [step, setStep] = useState(1);

  const filteredStudents = searchQuery
    ? students.filter(s =>
        `${s.firstName} ${s.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const availableClasses = classes.filter(c => c.status === 'active' && c.enrolledCount < c.maxCapacity);

  const resetWorkflow = () => {
    setActiveWorkflow(null);
    setSearchQuery('');
    setSelectedStudent(null);
    setSelectedClass(null);
    setStep(1);
  };

  return (
    <div className="space-y-6">
      {/* Workflow Selection */}
      {!activeWorkflow && (
        <div className="glass-panel-strong overflow-hidden px-6 py-5">
          <div>
            <span className="eyebrow">Enrolment Management</span>
            <h1 className="text-3xl font-semibold">Enrolment Workflow</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Enrol students, change classes, or process withdrawals
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Card
              className="cursor-pointer transition-all hover:border-primary hover:shadow-lg"
              onClick={() => setActiveWorkflow('enrol')}
            >
              <CardContent className="p-6 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
                  <UserPlus className="size-8 text-success" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">Enrol Student</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Add a new student to a class
                </p>
                <Button className="mt-4 w-full">Start Enrolment</Button>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer transition-all hover:border-primary hover:shadow-lg"
              onClick={() => setActiveWorkflow('change')}
            >
              <CardContent className="p-6 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <RefreshCw className="size-8 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">Change Class</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Transfer student to different class
                </p>
                <Button className="mt-4 w-full" variant="secondary">Change Class</Button>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer transition-all hover:border-primary hover:shadow-lg"
              onClick={() => setActiveWorkflow('withdraw')}
            >
              <CardContent className="p-6 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-danger/10">
                  <UserX className="size-8 text-danger" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">Withdraw Student</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Remove student from class
                </p>
                <Button className="mt-4 w-full" variant="danger">Withdraw</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Enrol Student Workflow */}
      {activeWorkflow === 'enrol' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="size-5 text-success" />
                Enrol Student in Class
              </CardTitle>
              <Button variant="ghost" onClick={resetWorkflow}>✕</Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Progress Steps */}
            <div className="mb-6 flex items-center gap-2">
              {[1, 2, 3].map(s => (
                <div key={s} className="flex items-center gap-2">
                  <div className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold',
                    step >= s ? 'bg-success text-white' : 'bg-muted text-muted-foreground'
                  )}>
                    {s}
                  </div>
                  <span className="text-sm">
                    {s === 1 ? 'Select Student' : s === 2 ? 'Choose Class' : 'Confirm'}
                  </span>
                  {s < 3 && <div className="h-px w-12 bg-muted" />}
                </div>
              ))}
            </div>

            {step === 1 && (
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search students by name..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {searchQuery && filteredStudents.length > 0 ? (
                  <div className="space-y-2">
                    {filteredStudents.slice(0, 5).map(student => (
                      <div
                        key={student.id}
                        className="flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-all hover:border-primary"
                        onClick={() => {
                          setSelectedStudent(student);
                          setStep(2);
                        }}
                      >
                        <div>
                          <p className="font-semibold">{student.firstName} {student.lastName}</p>
                          <p className="text-sm text-muted-foreground">{student.grade} • {student.school}</p>
                        </div>
                        <Badge>{student.status}</Badge>
                      </div>
                    ))}
                  </div>
                ) : searchQuery && (
                  <div className="py-8 text-center text-muted-foreground">
                    No students found
                  </div>
                )}
              </div>
            )}

            {step === 2 && selectedStudent && (
              <div className="space-y-4">
                <div className="rounded-lg bg-primary/5 p-4">
                  <p className="font-semibold">Selected Student</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedStudent.firstName} {selectedStudent.lastName} • {selectedStudent.grade}
                  </p>
                </div>

                <h3 className="font-semibold">Available Classes</h3>
                <div className="space-y-2">
                  {availableClasses.map(cls => (
                    <div
                      key={cls.id}
                      className="flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-all hover:border-primary"
                      onClick={() => {
                        setSelectedClass(cls);
                        setStep(3);
                      }}
                    >
                      <div>
                        <p className="font-semibold">{cls.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {cls.dayOfWeek} {cls.startTime} - {cls.endTime} • {cls.teacherName}
                        </p>
                      </div>
                      <Badge className="bg-success/20 text-success">
                        {cls.enrolledCount}/{cls.maxCapacity} spots
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && selectedStudent && selectedClass && (
              <div className="space-y-6">
                <div className="rounded-lg bg-success/5 p-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="size-5 text-success" />
                    <h3 className="font-semibold text-success">Ready to Enrol</h3>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Student</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="font-semibold">{selectedStudent.firstName} {selectedStudent.lastName}</p>
                      <p className="text-sm text-muted-foreground">{selectedStudent.grade}</p>
                      <p className="text-sm text-muted-foreground">{selectedStudent.school}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Class</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="font-semibold">{selectedClass.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedClass.dayOfWeek} {selectedClass.startTime} - {selectedClass.endTime}
                      </p>
                      <p className="text-sm text-muted-foreground">{selectedClass.teacherName}</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1" onClick={() => {
                    alert('Enrolment successful!');
                    resetWorkflow();
                  }}>
                    <CheckCircle className="mr-2 size-4" />
                    Confirm Enrolment
                  </Button>
                  <Button variant="secondary" onClick={() => setStep(2)}>
                    Back
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Change Class Workflow */}
      {activeWorkflow === 'change' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="size-5 text-primary" />
                Change Student's Class
              </CardTitle>
              <Button variant="ghost" onClick={resetWorkflow}>✕</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg bg-warning/5 p-4">
                <div className="flex items-center gap-2">
                  <AlertCircle className="size-5 text-warning" />
                  <p className="text-sm">
                    This will permanently transfer the student to a new class
                  </p>
                </div>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search for student to transfer..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <p className="text-center text-sm text-muted-foreground">
                Select a student to view their current class and available options
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Withdraw Student Workflow */}
      {activeWorkflow === 'withdraw' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <UserX className="size-5 text-danger" />
                Withdraw Student from Class
              </CardTitle>
              <Button variant="ghost" onClick={resetWorkflow}>✕</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg bg-danger/5 p-4">
                <div className="flex items-center gap-2">
                  <AlertCircle className="size-5 text-danger" />
                  <p className="text-sm text-danger">
                    This action will remove the student from their current class
                  </p>
                </div>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search for enrolled student..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <p className="text-center text-sm text-muted-foreground">
                Select a student to process their withdrawal
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
