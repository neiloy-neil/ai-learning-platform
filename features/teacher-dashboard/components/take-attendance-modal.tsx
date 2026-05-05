
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

export default function TakeAttendanceModal({ students, onClose }: { students: any[], onClose: () => void }) {
  const [attendance, setAttendance] = useState<any>({});

  const handleAttendanceChange = (studentId: string, status: string) => {
    setAttendance(prev => ({ ...prev, [studentId]: status }));
  };

  const handleSaveAttendance = () => {
    // Here you would typically make an API call to save the attendance data.
    console.log('Attendance saved:', attendance);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-background p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Take Attendance</h2>
          </div>
          <Button variant="ghost" onClick={onClose}>✕</Button>
        </div>

        <div className="mt-6 space-y-4">
          {students.map(student => (
            <div key={student.id} className="flex items-center justify-between">
              <p>{student.name}</p>
              <Select onValueChange={(status) => handleAttendanceChange(student.id, status)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="present">Present</SelectItem>
                  <SelectItem value="absent">Absent</SelectItem>
                  <SelectItem value="late">Late</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSaveAttendance}>Save Attendance</Button>
        </div>
      </div>
    </div>
  );
}
