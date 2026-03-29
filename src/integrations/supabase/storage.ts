import { supabase } from './client';

/**
 * Upload an image file to Supabase Storage
 * @param file - The image file to upload
 * @param bucket - The storage bucket name (default: 'portfolio-assets')
 * @param folder - Optional folder path within the bucket
 * @returns Public URL of the uploaded image
 */
export const uploadImage = async (
  file: File,
  bucket = 'portfolio-assets',
  folder = 'images'
): Promise<string> => {
  if (!file) throw new Error('No file provided');

  // Validate file is an image
  if (!file.type.startsWith('image/')) {
    throw new Error('File must be an image');
  }

  // Check file size (max 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    throw new Error('File size must be less than 5MB');
  }

  // Generate unique filename
  const timestamp = Date.now();
  const randomId = Math.random().toString(36).substring(2, 8);
  const fileName = `${timestamp}-${randomId}-${file.name.replace(/\s+/g, '-')}`;
  const filePath = folder ? `${folder}/${fileName}` : fileName;

  try {
    // Upload file
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) throw error;

    // Get public URL
    const { data: publicUrl } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return publicUrl.publicUrl;
  } catch (error) {
    console.error('Upload error:', error);
    throw new Error(`Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Delete an image from Supabase Storage
 * @param filePath - The file path in storage
 * @param bucket - The storage bucket name
 */
export const deleteImage = async (
  filePath: string,
  bucket = 'portfolio-assets'
): Promise<void> => {
  if (!filePath) return;

  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([filePath]);

    if (error) throw error;
  } catch (error) {
    console.error('Delete error:', error);
    // Don't throw, just log - deletion failures shouldn't break the app
  }
};

/**
 * Get file path from public URL
 * @param publicUrl - The public URL
 * @returns The file path
 */
export const getFilePathFromUrl = (publicUrl: string): string => {
  if (!publicUrl) return '';
  const urlParts = publicUrl.split('/storage/v1/object/public/portfolio-assets/');
  return urlParts[1] || '';
};
