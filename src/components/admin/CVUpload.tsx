import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Upload, Trash2, Download, FileText } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface CVUploadProps {
  currentCvUrl?: string;
  onCvChange?: (url: string) => void;
}

export function CVUpload({ currentCvUrl, onCvChange }: CVUploadProps) {
  const [loading, setLoading] = useState(false);
  const [cvUrl, setCvUrl] = useState(currentCvUrl || '');
  const [fileName, setFileName] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    setCvUrl(currentCvUrl || '');
    if (currentCvUrl) {
      const name = currentCvUrl.split('/').pop()?.split('-').slice(1).join('-') || 'CV';
      setFileName(name);
    }
  }, [currentCvUrl]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type and size
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload a PDF or Word document',
        variant: 'destructive',
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast({
        title: 'File too large',
        description: 'Maximum file size is 10MB',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      // Delete old CV if exists
      if (cvUrl) {
        const oldPath = cvUrl.split('/').pop();
        if (oldPath) {
          await supabase.storage.from('portfolio-assets').remove([`cvs/${oldPath}`]);
        }
      }

      // Upload new CV
      const fileExt = file.name.split('.').pop();
      const uploadFileName = `cv-${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('portfolio-assets')
        .upload(`cvs/${uploadFileName}`, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: publicUrl } = supabase.storage
        .from('portfolio-assets')
        .getPublicUrl(`cvs/${uploadFileName}`);

      setCvUrl(publicUrl.publicUrl);
      setFileName(file.name);
      onCvChange?.(publicUrl.publicUrl);

      toast({
        title: 'Success',
        description: 'CV uploaded successfully',
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Upload failed',
        description: error instanceof Error ? error.message : 'Failed to upload CV',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!cvUrl) return;

    setLoading(true);
    try {
      const oldPath = cvUrl.split('/').pop();
      if (oldPath) {
        await supabase.storage.from('portfolio-assets').remove([`cvs/${oldPath}`]);
      }

      setCvUrl('');
      setFileName('');
      onCvChange?.('');

      toast({
        title: 'Success',
        description: 'CV deleted successfully',
      });
    } catch (error) {
      console.error('Delete error:', error);
      toast({
        title: 'Delete failed',
        description: error instanceof Error ? error.message : 'Failed to delete CV',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Download CV</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {cvUrl && fileName && (
          <div className="flex items-center gap-4 p-4 bg-surface rounded-lg border border-border">
            <FileText className="w-8 h-8 text-primary flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{fileName}</p>
              <p className="text-xs text-muted-foreground">Ready for download</p>
            </div>
            <Button
              size="sm"
              variant="outline"
              asChild
            >
              <a href={cvUrl} download target="_blank" rel="noopener noreferrer">
                <Download className="w-4 h-4 mr-2" />
                Download
              </a>
            </Button>
          </div>
        )}

        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
          <input
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleFileUpload}
            disabled={loading}
            className="hidden"
            id="cv-input"
          />
          <label htmlFor="cv-input" className="cursor-pointer block">
            <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm font-medium">Click to upload or drag and drop</p>
            <p className="text-xs text-muted-foreground">PDF or Word document (max 10MB)</p>
          </label>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => document.getElementById('cv-input')?.click()}
            disabled={loading}
          >
            <Upload className="w-4 h-4 mr-2" />
            {loading ? 'Uploading...' : 'Upload CV'}
          </Button>

          {cvUrl && (
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
          💡 Tip: Upload your resume/CV here and visitors can download it with a single click
        </p>
      </CardContent>
    </Card>
  );
}
