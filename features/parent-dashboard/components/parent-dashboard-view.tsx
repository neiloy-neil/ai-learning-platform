'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ParentDashboardView() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Parent Dashboard
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Clear reporting of your student&apos;s progress.
        </p>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Student Progress Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Your student&apos;s concept-level insights and progress will be displayed here.</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
