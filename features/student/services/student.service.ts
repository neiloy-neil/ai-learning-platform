
// features/student/services/student.service.ts

export const studentService = {
    getStudent: async (studentId: string) => {
        const res = await fetch(`/api/students/${studentId}`);
        if (!res.ok) throw new Error('Failed to fetch student');
        return res.json();
    },
    getMastery: async (studentId: string) => {
        const res = await fetch(`/api/mastery/${studentId}`);
        if (!res.ok) throw new Error('Failed to fetch mastery');
        return res.json();
    },
    getActivities: async (studentId: string) => {
        const res = await fetch(`/api/students/${studentId}/activities`);
        if (!res.ok) throw new Error('Failed to fetch activities');
        return res.json();
    },
    getGoals: async (studentId: string) => {
        const res = await fetch(`/api/students/${studentId}/goals`);
        if (!res.ok) throw new Error('Failed to fetch goals');
        return res.json();
    },
    getRevisionSuggestions: async (studentId: string) => {
        const res = await fetch(`/api/students/${studentId}/revision`);
        if (!res.ok) throw new Error('Failed to fetch revision suggestions');
        return res.json();
    },
    getAdaptiveRecommendation: async (studentId: string) => {
        const res = await fetch(`/api/adaptive/${studentId}/next`);
        if (!res.ok) throw new Error('Failed to fetch recommendation');
        return res.json();
    }
};
