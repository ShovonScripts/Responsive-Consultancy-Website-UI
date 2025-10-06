import { AdminView } from './AdminPanel';
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Calendar,
  GraduationCap,
  FileText,
  BarChart3,
  Settings,
  FileWarning,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../ui/utils';

interface AdminSidebarProps {
  currentView: AdminView;
  onViewChange: (view: AdminView) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

interface NavItem {
  id: AdminView;
  label: string;
  icon: any;
  badge?: number;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'orders', label: 'Orders', icon: ShoppingCart, badge: 3 },
  { id: 'bookings', label: 'Bookings', icon: Calendar },
  { id: 'classes', label: 'Classes & Hub', icon: GraduationCap },
  { id: 'content', label: 'Content', icon: FileText },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'logs', label: 'Logs', icon: FileWarning },
];

export function AdminSidebar({
  currentView,
  onViewChange,
  collapsed,
  onToggleCollapse,
}: AdminSidebarProps) {
  return (
    <aside
      className={cn(
        'bg-panel border-r border-border transition-all duration-300 flex flex-col',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="h-16 border-b border-border flex items-center justify-between px-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--accent)] flex items-center justify-center">
              <span className="text-white font-semibold">N</span>
            </div>
            <div>
              <h1 className="text-sm font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                NDG Admin
              </h1>
              <p className="text-xs text-muted-foreground">Control Panel</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          className={cn('p-2', collapsed && 'mx-auto')}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-2">
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors relative',
                  isActive
                    ? 'bg-[var(--accent)] text-white'
                    : 'text-foreground hover:bg-muted-bg'
                )}
                title={collapsed ? item.label : undefined}
              >
                <Icon className={cn('w-5 h-5 flex-shrink-0', collapsed && 'mx-auto')} />
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <span className="bg-destructive text-white text-xs rounded-full px-2 py-0.5">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        {!collapsed && (
          <div className="text-xs text-muted-foreground text-center">
            <p>v1.0.0</p>
            <p className="mt-1">© 2025 NDG</p>
          </div>
        )}
      </div>
    </aside>
  );
}
