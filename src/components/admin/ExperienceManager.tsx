import React, { useState } from 'react';
import { useExperience, useCreateExperience, useUpdateExperience, useDeleteExperience } from '@/hooks/useDatabase';
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
import { AdminLoadingSkeleton } from './AdminLoadingSkeleton';

export const ExperienceManager: React.FC = () => {
  const { data: experience = [], isLoading } = useExperience();
  const createExperience = useCreateExperience();
  const updateExperience = useUpdateExperience();
  const deleteExperience = useDeleteExperience();
  
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    company_name: '',
    position: '',
    description: '',
    start_date: '',
    end_date: '',
    is_current: false,
    skills: [] as string[],
    display_order: 0,
  });

  const handleOpenDialog = (exp?: Tables<'experience'>) => {
    if (exp) {
      setEditingId(exp.id);
      setFormData({
        company_name: exp.company_name,
        position: exp.position,
        description: exp.description || '',
        start_date: exp.start_date || '',
        end_date: exp.end_date || '',
        is_current: exp.is_current,
        skills: (Array.isArray(exp.skills) ? exp.skills : []) as string[],
        display_order: exp.display_order,
      });
    } else {
      setEditingId(null);
      setFormData({
        company_name: '',
        position: '',
        description: '',
        start_date: '',
        end_date: '',
        is_current: false,
        skills: [],
        display_order: 0,
      });
    }
    setOpen(true);
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await updateExperience.mutateAsync({ id: editingId, ...formData });
      } else {
        await createExperience.mutateAsync(formData);
      }
      setOpen(false);
      setEditingId(null);
      setFormData({
        company_name: '',
        position: '',
        description: '',
        start_date: '',
        end_date: '',
        is_current: false,
        skills: [],
        display_order: 0,
      });
    } catch (error) {
      console.error('Error saving experience:', error);
    }
  };

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await deleteExperience.mutateAsync(deleteId);
        setDeleteId(null);
      } catch (error) {
        console.error('Error deleting experience:', error);
      }
    }
  };

  const handleSkillAdd = () => {
    setFormData({
      ...formData,
      skills: [...formData.skills, ''],
    });
  };

  const handleSkillChange = (index: number, value: string) => {
    const newSkills = [...formData.skills];
    newSkills[index] = value;
    setFormData({
      ...formData,
      skills: newSkills,
    });
  };

  const handleSkillRemove = (index: number) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((_, i) => i !== index),
    });
  };

  if (isLoading) {
    return <AdminLoadingSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Experience</h1>
          <p className="text-muted-foreground">Manage your work experience</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="w-4 h-4 mr-2" />
              Add Experience
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Experience' : 'Add New Experience'}</DialogTitle>
              <DialogDescription>
                Fill in the experience details below
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Company Name *</label>
                <Input
                  value={formData.company_name}
                  onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                  placeholder="Company name"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Position *</label>
                <Input
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  placeholder="Job title"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Job description"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Start Date</label>
                  <Input
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">End Date</label>
                  <Input
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="current"
                  checked={formData.is_current}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, is_current: checked as boolean })
                  }
                />
                <label htmlFor="current" className="text-sm font-medium cursor-pointer">
                  Currently Working Here
                </label>
              </div>
              <div>
                <label className="text-sm font-medium">Skills</label>
                <div className="space-y-2">
                  {formData.skills.map((skill, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={skill}
                        onChange={(e) => handleSkillChange(index, e.target.value)}
                        placeholder="Skill"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSkillRemove(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSkillAdd}
                  >
                    Add Skill
                  </Button>
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
                <Button onClick={handleSubmit} disabled={!formData.company_name || !formData.position}>
                  {editingId ? 'Update' : 'Create'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Experience List</CardTitle>
          <CardDescription>Total: {experience.length}</CardDescription>
        </CardHeader>
        <CardContent>
          {experience.length === 0 ? (
            <p className="text-muted-foreground">No experience yet. Create one to get started.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Position</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Current</TableHead>
                  <TableHead>Skills</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {experience.map((exp) => (
                  <TableRow key={exp.id}>
                    <TableCell className="font-medium">{exp.position}</TableCell>
                    <TableCell>{exp.company_name}</TableCell>
                    <TableCell>{exp.is_current ? '✓' : '-'}</TableCell>
                    <TableCell>{Array.isArray(exp.skills) ? exp.skills.length : 0}</TableCell>
                    <TableCell>{exp.display_order}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleOpenDialog(exp)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <AlertDialog open={deleteId === exp.id} onOpenChange={(open) => setDeleteId(open ? exp.id : null)}>
                        <button
                          onClick={() => setDeleteId(exp.id)}
                          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-destructive hover:text-destructive-foreground h-9 w-9"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Experience</AlertDialogTitle>
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
