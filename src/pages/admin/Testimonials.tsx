import React from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { TestimonialsManager } from '@/components/admin/TestimonialsManager';

const AdminTestimonialsPage: React.FC = () => {
  return (
    <AdminLayout>
      <TestimonialsManager />
    </AdminLayout>
  );
};

export default AdminTestimonialsPage;
