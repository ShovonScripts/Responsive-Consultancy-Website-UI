/**
 * Admin Panel - Main Container
 * Full-featured admin panel with sidebar navigation and routing
 */

import { useState } from 'react';
import { useLocalAuth } from '../../lib/local-auth';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopNav } from './AdminTopNav';
import { AdminDashboardView } from './views/AdminDashboardView';
import { AdminUsersView } from './views/AdminUsersView';
import { AdminProductsView } from './views/AdminProductsView';
import { AdminOrdersView } from './views/AdminOrdersView';
import { AdminBookingsView } from './views/AdminBookingsView';
import { AdminClassesView } from './views/AdminClassesView';
import { AdminContentView } from './views/AdminContentView';
import { AdminAnalyticsView } from './views/AdminAnalyticsView';
import { AdminSettingsView } from './views/AdminSettingsView';
import { AdminLogsView } from './views/AdminLogsView';
import { toast } from 'sonner';

export type AdminView = 
  | 'dashboard'
  | 'users'
  | 'products'
  | 'orders'
  | 'bookings'
  | 'classes'
  | 'content'
  | 'analytics'
  | 'settings'
  | 'logs';

interface AdminPanelProps {
  onNavigate: (page: string) => void;
}

export function AdminPanel({ onNavigate }: AdminPanelProps) {
  const { user, logout } = useLocalAuth();
  const [currentView, setCurrentView] = useState<AdminView>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("You've been logged out");
      onNavigate('home');
    } catch (error: any) {
      toast.error('Failed to logout');
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <AdminDashboardView />;
      case 'users':
        return <AdminUsersView />;
      case 'products':
        return <AdminProductsView />;
      case 'orders':
        return <AdminOrdersView />;
      case 'bookings':
        return <AdminBookingsView />;
      case 'classes':
        return <AdminClassesView />;
      case 'content':
        return <AdminContentView />;
      case 'analytics':
        return <AdminAnalyticsView />;
      case 'settings':
        return <AdminSettingsView />;
      case 'logs':
        return <AdminLogsView />;
      default:
        return <AdminDashboardView />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--bg)', color: 'var(--ink)' }}>
      {/* Sidebar */}
      <AdminSidebar
        currentView={currentView}
        onViewChange={setCurrentView}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <AdminTopNav
          user={user}
          onLogout={handleLogout}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6" style={{ background: 'var(--bg)' }}>
          {renderView()}
        </main>
      </div>
    </div>
  );
}
