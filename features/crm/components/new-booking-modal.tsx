
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { diagnosticBookings, students, timeSlots } from '@/lib/db/crm-data';
import { notifications } from '@/lib/db/data';

export default function NewBookingModal({ onClose }: { onClose: () => void }) {
  const [studentId, setStudentId] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');

  const handleBooking = () => {
    const newBooking = {
      id: `booking${diagnosticBookings.length + 1}`,
      studentId,
      studentName: students.find(s => s.id === studentId)?.firstName + ' ' + students.find(s => s.id === studentId)?.lastName,
      parentName: students.find(s => s.id === studentId)?.parentName,
      parentEmail: students.find(s => s.id === studentId)?.parentEmail,
      parentPhone: students.find(s => s.id === studentId)?.parentPhone,
      studentGrade: students.find(s => s.id === studentId)?.grade,
      date: new Date(date),
      timeSlot,
      duration: 60,
      status: 'scheduled',
    };

    // @ts-ignore
    diagnosticBookings.push(newBooking);

    const parent = students.find(s => s.id === studentId)?.parent;
    if (parent) {
        notifications.push({
            id: `notif${notifications.length + 1}`,
            userId: parent.id,
            text: `A new diagnostic assessment has been booked for ${newBooking.studentName} on ${newBooking.date.toLocaleDateString()} at ${newBooking.timeSlot}`,
            read: false,
            createdAt: new Date(),
        });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-background p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-semibold">New Diagnostic Booking</h2>
          </div>
          <Button variant="ghost" onClick={onClose}>✕</Button>
        </div>

        <div className="mt-6 space-y-6">
          <Select onValueChange={setStudentId}>
            <SelectTrigger>
              <SelectValue placeholder="Select Student" />
            </SelectTrigger>
            <SelectContent>
              {students.map(student => (
                <SelectItem key={student.id} value={student.id}>{student.firstName} {student.lastName}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

          <Select onValueChange={setTimeSlot}>
            <SelectTrigger>
              <SelectValue placeholder="Select Time Slot" />
            </SelectTrigger>
            <SelectContent>
              {timeSlots.map(slot => (
                <SelectItem key={slot.id} value={slot.time}>{slot.time}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleBooking}>Confirm Booking</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
