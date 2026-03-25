
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { EmptyStatePanel } from "@/components/ui/state-panel";
import type { Concept, ConceptMastery } from "@/lib/pcdc-types";

export default function MasteryOverview({ mastery, concepts }: { mastery: ConceptMastery[], concepts: Concept[] }) {
  const getConceptName = (conceptId: string) => {
    return concepts.find(c => c.id === conceptId)?.name || "Unknown Concept";
  };

  // Find strongest and weakest concepts
  let strongestConcept: ConceptMastery | null = null;
  let weakestConcept: ConceptMastery | null = null;

  if (mastery.length > 0) {
    strongestConcept = mastery.reduce((prev, current) => (prev.masteryScore > current.masteryScore ? prev : current));
    weakestConcept = mastery.reduce((prev, current) => (prev.masteryScore < current.masteryScore ? prev : current));
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">Mastery Overview</h2>

      {mastery.length === 0 ? (
        <EmptyStatePanel
          title="Mastery data is empty"
          description="Start a practice or assessment session to generate the first concept mastery signals."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {strongestConcept && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Strongest Concept</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-bold text-primary">{getConceptName(strongestConcept.conceptId)}</p>
                <p className="text-sm text-muted-foreground">Score: {strongestConcept.masteryScore}%</p>
              </CardContent>
            </Card>
          )}
          {weakestConcept && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Weakest Concept</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-bold text-danger">{getConceptName(weakestConcept.conceptId)}</p>
                <p className="text-sm text-muted-foreground">Score: {weakestConcept.masteryScore}%</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {mastery.map((item) => (
          <Card key={item.conceptId}>
            <CardHeader>
              <CardTitle className="text-lg">{getConceptName(item.conceptId)}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Progress</span>
                <span className="text-sm font-bold text-primary">{item.masteryScore}%</span>
              </div>
              <div className="mt-2">
                <ProgressBar value={item.masteryScore} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

