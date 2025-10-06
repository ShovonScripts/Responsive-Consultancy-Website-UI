import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export type UserRole = 'super_admin' | 'admin' | 'consultant' | 'instructor' | 'student' | 'member';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  phone?: string;
  bio?: string;
  isActive: boolean;
  emailVerified: boolean;
  createdAt: string;
  lastLoginAt?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, name: string, role?: UserRole) => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  hasRole: (roles: UserRole | UserRole[]) => boolean;
  isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const supabaseUrl = `https://${projectId}.supabase.co`;
const supabase = createClient(supabaseUrl, publicAnonKey);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    checkSession();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          await fetchUserProfile(session.user.id);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          localStorage.removeItem('ndg_auth_token');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      // Always try fallback first since backend might not be deployed
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        const fallbackUser: User = {
          id: authUser.id,
          email: authUser.email || '',
          name: authUser.user_metadata?.name || authUser.email || 'User',
          role: authUser.user_metadata?.role || 'student',
          isActive: authUser.user_metadata?.isActive || true,
          emailVerified: authUser.user_metadata?.emailVerified || true,
          createdAt: authUser.created_at || new Date().toISOString(),
          phone: authUser.user_metadata?.phone || '',
          bio: authUser.user_metadata?.bio || '',
          avatar: authUser.user_metadata?.avatar || '',
        };
        setUser(fallbackUser);
        return;
      }

      // Try backend as secondary option (when deployed)
      try {
        const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-7a5ab98d/auth/profile/${userId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('ndg_auth_token')}`,
          },
        });

        if (response.ok) {
          const { user: userProfile } = await response.json();
          setUser(userProfile);
        }
      } catch (backendError) {
        console.log('Backend profile fetch failed (expected during development):', backendError);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const checkSession = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error checking session:', error);
        setUser(null);
      } else if (session) {
        // Store token for API calls
        localStorage.setItem('ndg_auth_token', session.access_token);
        await fetchUserProfile(session.user.id);
      } else {
        setUser(null);
        localStorage.removeItem('ndg_auth_token');
      }
    } catch (error) {
      console.error('Session check error:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data.session) {
        localStorage.setItem('ndg_auth_token', data.session.access_token);
        await fetchUserProfile(data.user.id);
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw new Error(error.message);
      }

      setUser(null);
      localStorage.removeItem('ndg_auth_token');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const signup = async (email: string, password: string, name: string, role: UserRole = 'student') => {
    setIsLoading(true);
    try {
      // Direct Supabase signup (fallback-first approach)
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role,
            isActive: true,
            emailVerified: true,
            createdAt: new Date().toISOString()
          }
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data.session) {
        localStorage.setItem('ndg_auth_token', data.session.access_token);
        await fetchUserProfile(data.user.id);
      } else if (data.user) {
        // Create fallback user profile if no session
        const fallbackUser: User = {
          id: data.user.id,
          email: data.user.email || email,
          name: name,
          role: role,
          isActive: true,
          emailVerified: true,
          createdAt: new Date().toISOString(),
        };
        setUser(fallbackUser);
      }
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) throw new Error('No user logged in');
    
    try {
      // Update Supabase user metadata
      const { error } = await supabase.auth.updateUser({
        data: {
          ...updates,
          updatedAt: new Date().toISOString()
        }
      });

      if (error) {
        console.error('Supabase metadata update error:', error);
      }

      // Update local state immediately
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);

      // Try backend update as secondary option (when deployed)
      try {
        await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-7a5ab98d/auth/profile/${user.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('ndg_auth_token')}`,
          },
          body: JSON.stringify(updates),
        });
      } catch (backendError) {
        console.log('Backend profile update failed (expected during development):', backendError);
      }
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  };

  const hasRole = (roles: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    const roleArray = Array.isArray(roles) ? roles : [roles];
    return roleArray.includes(user.role);
  };

  const isAdmin = (): boolean => {
    return hasRole(['super_admin', 'admin']);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    signup,
    updateProfile,
    hasRole,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
