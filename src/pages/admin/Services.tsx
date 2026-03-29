import React from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { ServicesManager } from '@/components/admin/ServicesManager';

const AdminServicesPage: React.FC = () => {
  return (
    <AdminLayout>
      <ServicesManager />
    </AdminLayout>
  );
};

export default AdminServicesPage;
