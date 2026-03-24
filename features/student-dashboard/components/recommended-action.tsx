
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock Data
const recommendedConcept = "Understanding Polynomials";

export default function RecommendedAction() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended For You</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center text-center">
        <p className="mb-2 text-gray-500 dark:text-gray-400">Your next challenge is</p>
        <p className="text-xl font-semibold mb-4">{recommendedConcept}</p>
        <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          Start Practice
        </Button>
      </CardContent>
    </Card>
  );
}
