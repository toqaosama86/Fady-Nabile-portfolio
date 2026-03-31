import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Upload, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface FaviconUploadProps {
  currentFaviconUrl?: string;
  onFaviconChange?: (url: string) => void;
}

export function FaviconUpload({ currentFaviconUrl, onFaviconChange }: FaviconUploadProps) {
  const [loading, setLoading] = useState(false);
  const [faviconUrl, setFaviconUrl] = useState(currentFaviconUrl || '');
  const { toast } = useToast();

  useEffect(() => {
    setFaviconUrl(currentFaviconUrl || '');
  }, [currentFaviconUrl]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/x-icon', 'image/png', 'image/jpeg', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload an ICO, PNG, JPEG, or SVG file',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      // Delete old favicon if exists
      if (faviconUrl) {
        const oldPath = faviconUrl.split('/').pop();
        if (oldPath) {
          await supabase.storage.from('portfolio-assets').remove([`favicons/${oldPath}`]);
        }
      }

      // Upload new favicon
      const fileExt = file.name.split('.').pop();
      const fileName = `favicon-${Date.now()}.${fileExt}`;
      const { error: uploadError, data } = await supabase.storage
        .from('portfolio-assets')
        .upload(`favicons/${fileName}`, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: publicUrl } = supabase.storage
        .from('portfolio-assets')
        .getPublicUrl(`favicons/${fileName}`);

      setFaviconUrl(publicUrl.publicUrl);
      onFaviconChange?.(publicUrl.publicUrl);

      toast({
        title: 'Success',
        description: 'Favicon uploaded successfully',
      });

      // Update the actual favicon
      updatePageFavicon(publicUrl.publicUrl);
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Upload failed',
        description: error instanceof Error ? error.message : 'Failed to upload favicon',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updatePageFavicon = (url: string) => {
    let link = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = url;
  };

  const handleDelete = async () => {
    if (!faviconUrl) return;

    setLoading(true);
    try {
      const oldPath = faviconUrl.split('/').pop();
      if (oldPath) {
        await supabase.storage.from('portfolio-assets').remove([`favicons/${oldPath}`]);
      }

      setFaviconUrl('');
      onFaviconChange?.('');

      // Reset to default favicon
      const link = document.querySelector('link[rel="icon"]');
      if (link) {
        link.remove();
      }

      toast({
        title: 'Success',
        description: 'Favicon deleted successfully',
      });
    } catch (error) {
      console.error('Delete error:', error);
      toast({
        title: 'Delete failed',
        description: error instanceof Error ? error.message : 'Failed to delete favicon',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Website Favicon</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {faviconUrl && (
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 border border-border rounded-lg overflow-hidden bg-surface flex items-center justify-center">
              <img src={faviconUrl} alt="Favicon preview" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Current favicon</p>
              <p className="text-xs text-muted-foreground break-all">{faviconUrl}</p>
            </div>
          </div>
        )}

        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
          <input
            type="file"
            accept="image/x-icon,image/png,image/jpeg,image/svg+xml"
            onChange={handleFileUpload}
            disabled={loading}
            className="hidden"
            id="favicon-input"
          />
          <label htmlFor="favicon-input" className="cursor-pointer block">
            <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm font-medium">Click to upload or drag and drop</p>
            <p className="text-xs text-muted-foreground">ICO, PNG, JPEG, or SVG (max 512KB)</p>
          </label>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => document.getElementById('favicon-input')?.click()}
            disabled={loading}
          >
            <Upload className="w-4 h-4 mr-2" />
            {loading ? 'Uploading...' : 'Upload Favicon'}
          </Button>

          {faviconUrl && (
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
              disabled={loading}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          )}
        </div>

        <p className="text-xs text-muted-foreground">
          💡 Tip: Use a square image (512x512px recommended) for best results across devices
        </p>
      </CardContent>
    </Card>
  );
}
