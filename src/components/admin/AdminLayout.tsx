import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Briefcase,
  Users,
  MessageSquare,
  Wrench,
  Building2,
  Hammer,
  Settings,
  LogOut,
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { signOut } = useAuth();
  const location = useLocation();

  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/projects', label: 'Projects', icon: Briefcase },
    { path: '/admin/brands', label: 'Brands', icon: Users },
    { path: '/admin/testimonials', label: 'Testimonials', icon: MessageSquare },
    { path: '/admin/services', label: 'Services', icon: Wrench },
    { path: '/admin/experience', label: 'Experience', icon: Building2 },
    { path: '/admin/tools', label: 'Tools', icon: Hammer },
    { path: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border overflow-y-auto">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
        </div>

        <nav className="space-y-2 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-accent'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-4 right-4">
          <Link
            to="/"
            className="block text-sm text-muted-foreground hover:text-foreground mb-4 px-4 py-2 rounded-lg hover:bg-accent transition-colors"
          >
            ← View Portfolio
          </Link>
          <Button
            onClick={handleSignOut}
            variant="destructive"
            className="w-40"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};
