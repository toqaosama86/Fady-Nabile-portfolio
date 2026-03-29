import React, { useState } from 'react';
import { Upload, Loader, X } from 'lucide-react';
import { uploadImage } from '@/integrations/supabase/storage';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

interface ImageUploadProps {
  onImageUrl: (url: string) => void;
  currentImageUrl?: string;
  className?: string;
}

export const ImageUploadField: React.FC<ImageUploadProps> = ({
  onImageUrl,
  currentImageUrl,
  className = '',
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [preview, setPreview] = useState<string>(currentImageUrl || '');

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError('');

    try {
      // Show preview immediately
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Upload to Supabase
      const url = await uploadImage(file);
      onImageUrl(url);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to upload image';
      setError(errorMessage);
      setPreview(currentImageUrl || '');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = () => {
    setPreview('');
    onImageUrl('');
    setError('');
  };

  return (
    <div className={className}>
      <div className="space-y-2">
        {/* Preview */}
        {preview && (
          <div className="relative w-full h-40 rounded-lg overflow-hidden border border-gray-200">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Upload Area */}
        <label className="block">
          <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition-colors cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={isLoading}
              className="sr-only"
            />
            <div className="flex flex-col items-center justify-center space-y-2">
              {isLoading ? (
                <>
                  <Loader className="w-8 h-8 text-blue-500 animate-spin" />
                  <p className="text-sm text-gray-600">Uploading...</p>
                </>
              ) : (
                <>
                  <Upload className="w-8 h-8 text-gray-400" />
                  <p className="text-sm font-medium text-gray-700">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                </>
              )}
            </div>
          </div>
        </label>

        {/* Error Message */}
        {error && (
          <div className="flex items-start space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};
