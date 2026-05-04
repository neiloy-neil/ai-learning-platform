'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileBarChart, Download, Mail, Calendar } from 'lucide-react';

export default function ReportsGeneratorView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Reports Generator</h1>
        <p className="mt-2 text-muted-foreground">Generate and export platform reports</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileBarChart className="size-5 text-primary" />
              Attendance Reports
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">Generate attendance analytics and compliance reports</p>
            <Button className="w-full" variant="secondary">
              <Download className="mr-2 size-4" />
              Generate Report
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileBarChart className="size-5 text-green-600" />
              Academic Progress Reports
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">Student progress and performance analytics</p>
            <Button className="w-full" variant="secondary">
              <Download className="mr-2 size-4" />
              Generate Report
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="size-5 text-orange-600" />
              Enrolment Reports
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">Enrollment trends and revenue analytics</p>
            <Button className="w-full" variant="secondary">
              <Download className="mr-2 size-4" />
              Generate Report
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="size-5 text-purple-600" />
              Communication Reports
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">Parent notifications and email analytics</p>
            <Button className="w-full" variant="secondary">
              <Download className="mr-2 size-4" />
              Generate Report
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Report History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">Report history will appear here...</p>
        </CardContent>
      </Card>
    </div>
  );
}
