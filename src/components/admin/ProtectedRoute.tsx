import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { AdminLoadingSkeleton } from './AdminLoadingSkeleton';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { session, loading, isAdmin } = useAuth();

  // Show loading skeleton during initial auth check
  if (loading) {
    return <AdminLoadingSkeleton />;
  }

  // Not authenticated - redirect to login
  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }

  // Not admin - show access denied
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-muted-foreground">You don't have admin access.</p>
        </div>
      </div>
    );
  }

  // Admin - render children
  return <>{children}</>;
};
