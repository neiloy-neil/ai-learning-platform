
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TeacherAssessmentSummaryView from './teacher-assessment-summary-view';

export default function TeacherAssessmentsView() {
  return (
    <Tabs defaultValue="assign">
        <TabsList>
            <TabsTrigger value="assign">Assign</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
        </TabsList>
        <TabsContent value="assign">
            <Card>
                <CardHeader>
                    <CardTitle>Assessments</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-end mb-4">
                        <Button>Create New Assessment</Button>
                    </div>
                    <p>Assessment list will be displayed here.</p>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="summary">
            <TeacherAssessmentSummaryView />
        </TabsContent>
    </Tabs>
  );
}
