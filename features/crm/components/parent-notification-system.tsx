'use client';

import { useState } from 'react';
import { Bell, Mail, MessageSquare, Send, AlertCircle, CheckCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { attendanceRecords } from '@/lib/db/attendance-data';
import { AttendanceStatus } from '@/lib/pcdc-types';
import { generateAbsenceNotification } from '@/lib/db/observations-data';
import { cn } from '@/lib/cn';

interface Notification {
  id: string;
  studentName: string;
  parentEmail: string;
  parentPhone: string;
  className: string;
  date: Date;
  status: 'sent' | 'pending' | 'failed';
  type: 'email' | 'sms' | 'both';
  message: string;
  sentAt?: Date;
}

export default function ParentNotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedAbsence, setSelectedAbsence] = useState<any>(null);
  const [showCompose, setShowCompose] = useState(false);

  // Get today's absences
  const today = new Date();
  const todayAbsences = attendanceRecords.filter(
    record =>
      record.date.toDateString() === today.toDateString() &&
      record.status === AttendanceStatus.ABSENT
  );

  const pendingNotifications = todayAbsences.filter(
    absence => !notifications.some(n => n.studentName === absence.studentName)
  );

  const handleSendNotification = (absence: any, type: 'email' | 'sms' | 'both') => {
    const notification: Notification = {
      id: `notif-${Date.now()}`,
      studentName: absence.studentName,
      parentEmail: 'parent@example.com',
      parentPhone: '+61 400 000 000',
      className: absence.className,
      date: absence.date,
      status: 'sent',
      type,
      message: generateAbsenceNotification(
        absence.studentName,
        absence.className,
        absence.date,
        'Parent'
      ),
      sentAt: new Date(),
    };

    setNotifications(prev => [...prev, notification]);
    setShowCompose(false);
    setSelectedAbsence(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel-strong overflow-hidden px-6 py-5">
        <div className="flex items-start justify-between">
          <div>
            <span className="eyebrow">Communication</span>
            <h1 className="text-3xl font-semibold">Parent Notifications</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Automated absence alerts and parent communication
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Today's Absences</p>
                <p className="mt-2 text-3xl font-semibold">{todayAbsences.length}</p>
              </div>
              <div className="rounded-lg bg-danger/10 p-3">
                <AlertCircle className="size-5 text-danger" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Notifications</p>
                <p className="mt-2 text-3xl font-semibold">{pendingNotifications.length}</p>
              </div>
              <div className="rounded-lg bg-warning/10 p-3">
                <Bell className="size-5 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Notifications Sent</p>
                <p className="mt-2 text-3xl font-semibold">{notifications.length}</p>
              </div>
              <div className="rounded-lg bg-success/10 p-3">
                <CheckCircle className="size-5 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Notifications */}
      {pendingNotifications.length > 0 && (
        <Card className="border-warning/50 bg-warning/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-warning">
              <Bell className="size-5" />
              Pending Absence Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingNotifications.map(absence => (
                <div key={absence.id} className="rounded-lg border border-warning/20 bg-background p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold">{absence.studentName}</p>
                      <p className="text-sm text-muted-foreground">{absence.className}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {absence.notes && `📝 ${absence.notes}`}
                      </p>
                    </div>
                    <Button size="sm" onClick={() => {
                      setSelectedAbsence(absence);
                      setShowCompose(true);
                    }}>
                      Send Notification
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Compose Notification Modal */}
      {showCompose && selectedAbsence && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-2xl rounded-lg bg-background p-6">
            <div className="flex items-start justify-between">
              <h2 className="text-2xl font-semibold">Send Absence Notification</h2>
              <Button variant="ghost" onClick={() => setShowCompose(false)}>✕</Button>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-lg bg-primary/5 p-4">
                <p className="font-semibold">{selectedAbsence.studentName}</p>
                <p className="text-sm text-muted-foreground">{selectedAbsence.className}</p>
                <p className="text-sm text-muted-foreground">
                  Date: {selectedAbsence.date.toLocaleDateString()}
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Message Preview</label>
                <div className="whitespace-pre-wrap rounded-lg border bg-muted p-4 text-sm">
                  {generateAbsenceNotification(
                    selectedAbsence.studentName,
                    selectedAbsence.className,
                    selectedAbsence.date,
                    'Parent'
                  )}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Send Via</label>
                <div className="flex gap-3">
                  <Button
                    className="flex-1 gap-2"
                    onClick={() => handleSendNotification(selectedAbsence, 'email')}
                  >
                    <Mail className="size-4" />
                    Email Only
                  </Button>
                  <Button
                    className="flex-1 gap-2"
                    onClick={() => handleSendNotification(selectedAbsence, 'sms')}
                  >
                    <MessageSquare className="size-4" />
                    SMS Only
                  </Button>
                  <Button
                    className="flex-1 gap-2"
                    onClick={() => handleSendNotification(selectedAbsence, 'both')}
                  >
                    <Send className="size-4" />
                    Both
                  </Button>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="secondary" onClick={() => setShowCompose(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sent Notifications History */}
      {notifications.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Sent Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {notifications.map(notification => (
                <div key={notification.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="font-medium">{notification.studentName}</p>
                    <p className="text-sm text-muted-foreground">
                      {notification.className} • {notification.date.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={cn(
                      notification.type === 'email' ? 'bg-blue-500/20 text-blue-500' :
                      notification.type === 'sms' ? 'bg-purple-500/20 text-purple-500' : 'bg-primary/20 text-primary'
                    )}>
                      {notification.type === 'email' ? '📧 Email' :
                       notification.type === 'sms' ? '📱 SMS' : '📧📱 Both'}
                    </Badge>
                    <Badge className="bg-success/20 text-success">
                      ✓ Sent
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
