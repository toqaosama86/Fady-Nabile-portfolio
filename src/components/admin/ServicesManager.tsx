import React, { useState } from 'react';
import { useServices, useCreateService, useUpdateService, useDeleteService } from '@/hooks/useDatabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';
import { AdminLoadingSkeleton } from './AdminLoadingSkeleton';

export const ServicesManager: React.FC = () => {
  const { data: services = [], isLoading } = useServices();
  const createService = useCreateService();
  const updateService = useUpdateService();
  const deleteService = useDeleteService();
  
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '',
    features: [] as string[],
    display_order: 0,
  });

  const handleOpenDialog = (service?: Tables<'services'>) => {
    if (service) {
      setEditingId(service.id);
      setFormData({
        title: service.title,
        description: service.description,
        icon: service.icon || '',
        features: (Array.isArray(service.features) ? service.features : []) as string[],
        display_order: service.display_order,
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        description: '',
        icon: '',
        features: [],
        display_order: 0,
      });
    }
    setOpen(true);
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await updateService.mutateAsync({ id: editingId, ...formData });
      } else {
        await createService.mutateAsync(formData);
      }
      setOpen(false);
      setEditingId(null);
      setFormData({
        title: '',
        description: '',
        icon: '',
        features: [],
        display_order: 0,
      });
    } catch (error) {
      console.error('Error saving service:', error);
    }
  };

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await deleteService.mutateAsync(deleteId);
        setDeleteId(null);
      } catch (error) {
        console.error('Error deleting service:', error);
      }
    }
  };

  const handleFeatureAdd = () => {
    setFormData({
      ...formData,
      features: [...formData.features, ''],
    });
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({
      ...formData,
      features: newFeatures,
    });
  };

  const handleFeatureRemove = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
  };

  if (isLoading) {
    return <AdminLoadingSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Services</h1>
          <p className="text-muted-foreground">Manage your services</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Service' : 'Add New Service'}</DialogTitle>
              <DialogDescription>
                Fill in the service details below
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Service Title *</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Service title"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description *</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Service description"
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Icon (emoji or icon name)</label>
                  <Input
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    placeholder="e.g., 🎨 or icon-name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Display Order</label>
                  <Input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Features</label>
                <div className="space-y-2">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        placeholder="Feature"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleFeatureRemove(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleFeatureAdd}
                  >
                    Add Feature
                  </Button>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit} disabled={!formData.title || !formData.description}>
                  {editingId ? 'Update' : 'Create'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Services List</CardTitle>
          <CardDescription>Total: {services.length}</CardDescription>
        </CardHeader>
        <CardContent>
          {services.length === 0 ? (
            <p className="text-muted-foreground">No services yet. Create one to get started.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Icon</TableHead>
                  <TableHead>Features</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">{service.title}</TableCell>
                    <TableCell>{service.icon || '-'}</TableCell>
                    <TableCell>{Array.isArray(service.features) ? service.features.length : 0}</TableCell>
                    <TableCell>{service.display_order}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleOpenDialog(service)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <AlertDialog open={deleteId === service.id} onOpenChange={(open) => setDeleteId(open ? service.id : null)}>
                        <button
                          onClick={() => setDeleteId(service.id)}
                          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-destructive hover:text-destructive-foreground h-9 w-9"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Service</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <div className="flex gap-2">
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                          </div>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
