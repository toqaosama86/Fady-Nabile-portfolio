import React from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { MessagesManager } from '@/components/admin/MessagesManager';

const AdminMessagesPage: React.FC = () => {
  return (
    <AdminLayout>
      <MessagesManager />
    </AdminLayout>
  );
};

export default AdminMessagesPage;
