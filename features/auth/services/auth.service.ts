
// features/auth/services/auth.service.ts

export const authService = {
    login: async (email: string, password: string) => {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        if (!res.ok) throw new Error('Login failed');
        return res.json();
    },

    register: async (name: string, email: string, password: string) => {
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });
        if (!res.ok) throw new Error('Registration failed');
        return res.json();
    },

    getMe: async (role?: string) => {
        const url = role ? `/api/auth/me?role=${role}` : '/api/auth/me';
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch user');
        return res.json();
    }
};
