'use client';

import { useState } from 'react';
import {
  Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock,
  Users, CheckCircle, XCircle, AlertCircle, Search
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { diagnosticBookings, timeSlots } from '@/lib/db/crm-data';
import { DiagnosticBooking } from '@/lib/pcdc-types';
import { cn } from '@/lib/cn';

export default function DiagnosticBookingCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date('2026-05-10'));
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<DiagnosticBooking | null>(null);
  const [view, setView] = useState<'calendar' | 'list'>('calendar');

  // Filter bookings
  const filteredBookings = searchQuery
    ? diagnosticBookings.filter(
        b =>
          b.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.parentName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : diagnosticBookings;

  // Get slots for selected date
  const slotsForDate = timeSlots.filter(
    slot => slot.date.toDateString() === selectedDate.toDateString()
  );

  // Get bookings for selected date
  const bookingsForDate = filteredBookings.filter(
    b => b.date.toDateString() === selectedDate.toDateString()
  );

  // Navigate dates
  const goToNextDay = () => {
    const next = new Date(selectedDate);
    next.setDate(next.getDate() + 1);
    setSelectedDate(next);
  };

  const goToPrevDay = () => {
    const prev = new Date(selectedDate);
    prev.setDate(prev.getDate() - 1);
    setSelectedDate(prev);
  };

  const getStatusBadge = (status: string) => {
    const config: Record<string, { label: string; color: string }> = {
      scheduled: { label: 'Scheduled', color: 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30' },
      completed: { label: 'Completed', color: 'bg-green-500/20 text-green-600 border-green-500/30' },
      cancelled: { label: 'Cancelled', color: 'bg-red-500/20 text-red-600 border-red-500/30' },
      'no-show': { label: 'No Show', color: 'bg-gray-500/20 text-gray-600 border-gray-500/30' },
    };
    const { label, color } = config[status] || { label: status, color: 'bg-muted' };
    return <Badge className={cn('border', color)}>{label}</Badge>;
  };

  const getOccupancyColor = (booked: number, capacity: number) => {
    const percentage = booked / capacity;
    if (percentage >= 1) return 'text-red-600';
    if (percentage >= 0.66) return 'text-yellow-600';
    return 'text-green-600';
  };

  // Metrics
  const totalBookings = diagnosticBookings.length;
  const completedBookings = diagnosticBookings.filter(b => b.status === 'completed').length;
  const scheduledBookings = diagnosticBookings.filter(b => b.status === 'scheduled').length;
  const completionRate = totalBookings > 0 ? ((completedBookings / totalBookings) * 100).toFixed(0) : '0';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel-strong overflow-hidden px-6 py-5">
        <div className="flex items-start justify-between">
          <div>
            <span className="eyebrow">Diagnostic Assessments</span>
            <h1 className="text-3xl font-semibold">Booking Calendar</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Schedule and manage diagnostic assessment sessions
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" onClick={() => setView(view === 'calendar' ? 'list' : 'calendar')}>
              {view === 'calendar' ? 'List View' : 'Calendar View'}
            </Button>
            <Button>New Booking</Button>
          </div>
        </div>
      </div>

      {/* Quick Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Bookings</p>
                <p className="mt-2 text-3xl font-semibold">{totalBookings}</p>
              </div>
              <div className="rounded-lg bg-blue-500/10 p-3">
                <CalendarIcon className="size-5 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Scheduled</p>
                <p className="mt-2 text-3xl font-semibold">{scheduledBookings}</p>
              </div>
              <div className="rounded-lg bg-yellow-500/10 p-3">
                <Clock className="size-5 text-yellow-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="mt-2 text-3xl font-semibold">{completedBookings}</p>
              </div>
              <div className="rounded-lg bg-green-500/10 p-3">
                <CheckCircle className="size-5 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completion Rate</p>
                <p className="mt-2 text-3xl font-semibold">{completionRate}%</p>
              </div>
              <div className="rounded-lg bg-purple-500/10 p-3">
                <AlertCircle className="size-5 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search bookings by student or parent name..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {view === 'calendar' ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Calendar View */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button variant="secondary" size="sm" onClick={goToPrevDay}>
                    <ChevronLeft className="size-4" />
                  </Button>
                  <span className="text-lg">
                    {selectedDate.toLocaleDateString('en-AU', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                  <Button variant="secondary" size="sm" onClick={goToNextDay}>
                    <ChevronRight className="size-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {slotsForDate.length > 0 ? (
                  slotsForDate.map(slot => {
                    const slotBookings = bookingsForDate.filter(
                      b => b.timeSlot === slot.time
                    );

                    return (
                      <div
                        key={slot.id}
                        className={cn(
                          'flex items-center justify-between rounded-lg border p-3',
                          slot.isAvailable ? 'bg-background' : 'bg-muted/50'
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <Clock className="size-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{slot.time}</p>
                            <p className="text-xs text-muted-foreground">
                              60 minutes
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Users className="size-4 text-muted-foreground" />
                            <span
                              className={cn(
                                'text-sm font-medium',
                                getOccupancyColor(slot.bookedCount, slot.maxCapacity)
                              )}
                            >
                              {slot.bookedCount}/{slot.maxCapacity}
                            </span>
                          </div>
                          <Badge
                            className={cn(
                              slot.isAvailable
                                ? 'bg-green-500/20 text-green-600'
                                : 'bg-red-500/20 text-red-600'
                            )}
                          >
                            {slot.isAvailable ? 'Available' : 'Full'}
                          </Badge>
                        </div>

                        {slotBookings.length > 0 && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setSelectedBooking(slotBookings[0])}
                          >
                            View
                          </Button>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="py-12 text-center">
                    <CalendarIcon className="mx-auto mb-3 size-12 text-muted-foreground" />
                    <p className="text-muted-foreground">No slots available for this date</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Today's Bookings */}
          <Card>
            <CardHeader>
              <CardTitle>Bookings for Selected Date</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {bookingsForDate.length > 0 ? (
                  bookingsForDate.map(booking => (
                    <div
                      key={booking.id}
                      className="cursor-pointer rounded-lg border p-4 transition-all hover:border-primary hover:shadow-md"
                      onClick={() => setSelectedBooking(booking)}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold">{booking.studentName}</p>
                          <p className="text-sm text-muted-foreground">
                            {booking.studentGrade} • Parent: {booking.parentName}
                          </p>
                        </div>
                        {getStatusBadge(booking.status)}
                      </div>

                      <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="size-4" />
                          <span>{booking.timeSlot}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="size-4" />
                          <span>{booking.duration} min</span>
                        </div>
                      </div>

                      {booking.score && (
                        <div className="mt-2">
                          <Badge className="bg-success/20 text-success">
                            Score: {booking.score}%
                          </Badge>
                          {booking.recommendedLevel && (
                            <Badge className="ml-2 bg-primary/20 text-primary">
                              {booking.recommendedLevel}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="py-12 text-center">
                    <CalendarIcon className="mx-auto mb-3 size-12 text-muted-foreground" />
                    <p className="text-muted-foreground">No bookings for this date</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        /* List View */
        <Card>
          <CardHeader>
            <CardTitle>All Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredBookings.map(booking => (
                <div
                  key={booking.id}
                  className="cursor-pointer rounded-lg border p-4 transition-all hover:border-primary hover:shadow-md"
                  onClick={() => setSelectedBooking(booking)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="rounded-lg bg-blue-500/10 p-2">
                        <CalendarIcon className="size-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="font-semibold">{booking.studentName}</p>
                        <p className="text-sm text-muted-foreground">
                          {booking.studentGrade} • {booking.parentName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {booking.parentEmail} • {booking.parentPhone}
                        </p>
                      </div>
                    </div>
                    {getStatusBadge(booking.status)}
                  </div>

                  <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="size-4" />
                      <span>
                        {booking.date.toLocaleDateString('en-AU', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="size-4" />
                      <span>{booking.timeSlot}</span>
                    </div>
                    <span>{booking.duration} min</span>
                  </div>

                  {booking.score && (
                    <div className="mt-2">
                      <Badge className="bg-success/20 text-success">
                        Score: {booking.score}%
                      </Badge>
                      {booking.recommendedLevel && (
                        <Badge className="ml-2 bg-primary/20 text-primary">
                          {booking.recommendedLevel}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-background p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-semibold">{selectedBooking.studentName}</h2>
                <p className="text-sm text-muted-foreground">
                  {selectedBooking.studentGrade} • Booking #{selectedBooking.id}
                </p>
              </div>
              <Button variant="ghost" onClick={() => setSelectedBooking(null)}>
                ✕
              </Button>
            </div>

            <div className="mt-6 space-y-6">
              {/* Status */}
              <div>
                <h3 className="mb-2 text-sm font-semibold text-muted-foreground uppercase">
                  Status
                </h3>
                {getStatusBadge(selectedBooking.status)}
              </div>

              {/* Booking Details */}
              <div>
                <h3 className="mb-2 text-sm font-semibold text-muted-foreground uppercase">
                  Booking Details
                </h3>
                <div className="grid gap-2">
                  <p className="text-sm">
                    <span className="font-medium">Date:</span>{' '}
                    {selectedBooking.date.toLocaleDateString('en-AU', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Time:</span> {selectedBooking.timeSlot}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Duration:</span> {selectedBooking.duration} minutes
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="mb-2 text-sm font-semibold text-muted-foreground uppercase">
                  Parent Contact
                </h3>
                <div className="grid gap-2">
                  <p className="text-sm">
                    <span className="font-medium">Name:</span> {selectedBooking.parentName}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Email:</span> {selectedBooking.parentEmail}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Phone:</span> {selectedBooking.parentPhone}
                  </p>
                </div>
              </div>

              {/* Results */}
              {selectedBooking.score && (
                <div>
                  <h3 className="mb-2 text-sm font-semibold text-muted-foreground uppercase">
                    Assessment Results
                  </h3>
                  <div className="space-y-2">
                    <Badge className="bg-success/20 text-success">Score: {selectedBooking.score}%</Badge>
                    {selectedBooking.recommendedLevel && (
                      <Badge className="ml-2 bg-primary/20 text-primary">
                        {selectedBooking.recommendedLevel}
                      </Badge>
                    )}
                    {selectedBooking.adminNotes && (
                      <p className="mt-2 text-sm">{selectedBooking.adminNotes}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-4">
                {selectedBooking.status === 'scheduled' && (
                  <>
                    <Button className="flex-1">Mark as Completed</Button>
                    <Button variant="danger" className="flex-1">Cancel Booking</Button>
                  </>
                )}
                <Button variant="secondary" className="flex-1">
                  Edit Booking
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
