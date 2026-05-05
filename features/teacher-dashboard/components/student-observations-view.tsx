
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { teacherObservations } from '@/lib/db/observations-data';
import { students } from '@/lib/db/crm-data';
import { concepts } from '@/lib/db/data';
import { useState } from 'react';

export default function StudentObservationsView() {
  const [studentId, setStudentId] = useState('');
  const [conceptId, setConceptId] = useState('');
  const [observation, setObservation] = useState('');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Observations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Record Observation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <Select onValueChange={setConceptId}>
              <SelectTrigger>
                <SelectValue placeholder="Select Concept" />
              </SelectTrigger>
              <SelectContent>
                {concepts.map(concept => (
                  <SelectItem key={concept.id} value={concept.id}>{concept.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Textarea
            placeholder="Enter your observation..."
            value={observation}
            onChange={(e) => setObservation(e.target.value)}
          />
          <Button>Record Observation</Button>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Recent Observations</h3>
          <div className="space-y-3">
            {teacherObservations.slice(0, 5).map(obs => (
              <div key={obs.id} className="flex items-start gap-3 rounded-lg border p-3">
                <div className="flex-1">
                  <p className="font-medium">{obs.studentName} - {obs.className}</p>
                  <p className="text-sm text-muted-foreground">{obs.observation}</p>
                  <p className="text-xs text-muted-foreground mt-1">on {new Date(obs.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
