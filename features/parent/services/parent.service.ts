
// features/parent/services/parent.service.ts

export const parentService = {
    getWeeklyActivity: async (studentId: string) => {
        const res = await fetch(`/api/parent/student-activity/${studentId}/weekly`);
        if (!res.ok) throw new Error('Failed to fetch weekly activity');
        return res.json();
    }
};
