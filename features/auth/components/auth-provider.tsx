'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';

import { getDefaultRouteForRole, appRoutes } from '@/lib/app-routes';
import type { User } from '@/lib/pcdc-types';
import { UserRole } from '@/lib/pcdc-types';
import { demoUsers, type DemoUserKey } from '@/lib/mocks';
import { getDemoUserKeyFromEmail } from '@/lib/demo-auth';

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (email: string, pass: string) => Promise<void>;
  loginAsDemo: (userKey: DemoUserKey) => void;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('authUser');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser) as User);
    }

    setIsLoading(false);
  }, []);

  const persistUser = (nextUser: User) => {
    const authToken = `demo-token-${nextUser.role}`;
    setUser(nextUser);
    setToken(authToken);
    localStorage.setItem('authUser', JSON.stringify(nextUser));
    localStorage.setItem('authToken', authToken);
    router.push(getDefaultRouteForRole(nextUser.role));
  };

  const login = async (email: string, _pass: string) => {
    persistUser(demoUsers[getDemoUserKeyFromEmail(email)]);
  };

  const loginAsDemo = (userKey: DemoUserKey) => {
    persistUser(demoUsers[userKey]);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authUser');
    localStorage.removeItem('authToken');
    router.push(appRoutes.auth.login);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, loginAsDemo, logout, isLoading }}>
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
