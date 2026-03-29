import React from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { ToolsManager } from '@/components/admin/ToolsManager';

const AdminToolsPage: React.FC = () => {
  return (
    <AdminLayout>
      <ToolsManager />
    </AdminLayout>
  );
};

export default AdminToolsPage;
