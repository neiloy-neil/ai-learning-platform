import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress-bar';
import { EmptyStatePanel } from '@/components/ui/state-panel';
import type { Concept, ConceptMastery } from '@/lib/pcdc-types';

export default function MasteryOverview({ mastery, concepts }: { mastery: ConceptMastery[]; concepts: Concept[] }) {
  const getConceptName = (conceptId: string) => concepts.find((concept) => concept.id === conceptId)?.name ?? 'Unknown Concept';

  if (mastery.length === 0) {
    return (
      <EmptyStatePanel
        title="Mastery overview unavailable"
        description="Start a practice or assessment session to generate the first concept mastery signals."
      />
    );
  }

  const strongestConcept = mastery.reduce((prev, current) => (prev.masteryScore > current.masteryScore ? prev : current));
  const weakestConcept = mastery.reduce((prev, current) => (prev.masteryScore < current.masteryScore ? prev : current));

  return (
    <section className="space-y-5">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Mastery Snapshot</p>
          <h2 className="mt-1 text-2xl font-semibold text-foreground">Concept health at a glance</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card glass>
          <CardHeader>
            <CardTitle className="text-lg">Strongest concept</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-xl font-semibold text-primary">{getConceptName(strongestConcept.conceptId)}</p>
            <p className="text-sm text-muted-foreground">Stable accuracy is keeping this concept in a healthy range.</p>
            <ProgressBar value={strongestConcept.masteryScore} />
            <p className="text-sm font-semibold text-foreground">{strongestConcept.masteryScore}% mastery</p>
          </CardContent>
        </Card>

        <Card glass>
          <CardHeader>
            <CardTitle className="text-lg">Needs attention</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-xl font-semibold text-danger">{getConceptName(weakestConcept.conceptId)}</p>
            <p className="text-sm text-muted-foreground">This concept is the quickest path to an immediate mastery gain.</p>
            <ProgressBar value={weakestConcept.masteryScore} />
            <p className="text-sm font-semibold text-foreground">{weakestConcept.masteryScore}% mastery</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {mastery.map((item) => (
          <Card className="overflow-hidden" glass key={item.conceptId}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{getConceptName(item.conceptId)}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Current mastery</span>
                <span className="font-semibold text-foreground">{item.masteryScore}%</span>
              </div>
              <ProgressBar value={item.masteryScore} />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
