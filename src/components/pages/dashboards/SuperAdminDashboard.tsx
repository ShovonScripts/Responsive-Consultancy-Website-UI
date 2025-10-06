import { AdminDashboard } from '../../pages/AdminDashboard';
import { User } from '../../../lib/auth-context';

interface SuperAdminDashboardProps {
  user: User;
  onNavigate: (page: string) => void;
}

export function SuperAdminDashboard({ user, onNavigate }: SuperAdminDashboardProps) {
  // Super Admin uses the existing AdminDashboard with enhanced permissions
  return <AdminDashboard />;
}