import React from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { SettingsManager } from '@/components/admin/SettingsManager';

const AdminSettingsPage: React.FC = () => {
  return (
    <AdminLayout>
      <SettingsManager />
    </AdminLayout>
  );
};

export default AdminSettingsPage;
