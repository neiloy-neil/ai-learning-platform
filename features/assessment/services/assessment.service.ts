
// features/assessment/services/assessment.service.ts

export const assessmentService = {
    getAssessments: async () => {
        const res = await fetch('/api/assessments');
        if (!res.ok) throw new Error('Failed to fetch assessments');
        return res.json();
    },
    getQuestions: async (assessmentId?: string, conceptId?: string) => {
        const params = new URLSearchParams();
        if (assessmentId) params.append('assessmentId', assessmentId);
        if (conceptId) params.append('conceptId', conceptId);
        const res = await fetch(`/api/questions?${params.toString()}`);
        if (!res.ok) throw new Error('Failed to fetch questions');
        return res.json();
    },
    submitAttempt: async (attempt: { studentId: string; questionId: string; isCorrect: boolean; confidenceRating: number; }) => {
        const res = await fetch('/api/assessments/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(attempt),
        });
        if (!res.ok) throw new Error('Failed to submit attempt');
        return res.json();
    }
};
