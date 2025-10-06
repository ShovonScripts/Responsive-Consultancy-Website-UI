import { AdminDashboard as MainAdminDashboard } from '../../pages/AdminDashboard';
import { User } from '../../../lib/auth-context';

interface AdminDashboardProps {
  user: User;
  onNavigate: (page: string) => void;
}

export function AdminDashboard({ user, onNavigate }: AdminDashboardProps) {
  // Admin uses the existing AdminDashboard
  return <MainAdminDashboard />;
}