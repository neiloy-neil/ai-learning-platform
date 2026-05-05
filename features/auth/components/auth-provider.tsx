import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';

import { getDefaultRouteForRole, appRoutes } from '@/lib/app-routes';
import type { User } from '@/lib/pcdc-types';
import { UserRole } from '@/lib/pcdc-types';

type AuthContextType = {
  user: User | null;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      }
      setIsLoading(false);
    };
    fetchUser();
  }, []);

  const login = async (email: string, pass: string) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, pass }),
    });
    if (res.ok) {
      const data = await res.json();
      setUser(data);
      router.push(getDefaultRouteForRole(data.role));
    }
  };

  const logout = async () => {
    await fetch('/api/auth/logout');
    setUser(null);
    router.push(appRoutes.auth.login);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export function useRoleRoute(role: UserRole) {
  return getDefaultRouteForRole(role);
}
