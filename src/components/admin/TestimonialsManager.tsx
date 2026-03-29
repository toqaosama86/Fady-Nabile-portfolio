import React, { useState } from 'react';
import { useTestimonials, useCreateTestimonial, useUpdateTestimonial, useDeleteTestimonial } from '@/hooks/useDatabase';
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
import { Plus, Pencil, Trash2, Star } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';
import { ImageUploadField } from './ImageUploadField';
import { AdminLoadingSkeleton } from './AdminLoadingSkeleton';

export const TestimonialsManager: React.FC = () => {
  const { data: testimonials = [], isLoading } = useTestimonials();
  const createTestimonial = useCreateTestimonial();
  const updateTestimonial = useUpdateTestimonial();
  const deleteTestimonial = useDeleteTestimonial();
  
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    author_name: '',
    author_title: '',
    author_image_url: '',
    content: '',
    rating: 5,
    display_order: 0,
  });

  const handleOpenDialog = (testimonial?: Tables<'testimonials'>) => {
    if (testimonial) {
      setEditingId(testimonial.id);
      setFormData({
        author_name: testimonial.author_name,
        author_title: testimonial.author_title || '',
        author_image_url: testimonial.author_image_url || '',
        content: testimonial.content,
        rating: testimonial.rating,
        display_order: testimonial.display_order,
      });
    } else {
      setEditingId(null);
      setFormData({
        author_name: '',
        author_title: '',
        author_image_url: '',
        content: '',
        rating: 5,
        display_order: 0,
      });
    }
    setOpen(true);
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await updateTestimonial.mutateAsync({ id: editingId, ...formData });
      } else {
        await createTestimonial.mutateAsync(formData);
      }
      setOpen(false);
      setEditingId(null);
      setFormData({
        author_name: '',
        author_title: '',
        author_image_url: '',
        content: '',
        rating: 5,
        display_order: 0,
      });
    } catch (error) {
      console.error('Error saving testimonial:', error);
    }
  };

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await deleteTestimonial.mutateAsync(deleteId);
        setDeleteId(null);
      } catch (error) {
        console.error('Error deleting testimonial:', error);
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
          <h1 className="text-3xl font-bold">Testimonials</h1>
          <p className="text-muted-foreground">Manage client testimonials</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="w-4 h-4 mr-2" />
              Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Testimonial' : 'Add New Testimonial'}</DialogTitle>
              <DialogDescription>
                Fill in the testimonial details below
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Author Name *</label>
                <Input
                  value={formData.author_name}
                  onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                  placeholder="Author name"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Author Title</label>
                <Input
                  value={formData.author_title}
                  onChange={(e) => setFormData({ ...formData, author_title: e.target.value })}
                  placeholder="e.g., CEO at Company"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Author Image</label>
                <ImageUploadField
                  currentImageUrl={formData.author_image_url}
                  onImageUrl={(url) => setFormData({ ...formData, author_image_url: url })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Testimonial Content *</label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Testimonial text"
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Rating (1-5)</label>
                  <Input
                    type="number"
                    min="1"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
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
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit} disabled={!formData.author_name || !formData.content}>
                  {editingId ? 'Update' : 'Create'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Testimonials List</CardTitle>
          <CardDescription>Total: {testimonials.length}</CardDescription>
        </CardHeader>
        <CardContent>
          {testimonials.length === 0 ? (
            <p className="text-muted-foreground">No testimonials yet. Create one to get started.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Author</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {testimonials.map((testimonial) => (
                  <TableRow key={testimonial.id}>
                    <TableCell className="font-medium">{testimonial.author_name}</TableCell>
                    <TableCell>{testimonial.author_title || '-'}</TableCell>
                    <TableCell>
                      <div className="flex">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{testimonial.display_order}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleOpenDialog(testimonial)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <AlertDialog open={deleteId === testimonial.id} onOpenChange={(open) => setDeleteId(open ? testimonial.id : null)}>
                        <button
                          onClick={() => setDeleteId(testimonial.id)}
                          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-destructive hover:text-destructive-foreground h-9 w-9"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Testimonial</AlertDialogTitle>
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
