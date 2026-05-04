'use client';

import { useState } from 'react';
import { Calendar, Clock, Users, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { classes } from '@/lib/db/enrolment-data';
import { EnrolmentClass } from '@/lib/pcdc-types';
import { cn } from '@/lib/cn';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const timeSlots = [
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
  '6:00 PM',
];

export default function ClassScheduleCalendar() {
  const [selectedClass, setSelectedClass] = useState<EnrolmentClass | null>(null);

  // Organize classes by day
  const classesByDay: Record<string, EnrolmentClass[]> = {};
  daysOfWeek.forEach(day => {
    classesByDay[day] = classes.filter(c => c.dayOfWeek === day);
  });

  const getOccupancyColor = (enrolled: number, capacity: number) => {
    const rate = (enrolled / capacity) * 100;
    if (rate >= 90) return 'bg-danger/20 border-danger/50 text-danger';
    if (rate >= 70) return 'bg-warning/20 border-warning/50 text-warning';
    return 'bg-success/20 border-success/50 text-success';
  };

  const getOccupancyBadge = (enrolled: number, capacity: number) => {
    const rate = ((enrolled / capacity) * 100).toFixed(0);
    return `${enrolled}/${capacity} (${rate}%)`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel-strong overflow-hidden px-6 py-5">
        <div className="flex items-start justify-between">
          <div>
            <span className="eyebrow">Weekly Schedule</span>
            <h1 className="text-3xl font-semibold">Class Schedule Calendar</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Visual weekly timetable for all classes
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" className="gap-2">
              <ChevronLeft className="size-4" />
              Previous Week
            </Button>
            <Button variant="secondary" className="gap-2">
              Current Week
            </Button>
            <Button variant="secondary" className="gap-2">
              Next Week
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Schedule Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Weekly Timetable</span>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded bg-success/40" />
                <span>Available {'(< 70%)'}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded bg-warning/40" />
                <span>Filling {'(70-90%)'}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded bg-danger/40" />
                <span>Full {'(> 90%)'}</span>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-[1200px]">
              {/* Day Headers */}
              <div className="mb-4 grid grid-cols-7 gap-2">
                {daysOfWeek.map(day => (
                  <div
                    key={day}
                    className="rounded-lg bg-primary/10 p-3 text-center"
                  >
                    <p className="font-semibold text-primary">{day}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {classesByDay[day].length} class{classesByDay[day].length !== 1 ? 'es' : ''}
                    </p>
                  </div>
                ))}
              </div>

              {/* Classes by Day */}
              <div className="space-y-6">
                {daysOfWeek.map(day => {
                  const dayClasses = classesByDay[day];

                  if (dayClasses.length === 0) return null;

                  return (
                    <div key={day} className="space-y-2">
                      <h3 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                        <Calendar className="size-4" />
                        {day}
                      </h3>
                      <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
                        {dayClasses
                          .sort((a, b) => {
                            const timeA = parseInt(a.startTime.split(':')[0]);
                            const timeB = parseInt(b.startTime.split(':')[0]);
                            return timeA - timeB;
                          })
                          .map(cls => (
                            <Card
                              key={cls.id}
                              className={cn(
                                'cursor-pointer transition-all hover:shadow-lg',
                                getOccupancyColor(cls.enrolledCount, cls.maxCapacity)
                              )}
                              onClick={() => setSelectedClass(cls)}
                            >
                              <CardContent className="p-4">
                                <div className="space-y-3">
                                  <div>
                                    <p className="font-semibold">{cls.name}</p>
                                    <p className="text-sm text-muted-foreground">{cls.teacherName}</p>
                                  </div>

                                  <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div className="flex items-center gap-1">
                                      <Clock className="size-3" />
                                      <span>{cls.startTime} - {cls.endTime}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Users className="size-3" />
                                      <span>{getOccupancyBadge(cls.enrolledCount, cls.maxCapacity)}</span>
                                    </div>
                                    {cls.roomId && (
                                      <div className="flex items-center gap-1">
                                        <MapPin className="size-3" />
                                        <span>{cls.roomId}</span>
                                      </div>
                                    )}
                                  </div>

                                  <Badge
                                    variant="outline"
                                    className={cn(
                                      'w-full justify-center',
                                      getOccupancyColor(cls.enrolledCount, cls.maxCapacity)
                                    )}
                                  >
                                    {cls.level} • {cls.subject}
                                  </Badge>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-4xl font-semibold text-primary">
                {classes.length}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">Total Classes</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-4xl font-semibold text-success">
                {daysOfWeek.filter(day => classesByDay[day].length > 0).length}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">Active Days</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-4xl font-semibold text-blue-500">
                {classes.reduce((sum, c) => sum + c.enrolledCount, 0)}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">Total Students</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-4xl font-semibold text-purple-500">
                {classes.reduce((sum, c) => sum + c.waitlistCount, 0)}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">Waitlisted</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Class Detail Modal */}
      {selectedClass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-2xl rounded-lg bg-background p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-semibold">{selectedClass.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {selectedClass.level} • {selectedClass.subject}
                </p>
              </div>
              <Button variant="ghost" onClick={() => setSelectedClass(null)}>
                ✕
              </Button>
            </div>

            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Teacher</p>
                  <p className="font-medium">{selectedClass.teacherName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Day & Time</p>
                  <p className="font-medium">
                    {selectedClass.dayOfWeek} {selectedClass.startTime} - {selectedClass.endTime}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Room</p>
                  <p className="font-medium">{selectedClass.roomId || 'TBD'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Enrolment</p>
                  <p className="font-medium">
                    {selectedClass.enrolledCount} / {selectedClass.maxCapacity} students
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Description</p>
                <p className="mt-1">{selectedClass.description}</p>
              </div>

              <div className="flex gap-2 pt-4">
                <Button className="flex-1">View Enrolments</Button>
                <Button variant="secondary" className="flex-1">Edit Class</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
