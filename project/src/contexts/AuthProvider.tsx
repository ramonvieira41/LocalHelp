import { useState, useEffect, useCallback, type ReactNode } from 'react';
import { AuthContext } from '@/hooks/useAuth';
import { mockAuthService } from '@/services/authService';
import type { User } from '@/types';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    mockAuthService.getCurrentUser().then((u) => {
      setUser(u);
      setIsLoading(false);
    });
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const u = await mockAuthService.login(email, password);
    setUser(u);
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    const u = await mockAuthService.register(name, email, password);
    setUser(u);
  }, []);

  const logout = useCallback(async () => {
    await mockAuthService.logout();
    setUser(null);
  }, []);

  const updateAccount = useCallback(async (name: string, email: string) => {
    const u = await mockAuthService.updateAccount(name, email);
    setUser(u);
  }, []);

  const deleteAccount = useCallback(async () => {
    await mockAuthService.deleteAccount();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateAccount, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
}
