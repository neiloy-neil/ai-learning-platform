import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress-bar';
import { getProgressData } from '@/lib/mocks';

function BarChart({ data }: { data: { conceptId: string; conceptName: string; mastery: number }[] }) {
  return (
    <div className="flex h-64 w-full items-end space-x-4 rounded-lg bg-muted p-4">
      {data.map((item) => (
        <div className="flex flex-1 flex-col items-center" key={item.conceptId}>
          <div
            className="w-full rounded-t-md bg-gradient-to-t from-blue-500 to-purple-600 transition-all duration-500 ease-out"
            style={{ height: `${item.mastery}%` }}
          />
          <span className="mt-2 text-center text-xs text-muted-foreground">{item.conceptName}</span>
        </div>
      ))}
    </div>
  );
}

export default function ProgressView() {
  const masteryData = getProgressData();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Your Progress</h1>
        <p className="text-md text-muted-foreground">A detailed overview of your concept mastery.</p>
      </div>

      <Card glass>
        <CardHeader>
          <CardTitle>Mastery Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart data={masteryData} />
        </CardContent>
      </Card>

      <Card glass>
        <CardHeader>
          <CardTitle>Mastery by Concept</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {masteryData.map((item) => (
            <div key={item.conceptId}>
              <div className="mb-1 flex items-center justify-between">
                <h3 className="font-semibold">{item.conceptName}</h3>
                <span className="text-sm font-bold text-primary">{item.mastery}%</span>
              </div>
              <ProgressBar value={item.mastery} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
