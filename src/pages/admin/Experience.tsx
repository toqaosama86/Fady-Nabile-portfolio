import React from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { ExperienceManager } from '@/components/admin/ExperienceManager';

const AdminExperiencePage: React.FC = () => {
  return (
    <AdminLayout>
      <ExperienceManager />
    </AdminLayout>
  );
};

export default AdminExperiencePage;
