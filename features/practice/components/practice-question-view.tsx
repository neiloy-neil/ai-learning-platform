
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/cn';

// Mock Data
const mockQuestion = {
  id: 'q1',
  text: 'What is the value of x in the equation 2x + 3 = 11?',
  options: [
    { id: 'a', text: '3' },
    { id: 'b', text: '4' },
    { id: 'c', text: '5' },
    { id: 'd', text: '6' },
  ],
  correctOptionId: 'b',
  explanation: 'To solve for x, first subtract 3 from both sides of the equation to get 2x = 8. Then, divide both sides by 2 to get x = 4.',
};

export default function PracticeQuestionView() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleSubmit = () => {
    if (!selectedOption) return;
    setIsSubmitted(true);
    const correct = selectedOption === mockQuestion.correctOptionId;
    setIsCorrect(correct);
  };

  return (
    <div className="flex justify-center items-start pt-10">
      <Card className={cn(
          "w-full max-w-2xl",
          isSubmitted && isCorrect && "animate-glow",
          isSubmitted && !isCorrect && "animate-shake"
        )}>
        <CardHeader>
          <CardTitle>Practice Question</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-6">{mockQuestion.text}</p>
          <div className="space-y-4 mb-6">
            {mockQuestion.options.map((option) => {
              const isSelected = selectedOption === option.id;
              
              let variant: "primary" | "secondary" | "success" | "danger" = 'secondary';
              if (isSubmitted) {
                if (option.id === mockQuestion.correctOptionId) {
                  variant = 'success';
                } else if (isSelected && !isCorrect) {
                  variant = 'danger';
                }
              } else if (isSelected) {
                variant = 'primary';
              }

              return (
                <Button
                  key={option.id}
                  variant={variant}
                  className="w-full justify-start h-auto py-3 px-4 text-left"
                  onClick={() => !isSubmitted && setSelectedOption(option.id)}
                >
                  <span className="mr-4 font-bold">{option.id.toUpperCase()}</span>
                  <span>{option.text}</span>
                </Button>
              );
            })}
          </div>
          <Button onClick={handleSubmit} disabled={!selectedOption || isSubmitted} className="w-full">
            Submit
          </Button>
          {isSubmitted && (
            <div className="mt-6 p-4 rounded-lg bg-muted">
              <h3 className="font-bold text-lg mb-2">{isCorrect ? 'Correct!' : 'Incorrect'}</h3>
              <p>{mockQuestion.explanation}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
