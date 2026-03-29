import React, { useState } from 'react';
import { useSettings, useCreateSetting, useUpdateSetting, useDeleteSetting } from '@/hooks/useDatabase';
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

export const SettingsManager: React.FC = () => {
  const { data: settings = [], isLoading } = useSettings();
  const createSetting = useCreateSetting();
  const updateSetting = useUpdateSetting();
  const deleteSetting = useDeleteSetting();
  
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    key: '',
    value: '',
  });

  const handleOpenDialog = (setting?: Tables<'settings'>) => {
    if (setting) {
      setEditingId(setting.id);
      setFormData({
        key: setting.key,
        value: typeof setting.value === 'string' ? setting.value : JSON.stringify(setting.value),
      });
    } else {
      setEditingId(null);
      setFormData({
        key: '',
        value: '',
      });
    }
    setOpen(true);
  };

  const handleSubmit = async () => {
    try {
      let value: any = formData.value;
      
      // Try to parse as JSON, otherwise keep as string
      try {
        value = JSON.parse(formData.value);
      } catch {
        // Keep as string
      }

      if (editingId) {
        await updateSetting.mutateAsync({ 
          id: editingId, 
          key: formData.key,
          value: value
        });
      } else {
        await createSetting.mutateAsync({ 
          key: formData.key,
          value: value
        });
      }
      setOpen(false);
      setEditingId(null);
      setFormData({
        key: '',
        value: '',
      });
    } catch (error) {
      console.error('Error saving setting:', error);
    }
  };

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await deleteSetting.mutateAsync(deleteId);
        setDeleteId(null);
      } catch (error) {
        console.error('Error deleting setting:', error);
      }
    }
  };

  if (isLoading) {
    return <AdminLoadingSkeleton />;
  }

  const commonSettings = [
    { key: 'site_title', description: 'Site title' },
    { key: 'site_description', description: 'Meta description' },
    { key: 'email', description: 'Contact email' },
    { key: 'phone', description: 'Contact phone' },
    { key: 'resume_url', description: 'Resume/CV URL' },
    { key: 'github_url', description: 'GitHub profile URL' },
    { key: 'linkedin_url', description: 'LinkedIn profile URL' },
    { key: 'twitter_url', description: 'Twitter profile URL' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage portfolio settings and metadata</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="w-4 h-4 mr-2" />
              Add Setting
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Setting' : 'Add New Setting'}</DialogTitle>
              <DialogDescription>
                Fill in the setting details below. Value can be JSON for complex data.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Setting Key *</label>
                <Input
                  value={formData.key}
                  onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                  placeholder="e.g., site_title"
                  disabled={!!editingId}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Common keys: {commonSettings.map(s => s.key).join(', ')}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium">Value *</label>
                <Textarea
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  placeholder="Setting value (can be JSON)"
                  rows={4}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit} disabled={!formData.key || !formData.value}>
                  {editingId ? 'Update' : 'Create'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick Add Common Settings */}
      {settings.length === 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg">Quick Setup</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Add common settings to get started quickly:
            </p>
            <div className="grid grid-cols-2 gap-2">
              {commonSettings.map((setting) => (
                <Button
                  key={setting.key}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setFormData({ key: setting.key, value: '' });
                    setOpen(true);
                  }}
                >
                  {setting.description}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Settings List</CardTitle>
          <CardDescription>Total: {settings.length}</CardDescription>
        </CardHeader>
        <CardContent>
          {settings.length === 0 ? (
            <p className="text-muted-foreground">No settings yet. Create one to get started.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Key</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {settings.map((setting) => (
                  <TableRow key={setting.id}>
                    <TableCell className="font-medium font-mono text-sm">{setting.key}</TableCell>
                    <TableCell className="max-w-md truncate text-sm">
                      {typeof setting.value === 'string' 
                        ? setting.value 
                        : JSON.stringify(setting.value)}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleOpenDialog(setting)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <AlertDialog open={deleteId === setting.id} onOpenChange={(open) => setDeleteId(open ? setting.id : null)}>
                        <button
                          onClick={() => setDeleteId(setting.id)}
                          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-destructive hover:text-destructive-foreground h-9 w-9"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Setting</AlertDialogTitle>
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
