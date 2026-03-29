import React, { useState } from 'react';
import { useProjects, useCreateProject, useUpdateProject, useDeleteProject } from '@/hooks/useDatabase';
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
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';
import { ImageUploadField } from './ImageUploadField';

export const ProjectsManager: React.FC = () => {
  const { data: projects = [], isLoading } = useProjects();
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();
  
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    image_url: '',
    link_url: '',
    is_featured: false,
    display_order: 0,
  });

  const handleOpenDialog = (project?: Tables<'projects'>) => {
    if (project) {
      setEditingId(project.id);
      setFormData({
        title: project.title,
        description: project.description,
        category: project.category || '',
        image_url: project.image_url || '',
        link_url: project.link_url || '',
        is_featured: project.is_featured,
        display_order: project.display_order,
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        description: '',
        category: '',
        image_url: '',
        link_url: '',
        is_featured: false,
        display_order: 0,
      });
    }
    setOpen(true);
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await updateProject.mutateAsync({ id: editingId, ...formData });
      } else {
        await createProject.mutateAsync(formData);
      }
      setOpen(false);
      setEditingId(null);
      setFormData({
        title: '',
        description: '',
        category: '',
        image_url: '',
        link_url: '',
        is_featured: false,
        display_order: 0,
      });
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await deleteProject.mutateAsync(deleteId);
        setDeleteId(null);
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Manage your portfolio projects</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Project' : 'Add New Project'}</DialogTitle>
              <DialogDescription>
                Fill in the project details below
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Title *</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Project title"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description *</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Project description"
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g., Web, Mobile"
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
                <label className="text-sm font-medium">Image</label>
                <ImageUploadField
                  currentImageUrl={formData.image_url}
                  onImageUrl={(url) => setFormData({ ...formData, image_url: url })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Project Link</label>
                <Input
                  value={formData.link_url}
                  onChange={(e) => setFormData({ ...formData, link_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="featured"
                  checked={formData.is_featured}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, is_featured: checked as boolean })
                  }
                />
                <label htmlFor="featured" className="text-sm font-medium cursor-pointer">
                  Featured Project
                </label>
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
          <CardTitle>Projects List</CardTitle>
          <CardDescription>Total: {projects.length}</CardDescription>
        </CardHeader>
        <CardContent>
          {projects.length === 0 ? (
            <p className="text-muted-foreground">No projects yet. Create one to get started.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.title}</TableCell>
                    <TableCell>{project.category || '-'}</TableCell>
                    <TableCell>{project.display_order}</TableCell>
                    <TableCell>{project.is_featured ? '✓' : '-'}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleOpenDialog(project)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <AlertDialog open={deleteId === project.id} onOpenChange={(open) => setDeleteId(open ? project.id : null)}>
                        <button
                          onClick={() => setDeleteId(project.id)}
                          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-destructive hover:text-destructive-foreground h-9 w-9"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Project</AlertDialogTitle>
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
