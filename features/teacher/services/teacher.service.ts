
// features/teacher/services/teacher.service.ts

export const teacherService = {
    getStats: async () => {
        const res = await fetch('/api/teacher/stats');
        if (!res.ok) throw new Error('Failed to fetch stats');
        return res.json();
    },
    getWeakConcepts: async () => {
        const res = await fetch('/api/teacher/weak-concepts');
        if (!res.ok) throw new Error('Failed to fetch weak concepts');
        return res.json();
    },
    getStudentList: async () => {
        const res = await fetch('/api/teacher/students');
        if (!res.ok) throw new Error('Failed to fetch student list');
        return res.json();
    }
};
