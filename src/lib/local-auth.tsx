/**
 * Local Authentication System
 * Pure localStorage-based auth with mock API simulation
 * Replaces Supabase with local data persistence
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
  login: (email: string, password: string, roleHint?: 'admin' | 'user') => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, name: string, role?: UserRole) => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  hasRole: (roles: UserRole | UserRole[]) => boolean;
  isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo credentials for development
const DEMO_USERS = [
  {
    email: 'user1@ndg.com',
    password: 'demo123',
    name: 'Nasir Uddin',
    role: 'student' as UserRole,
  },
  {
    email: 'user2@ndg.com',
    password: 'demo123',
    name: 'Sarah Khan',
    role: 'student' as UserRole,
  },
];

const DEMO_ADMINS = [
  {
    email: 'admin1@ndg.com',
    password: 'admin123',
    name: 'Admin Rezoan',
    role: 'admin' as UserRole,
  },
  {
    email: 'admin2@ndg.com',
    password: 'admin123',
    name: 'Admin Mahadi',
    role: 'admin' as UserRole,
  },
];

// Initialize local database
function initializeLocalDB() {
  try {
    const users = localStorage.getItem('ndg_users');
    const passwords = localStorage.getItem('ndg_passwords');
    
    let shouldInitialize = false;
    
    // Check if we need to initialize
    if (!users || !passwords) {
      console.log('🔧 No existing database found. Creating...');
      shouldInitialize = true;
    } else {
      try {
        const parsedUsers = JSON.parse(users);
        const parsedPasswords = JSON.parse(passwords);
        
        if (!Array.isArray(parsedUsers) || parsedUsers.length === 0) {
          console.log('🔧 Users array is empty. Reinitializing...');
          shouldInitialize = true;
        } else if (!parsedPasswords || Object.keys(parsedPasswords).length === 0) {
          console.log('🔧 Passwords object is empty. Reinitializing...');
          shouldInitialize = true;
        } else {
          console.log('✅ Existing database found with', parsedUsers.length, 'users');
        }
      } catch (parseError) {
        console.error('❌ Error parsing database. Reinitializing...', parseError);
        shouldInitialize = true;
      }
    }
    
    if (shouldInitialize) {
      // Create demo users and admins
      const usersDB: User[] = [];
      const passwordsDB: Record<string, string> = {};

      // Add demo regular users
      DEMO_USERS.forEach((demoUser, idx) => {
        const user: User = {
          id: `user-00${idx + 1}`,
          email: demoUser.email,
          name: demoUser.name,
          role: demoUser.role,
          isActive: true,
          emailVerified: true,
          createdAt: new Date().toISOString(),
          avatar: '',
          department: '',
          phone: '',
          bio: '',
        };
        usersDB.push(user);
        passwordsDB[demoUser.email] = demoUser.password;
      });

      // Add demo admin users
      DEMO_ADMINS.forEach((demoAdmin, idx) => {
        const admin: User = {
          id: `admin-00${idx + 1}`,
          email: demoAdmin.email,
          name: demoAdmin.name,
          role: demoAdmin.role,
          isActive: true,
          emailVerified: true,
          createdAt: new Date().toISOString(),
          avatar: '',
          department: 'Administration',
          phone: '',
          bio: 'System Administrator',
        };
        usersDB.push(admin);
        passwordsDB[demoAdmin.email] = demoAdmin.password;
      });

      localStorage.setItem('ndg_users', JSON.stringify(usersDB));
      localStorage.setItem('ndg_passwords', JSON.stringify(passwordsDB));
      
      console.log('%c🔐 NDG Admin Credentials (Development)', 'background: #16A34A; color: white; padding: 8px; font-weight: bold; border-radius: 4px;');
      console.log('%c📧 Email: ' + DEV_ADMIN.email, 'color: #16A34A; font-weight: bold;');
      console.log('%c🔑 Password: ' + DEV_ADMIN.password, 'color: #16A34A; font-weight: bold;');
      console.log('%c⚠️ Change these credentials in production!', 'color: #D4AF37; font-weight: bold;');
      console.log('%cAdmin Panel: Click "Admin Login" on the login page', 'color: #0F74FF;');
      console.log('✅ Database initialized successfully');
    }
  } catch (error) {
    console.error('❌ Critical error initializing database:', error);
    // Last resort - force create the database
    const usersDB: User[] = [];
    const passwordsDB: Record<string, string> = {};
    
    DEMO_ADMINS.forEach((demoAdmin, idx) => {
      const admin: User = {
        id: `admin-00${idx + 1}`,
        email: demoAdmin.email,
        name: demoAdmin.name,
        role: demoAdmin.role,
        isActive: true,
        emailVerified: true,
        createdAt: new Date().toISOString(),
        avatar: '',
        department: 'Administration',
        phone: '',
        bio: 'System Administrator',
      };
      usersDB.push(admin);
      passwordsDB[demoAdmin.email] = demoAdmin.password;
    });
    
    try {
      localStorage.setItem('ndg_users', JSON.stringify(usersDB));
      localStorage.setItem('ndg_passwords', JSON.stringify(passwordsDB));
      console.log('✅ Database force-created after error');
    } catch (storageError) {
      console.error('❌ Could not write to localStorage:', storageError);
    }
  }
}

export function LocalAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('🔄 Initializing NDG Authentication...');
    initializeLocalDB();
    checkSession();
    
    // Verify initialization
    const users = localStorage.getItem('ndg_users');
    const passwords = localStorage.getItem('ndg_passwords');
    console.log('📊 Auth DB Status:', { 
      usersCount: users ? JSON.parse(users).length : 0,
      passwordsCount: passwords ? Object.keys(JSON.parse(passwords)).length : 0
    });
    
    // Expose reset function for debugging
    if (typeof window !== 'undefined') {
      (window as any).resetNDGAuth = () => {
        localStorage.removeItem('ndg_users');
        localStorage.removeItem('ndg_passwords');
        localStorage.removeItem('ndg_session');
        initializeLocalDB();
        console.log('✅ NDG Auth database reset. Please refresh the page.');
      };
      
      (window as any).checkNDGAuth = () => {
        const u = localStorage.getItem('ndg_users');
        const p = localStorage.getItem('ndg_passwords');
        console.log('Users:', u ? JSON.parse(u) : 'None');
        console.log('Passwords:', p ? JSON.parse(p) : 'None');
      };
    }
  }, []);

  const checkSession = () => {
    try {
      const sessionData = localStorage.getItem('ndg_session');
      if (sessionData) {
        const { userId, token } = JSON.parse(sessionData);
        const users = JSON.parse(localStorage.getItem('ndg_users') || '[]');
        const foundUser = users.find((u: User) => u.id === userId);
        
        if (foundUser && token) {
          setUser({
            ...foundUser,
            lastLoginAt: new Date().toISOString(),
          });
        }
      }
    } catch (error) {
      console.error('Session check error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string, roleHint?: 'admin' | 'user') => {
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      let users = JSON.parse(localStorage.getItem('ndg_users') || '[]');
      let passwords = JSON.parse(localStorage.getItem('ndg_passwords') || '{}');

      // If database is empty or corrupted, reinitialize
      if (!users || users.length === 0 || !passwords || Object.keys(passwords).length === 0) {
        console.warn('⚠️ Local database empty or corrupted. Reinitializing...');
        localStorage.removeItem('ndg_users');
        localStorage.removeItem('ndg_passwords');
        initializeLocalDB();
        users = JSON.parse(localStorage.getItem('ndg_users') || '[]');
        passwords = JSON.parse(localStorage.getItem('ndg_passwords') || '{}');
      }

      // Find user by email
      const foundUser = users.find((u: User) => u.email === email);
      
      if (!foundUser) {
        throw new Error('User not found. Please check your email address or contact support.');
      }

      // Check password
      if (passwords[email] !== password) {
        throw new Error('Invalid password. Please check your password and try again.');
      }

      // Check role hint for admin login
      if (roleHint === 'admin' && foundUser.role !== 'admin' && foundUser.role !== 'super_admin') {
        throw new Error('Unauthorized: This account does not have admin privileges. Please use the User Login tab instead.');
      }

      // Check if user is active
      if (!foundUser.isActive) {
        throw new Error('Account is deactivated');
      }

      // Update last login
      const updatedUser = {
        ...foundUser,
        lastLoginAt: new Date().toISOString(),
      };

      const updatedUsers = users.map((u: User) => 
        u.id === foundUser.id ? updatedUser : u
      );
      localStorage.setItem('ndg_users', JSON.stringify(updatedUsers));

      // Create session
      const session = {
        userId: updatedUser.id,
        token: `token_${Date.now()}_${Math.random().toString(36)}`,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
      };

      localStorage.setItem('ndg_session', JSON.stringify(session));
      setUser(updatedUser);

      console.log('✅ Login successful:', updatedUser.email);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem('ndg_session');
      setUser(null);
      console.log('✅ Logout successful');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const signup = async (
    email: string,
    password: string,
    name: string,
    role: UserRole = 'student'
  ) => {
    setIsLoading(true);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const users = JSON.parse(localStorage.getItem('ndg_users') || '[]');
      const passwords = JSON.parse(localStorage.getItem('ndg_passwords') || '{}');

      // Check if user already exists
      if (users.find((u: User) => u.email === email)) {
        throw new Error('User with this email already exists');
      }

      // Create new user
      const newUser: User = {
        id: `user_${Date.now()}`,
        email,
        name,
        role,
        isActive: true,
        emailVerified: true,
        createdAt: new Date().toISOString(),
        avatar: '',
        department: '',
        phone: '',
        bio: '',
      };

      // Save user and password
      users.push(newUser);
      passwords[email] = password;

      localStorage.setItem('ndg_users', JSON.stringify(users));
      localStorage.setItem('ndg_passwords', JSON.stringify(passwords));

      // Auto-login after signup
      await login(email, password);

      console.log('✅ Signup successful:', email);
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
      const users = JSON.parse(localStorage.getItem('ndg_users') || '[]');
      const updatedUser = { ...user, ...updates };

      const updatedUsers = users.map((u: User) =>
        u.id === user.id ? updatedUser : u
      );

      localStorage.setItem('ndg_users', JSON.stringify(updatedUsers));
      setUser(updatedUser);

      console.log('✅ Profile updated');
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

export function useLocalAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useLocalAuth must be used within a LocalAuthProvider');
  }
  return context;
}
