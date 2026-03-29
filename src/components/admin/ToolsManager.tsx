import React, { useState } from 'react';
import { useTools, useCreateTool, useUpdateTool, useDeleteTool } from '@/hooks/useDatabase';
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

export const ToolsManager: React.FC = () => {
  const { data: tools = [], isLoading } = useTools();
  const createTool = useCreateTool();
  const updateTool = useUpdateTool();
  const deleteTool = useDeleteTool();
  
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    icon_url: '',
    proficiency_level: 50,
    years_of_experience: '',
    display_order: 0,
  });

  const handleOpenDialog = (tool?: Tables<'tools'>) => {
    if (tool) {
      setEditingId(tool.id);
      setFormData({
        name: tool.name,
        category: tool.category || '',
        icon_url: tool.icon_url || '',
        proficiency_level: tool.proficiency_level,
        years_of_experience: tool.years_of_experience?.toString() || '',
        display_order: tool.display_order,
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        category: '',
        icon_url: '',
        proficiency_level: 50,
        years_of_experience: '',
        display_order: 0,
      });
    }
    setOpen(true);
  };

  const handleSubmit = async () => {
    try {
      const submitData = {
        name: formData.name,
        category: formData.category || null,
        icon_url: formData.icon_url || null,
        proficiency_level: formData.proficiency_level,
        years_of_experience: formData.years_of_experience ? parseFloat(formData.years_of_experience) : null,
        display_order: formData.display_order,
      };

      if (editingId) {
        await updateTool.mutateAsync({ id: editingId, ...submitData });
      } else {
        await createTool.mutateAsync(submitData);
      }
      setOpen(false);
      setEditingId(null);
      setFormData({
        name: '',
        category: '',
        icon_url: '',
        proficiency_level: 50,
        years_of_experience: '',
        display_order: 0,
      });
    } catch (error) {
      console.error('Error saving tool:', error);
    }
  };

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await deleteTool.mutateAsync(deleteId);
        setDeleteId(null);
      } catch (error) {
        console.error('Error deleting tool:', error);
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
          <h1 className="text-3xl font-bold">Tools & Technologies</h1>
          <p className="text-muted-foreground">Manage your tools and skills</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="w-4 h-4 mr-2" />
              Add Tool
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Tool' : 'Add New Tool'}</DialogTitle>
              <DialogDescription>
                Fill in the tool details below
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Tool Name *</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., React, TypeScript"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g., Frontend, Backend"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Icon</label>
                <ImageUploadField
                  currentImageUrl={formData.icon_url}
                  onImageUrl={(url) => setFormData({ ...formData, icon_url: url })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Proficiency Level (0-100)</label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.proficiency_level}
                    onChange={(e) => setFormData({ ...formData, proficiency_level: parseInt(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Years of Experience</label>
                  <Input
                    type="number"
                    step="0.1"
                    value={formData.years_of_experience}
                    onChange={(e) => setFormData({ ...formData, years_of_experience: e.target.value })}
                  />
                </div>
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
          <CardTitle>Tools List</CardTitle>
          <CardDescription>Total: {tools.length}</CardDescription>
        </CardHeader>
        <CardContent>
          {tools.length === 0 ? (
            <p className="text-muted-foreground">No tools yet. Create one to get started.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Proficiency</TableHead>
                  <TableHead>Experience (Years)</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tools.map((tool) => (
                  <TableRow key={tool.id}>
                    <TableCell className="font-medium">{tool.name}</TableCell>
                    <TableCell>{tool.category || '-'}</TableCell>
                    <TableCell>
                      <div className="w-24 bg-secondary rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${tool.proficiency_level}%` }}
                        />
                      </div>
                    </TableCell>
                    <TableCell>{tool.years_of_experience || '-'}</TableCell>
                    <TableCell>{tool.display_order}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleOpenDialog(tool)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <AlertDialog open={deleteId === tool.id} onOpenChange={(open) => setDeleteId(open ? tool.id : null)}>
                        <button
                          onClick={() => setDeleteId(tool.id)}
                          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-destructive hover:text-destructive-foreground h-9 w-9"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Tool</AlertDialogTitle>
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
