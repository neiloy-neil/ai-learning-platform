
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { classes } from '@/lib/db/enrolment-data';
import { attendanceRecords, homeworkSubmissions } from '@/lib/db/attendance-data';
import { studentAttempts } from '@/lib/db/data';
import { mockAssessments } from '@/lib/mock-data';

export default function ClassReadinessReportView() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Class Readiness Report</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Upcoming Classes</h3>
          <div className="space-y-3">
            {classes.slice(0, 3).map(cls => (
              <div key={cls.id} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="font-medium">{cls.name}</p>
                  <p className="text-sm text-muted-foreground">{cls.day} at {cls.time}</p>
                </div>
                <p className="text-sm">{cls.students.length} students</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Attendance Expectations</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">{attendanceRecords.filter(r => r.status === 'present').length}</p>
              <p className="text-xs text-muted-foreground">Present</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{attendanceRecords.filter(r => r.status === 'absent').length}</p>
              <p className="text-xs text-muted-foreground">Absent</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{attendanceRecords.filter(r => r.status === 'late').length}</p>
              <p className="text-xs text-muted-foreground">Late</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Homework Submission Rates</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">{homeworkSubmissions.filter(s => s.status === 'submitted').length}</p>
              <p className="text-xs text-muted-foreground">Submitted</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{homeworkSubmissions.filter(s => s.status === 'overdue').length}</p>
              <p className="text-xs text-muted-foreground">Overdue</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{homeworkSubmissions.filter(s => s.status === 'graded').length}</p>
              <p className="text-xs text-muted-foreground">Graded</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Assessment Completion Status</h3>
          <div className="space-y-2">
            {mockAssessments.slice(0, 3).map(assessment => {
              const attempts = studentAttempts.filter(a => (a as any).assessmentId === assessment.id);
              const completionRate = (attempts.length / classes.reduce((acc, cls) => acc + cls.students.length, 0)) * 100;
              return (
                <div key={assessment.id}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <p className="font-medium">{assessment.title}</p>
                    <p className="font-semibold">{Math.round(completionRate)}% complete</p>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${completionRate}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
