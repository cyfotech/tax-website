/**
 * Admin Authentication Context with Session Management & RBAC Permissions
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminUser, UserRole } from '../types';

interface AuthContextType {
  user: AdminUser | null;
  token: string | null;
  isLoading: boolean;
  login: (identifier: string, password: string) => Promise<{
    success: boolean;
    mfaRequired?: boolean;
    mfaToken?: string;
    userId?: string;
    error?: string;
  }>;
  verifyMfa: (code: string, mfaToken: string, userId: string) => Promise<{
    success: boolean;
    error?: string;
  }>;
  logout: () => Promise<void>;
  hasRole: (...roles: UserRole[]) => boolean;
  checkAuth: () => Promise<void>;
}

const AdminAuthContext = createContext<AuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('apex_admin_token'));
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Validate existing session on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const storedToken = localStorage.getItem('apex_admin_token');
    if (!storedToken) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/admin/auth/me', {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      if (res.ok) {
        const json = await res.json();
        setUser(json.user);
        setToken(storedToken);
      } else {
        localStorage.removeItem('apex_admin_token');
        setUser(null);
        setToken(null);
      }
    } catch {
      // In case server is starting up, retain token
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (identifier: string, password: string) => {
    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Authentication failed.' };
      }

      if (data.mfaRequired) {
        return {
          success: true,
          mfaRequired: true,
          mfaToken: data.mfaToken,
          userId: data.userId,
        };
      }

      // Login success
      localStorage.setItem('apex_admin_token', data.token);
      setToken(data.token);
      setUser(data.user);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error connecting to Admin API.' };
    }
  };

  const verifyMfa = async (code: string, mfaToken: string, userId: string) => {
    try {
      const res = await fetch('/api/admin/auth/mfa-verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, mfaToken, userId }),
      });

      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Verification code failed.' };
      }

      localStorage.setItem('apex_admin_token', data.token);
      setToken(data.token);
      setUser(data.user);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'MFA validation error.' };
    }
  };

  const logout = async () => {
    try {
      if (token) {
        await fetch('/api/admin/auth/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch {
      // Ignore network errors on logout
    } finally {
      localStorage.removeItem('apex_admin_token');
      setUser(null);
      setToken(null);
    }
  };

  const hasRole = (...roles: UserRole[]): boolean => {
    if (!user) return false;
    if (user.role === 'super_admin') return true;
    return roles.includes(user.role);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        verifyMfa,
        logout,
        hasRole,
        checkAuth,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
