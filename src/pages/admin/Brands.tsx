import React from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { BrandsManager } from '@/components/admin/BrandsManager';

const AdminBrandsPage: React.FC = () => {
  return (
    <AdminLayout>
      <BrandsManager />
    </AdminLayout>
  );
};

export default AdminBrandsPage;
