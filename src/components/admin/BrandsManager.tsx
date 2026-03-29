import React, { useState } from 'react';
import { useBrands, useCreateBrand, useUpdateBrand, useDeleteBrand } from '@/hooks/useDatabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { ImageUploadField } from './ImageUploadField';
import { AdminLoadingSkeleton } from './AdminLoadingSkeleton';

export const BrandsManager: React.FC = () => {
  const { data: brands = [], isLoading } = useBrands();
  const createBrand = useCreateBrand();
  const updateBrand = useUpdateBrand();
  const deleteBrand = useDeleteBrand();
  
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    logo_url: '',
    link_url: '',
    display_order: 0,
  });

  const handleOpenDialog = (brand?: Tables<'brands'>) => {
    if (brand) {
      setEditingId(brand.id);
      setFormData({
        name: brand.name,
        logo_url: brand.logo_url || '',
        link_url: brand.link_url || '',
        display_order: brand.display_order,
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        logo_url: '',
        link_url: '',
        display_order: 0,
      });
    }
    setOpen(true);
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await updateBrand.mutateAsync({ id: editingId, ...formData });
      } else {
        await createBrand.mutateAsync(formData);
      }
      setOpen(false);
      setEditingId(null);
      setFormData({
        name: '',
        logo_url: '',
        link_url: '',
        display_order: 0,
      });
    } catch (error) {
      console.error('Error saving brand:', error);
    }
  };

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await deleteBrand.mutateAsync(deleteId);
        setDeleteId(null);
      } catch (error) {
        console.error('Error deleting brand:', error);
      }
    }
  };

  if (isLoading) {
    return <AdminLoadingSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Brands</h1>
          <p className="text-muted-foreground">Manage brands and logos</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="w-4 h-4 mr-2" />
              Add Brand
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Brand' : 'Add New Brand'}</DialogTitle>
              <DialogDescription>
                Fill in the brand details below
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Brand Name *</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Brand name"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Logo</label>
                <ImageUploadField
                  currentImageUrl={formData.logo_url}
                  onImageUrl={(url) => setFormData({ ...formData, logo_url: url })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Link URL</label>
                <Input
                  value={formData.link_url}
                  onChange={(e) => setFormData({ ...formData, link_url: e.target.value })}
                  placeholder="https://..."
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
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit} disabled={!formData.name}>
                  {editingId ? 'Update' : 'Create'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Brands List</CardTitle>
          <CardDescription>Total: {brands.length}</CardDescription>
        </CardHeader>
        <CardContent>
          {brands.length === 0 ? (
            <p className="text-muted-foreground">No brands yet. Create one to get started.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {brands.map((brand) => (
                  <TableRow key={brand.id}>
                    <TableCell className="font-medium">{brand.name}</TableCell>
                    <TableCell>{brand.display_order}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleOpenDialog(brand)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <AlertDialog open={deleteId === brand.id} onOpenChange={(open) => setDeleteId(open ? brand.id : null)}>
                        <button
                          onClick={() => setDeleteId(brand.id)}
                          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-destructive hover:text-destructive-foreground h-9 w-9"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Brand</AlertDialogTitle>
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
