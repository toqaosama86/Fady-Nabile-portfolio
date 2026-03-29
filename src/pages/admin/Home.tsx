import React from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminDashboard } from '@/components/admin/AdminDashboard';

export const AdminHomePage: React.FC = () => {
  return (
    <AdminLayout>
      <AdminDashboard />
    </AdminLayout>
  );
};

export default AdminHomePage;
