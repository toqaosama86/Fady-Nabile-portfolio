import React from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { ProjectsManager } from '@/components/admin/ProjectsManager';

const AdminProjectsPage: React.FC = () => {
  return (
    <AdminLayout>
      <ProjectsManager />
    </AdminLayout>
  );
};

export default AdminProjectsPage;
