
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const lessonPlans = [
  { id: 1, title: 'Introduction to Algebra', subject: 'Mathematics', grade: 'Grade 7' },
  { id: 2, title: 'The Solar System', subject: 'Science', grade: 'Grade 6' },
  { id: 3, title: 'World War II', subject: 'History', grade: 'Grade 8' },
];

const bookletReferences = [
  { id: 1, title: 'Maths Booklet 1', subject: 'Mathematics', grade: 'Grade 7' },
  { id: 2, title: 'Science Booklet 2', subject: 'Science', grade: 'Grade 6' },
  { id: 3, title: 'History Booklet 3', subject: 'History', grade: 'Grade 8' },
];

const assessmentMaterials = [
  { id: 1, title: 'Algebra Test', subject: 'Mathematics', grade: 'Grade 7' },
  { id: 2, title: 'Solar System Quiz', subject: 'Science', grade: 'Grade 6' },
  { id: 3, title: 'WWII Essay Questions', subject: 'History', grade: 'Grade 8' },
];

const conceptSummaries = [
  { id: 1, title: 'Linear Equations Summary', subject: 'Mathematics', grade: 'Grade 7' },
  { id: 2, title: 'Planets Summary', subject: 'Science', grade: 'Grade 6' },
  { id: 3, title: 'The Cold War Summary', subject: 'History', grade: 'Grade 8' },
];

export default function TeachingResourcesView() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Teaching Resources</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Lesson Plans</h3>
          <div className="space-y-3">
            {lessonPlans.map(plan => (
              <div key={plan.id} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="font-medium">{plan.title}</p>
                  <p className="text-sm text-muted-foreground">{plan.subject} - {plan.grade}</p>
                </div>
                <button className="text-sm text-blue-500">View</button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Booklet References</h3>
          <div className="space-y-3">
            {bookletReferences.map(booklet => (
              <div key={booklet.id} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="font-medium">{booklet.title}</p>
                  <p className="text-sm text-muted-foreground">{booklet.subject} - {booklet.grade}</p>
                </div>
                <button className="text-sm text-blue-500">View</button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Assessment Materials</h3>
          <div className="space-y-3">
            {assessmentMaterials.map(material => (
              <div key={material.id} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="font-medium">{material.title}</p>
                  <p className="text-sm text-muted-foreground">{material.subject} - {material.grade}</p>
                </div>
                <button className="text-sm text-blue-500">View</button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Concept Summaries</h3>
          <div className="space-y-3">
            {conceptSummaries.map(summary => (
              <div key={summary.id} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="font-medium">{summary.title}</p>
                  <p className-="text-sm text-muted-foreground">{summary.subject} - {summary.grade}</p>
                </div>
                <button className="text-sm text-blue-500">View</button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
