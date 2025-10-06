import { useEffect } from 'react';
import { useLocalAuth } from '../../lib/local-auth';
import { ConsultantDashboard } from './dashboards/ConsultantDashboard';
import { InstructorDashboard } from './dashboards/InstructorDashboard';
import { StudentDashboard } from './dashboards/StudentDashboard';
import { MemberDashboard } from './dashboards/MemberDashboard';

interface UserDashboardProps {
  onNavigate: (page: string) => void;
}

export function UserDashboard({ onNavigate }: UserDashboardProps) {
  const { user, isLoading } = useLocalAuth();

  // Redirect admins to the new admin panel
  useEffect(() => {
    if (user && (user.role === 'admin' || user.role === 'super_admin')) {
      onNavigate('admin');
    }
  }, [user, onNavigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    onNavigate('login');
    return null;
  }

  // Admin and Super Admin users are redirected to admin panel
  if (user.role === 'admin' || user.role === 'super_admin') {
    return null; // Will redirect via useEffect
  }

  // Route to role-specific dashboard
  switch (user.role) {
    case 'consultant':
      return <ConsultantDashboard user={user} onNavigate={onNavigate} />;
    case 'instructor':
      return <InstructorDashboard user={user} onNavigate={onNavigate} />;
    case 'student':
      return <StudentDashboard user={user} onNavigate={onNavigate} />;
    case 'member':
      return <MemberDashboard user={user} onNavigate={onNavigate} />;
    default:
      return <StudentDashboard user={user} onNavigate={onNavigate} />;
  }
}