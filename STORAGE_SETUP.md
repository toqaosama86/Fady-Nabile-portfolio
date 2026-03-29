# Supabase Storage Setup Guide

## Image Upload Configuration

The admin dashboard includes image upload functionality using Supabase Storage. Follow these steps to set it up:

## Step 1: Create a Storage Bucket

1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Click **Storage** in the left sidebar
4. Click **Create a new bucket**
5. Enter bucket name: `portfolio-assets`
6. Keep it **Public** (important for serving images)
7. Click **Create bucket**

## Step 2: Set Storage Policies (RLS)

The bucket is automatically set to public, which means everyone can read files. This is perfect for serving portfolio images.

## Step 3: Upload Images via Admin Dashboard

Once the bucket is created, you can:

1. Go to **Admin Dashboard** → **Projects** → **Add Project**
2. Click the image upload area to select an image
3. The image is automatically uploaded to Supabase Storage
4. The public URL is automatically populated in the form

## Supported Image Types

- PNG (.png)
- JPEG (.jpg, .jpeg)
- GIF (.gif)
- WebP (.webp)
- Max file size: 5MB

## Image Upload Fields in Admin Dashboard

The following sections support image uploads:

### Projects
- **Image**: Project thumbnail/cover image

### Brands
- **Logo**: Brand logo image

### Testimonials
- **Author Image**: Profile picture of testimonial author

### Tools
- **Icon URL**: (Coming soon) Technology/skill icon

### Services
- (No image upload currently)

## Troubleshooting

### "Failed to upload image" Error

**Possible causes:**
- ❌ Bucket `portfolio-assets` doesn't exist
  - **Solution**: Create it following Step 1 above
- ❌ Bucket is not set to Public
  - **Solution**: Open bucket settings and set it to Public
- ❌ File is too large (>5MB)
  - **Solution**: Compress image before uploading
- ❌ File type is not supported
  - **Solution**: Use PNG, JPG, GIF, or WebP only

### Images Not Displaying

- Check that the bucket is **Public** (not Private)
- Verify the image was successfully uploaded (check Storage section)
- Clear browser cache and reload

## Direct Image URL Format

Once uploaded, images have this URL format:
```
https://[PROJECT-ID].supabase.co/storage/v1/object/public/portfolio-assets/[IMAGE-PATH]
```

Example:
```
https://eeumulaggmugotyfuqcs.supabase.co/storage/v1/object/public/portfolio-assets/images/1711612345-abc123-project.jpg
```

## Best Practices

1. **Image Size**: Keep images under 2MB for fastest loading
2. **Format**: Use WebP for best compression, JPEG as fallback
3. **Dimensions**:
   - Projects: 800x600 px or similar aspect ratio
   - Brands: 200x200 px (square)
   - Testimonials: 80x80 px (profile pictures)
4. **Alt Text**: Always add descriptive alt text (done automatically)

## Using Images from External URLs

You can also paste external image URLs directly:
- AWS S3 URLs
- Cloudinary URLs
- CDN links
- Any publicly accessible image URL

Just paste the URL in the image field when not using the upload feature.

## Bulk Image Upload

If you need to upload many images at once:

1. Upload images to Supabase Storage first
2. Get the public URLs
3. Paste them in the image fields

Or use the Supabase dashboard's file browser for bulk uploads.

## Delete Unused Images

Images are automatically managed - images no longer in use are not deleted to prevent broken links. To clean up:

1. Go to Supabase Dashboard → Storage
2. Click the `portfolio-assets` bucket
3. Delete files manually as needed

## Security & Performance

- ✅ Images served from Supabase CDN (fast)
- ✅ Bucket is public (images are visible)
- ✅ Files are isolated in `portfolio-assets` bucket
- ✅ No direct database storage (saves bandwidth)
- ✅ Automatic URL generation

That's it! Your image upload is now ready to use 🎉
