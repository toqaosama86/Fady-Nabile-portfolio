# 📁 Favicon & CV Upload Feature Guide

## Overview

The admin dashboard now includes a dedicated **Uploads** section where you can manage:

1. **✦ Website Favicon** - The icon that appears in browser tabs and bookmarks
2. **📄 CV/Resume** - A downloadable document for visitors

---

## 🚀 Getting Started

### 1. Apply Database Migration

Run this command to add the new favicon and CV settings to your database:

```bash
supabase db push
```

### 2. Access the Uploads Section

1. Go to your admin dashboard: `http://localhost:5173/admin`
2. Sign in with your credentials
3. Click on the **"📁 Uploads"** tab

---

## 🎨 Website Favicon

### What is a Favicon?

A favicon is a small icon (typically 16x16 to 512x512 pixels) that appears:
- In browser tabs
- Browser bookmarks/favorites
- Address bar (on some browsers)
- Search results (some search engines)

### Supported Formats

- **ICO** (traditional favicon format)
- **PNG** (recommended, modern browsers)
- **JPEG** (legacy support)
- **SVG** (vector format)

### Recommended Settings

| Setting | Value |
|---------|-------|
| **Size** | 512x512 pixels (scalable) |
| **Format** | PNG (best compatibility) |
| **Background** | Transparent or matching your brand color |
| **Max File Size** | 512KB |

### How to Upload

1. Click **"Upload Favicon"** button
2. Select an image file from your device
3. The preview will show immediately
4. The favicon automatically updates across all browsers

### Tips

- Use a **square image** (1:1 aspect ratio)
- Make sure it looks good at small sizes
- Test in multiple browsers to ensure compatibility
- Modern browsers cache favicons, so hard refresh your page if changes don't appear

---

## 📄 CV/Resume Upload

### Supported Formats

- **PDF** (recommended)
- **Word Document** (.docx)
- **Legacy Word** (.doc)

### File Requirements

| Requirement | Value |
|-------------|-------|
| **Max File Size** | 10MB |
| **Recommended Size** | 1-5MB |
| **Pages** | 1-3 pages ideal |
| **Format** | PDF or Word |

### How to Upload

1. Click **"Upload CV"** button in the Uploads tab
2. Select your CV/Resume file
3. The file details will be displayed
4. Click **"Download"** to verify the upload

### Where Does It Appear?

Once uploaded, a **"Download CV"** button automatically appears in the **About section** of your portfolio, allowing visitors to download your resume with one click.

### How Visitors Use It

Visitors see:
```
📄 Resume.pdf
Ready for download
[Download] button
```

When they click download, your CV is automatically downloaded to their device.

---

## 🔄 Updating Files

### Changing the Favicon

1. Go to **Uploads** tab
2. Click **"Upload Favicon"** again
3. Select a new image
4. Old favicon is automatically deleted
5. New one is applied immediately

### Changing the CV

1. Go to **Uploads** tab
2. Click **"Upload CV"** again
3. Select your updated document
4. Old CV is automatically deleted
5. New one is available for download

---

## 🗑️ Deleting Files

### Delete Favicon

1. Click the **"Delete"** button next to the favicon
2. The favicon is removed
3. Browser reverts to default icon (if none)

### Delete CV

1. Click the **"Delete"** button on the CV card
2. The CV is removed
3. Download button disappears from About section

---

## 🎯 Pro Tips

### Favicon Optimization

1. **Add Multiple Formats** (Advanced):
   - Use PNG for high-res displays
   - Use ICO for legacy browser support
   - Use SVG for vector scalability

2. **Brand Consistency**:
   - Match your logo or primary color
   - Keep text/details minimal (hard to read at small sizes)
   - Test colors against light and dark backgrounds

3. **Performance**:
   - Compress PNG files to reduce size
   - Use 32x32 or 64x64 as base size
   - Modern browsers will scale as needed

### CV Presentation

1. **PDF Over Word**:
   - PDF maintains formatting across devices
   - Word files may render differently
   - PDF is more professional

2. **Keep It Updated**:
   - Update CV every 3-6 months
   - Add new projects and achievements
   - Remove outdated experience

3. **File Size**:
   - Aim for 2-3MB max
   - Keep to 1-2 pages for easier scanning
   - Compress images in PDF if needed

---

## ✅ Verification Checklist

After uploading:

- [ ] Favicon appears in browser tab
- [ ] Favicon appears in browser bookmarks
- [ ] Favicon doesn't have pixelation at small sizes
- [ ] CV button appears in About section
- [ ] CV downloads successfully
- [ ] CV file opens correctly on different devices
- [ ] File sizes are reasonable (not too large)

---

## 🐛 Troubleshooting

### Favicon Not Appearing

**Solution:**
1. Hard refresh your browser: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. Clear browser cache
3. Check in an incognito/private window
4. Try a different browser

### CV Download Not Working

**Solution:**
1. Check file size (max 10MB)
2. Ensure file is valid PDF or Word
3. Try uploading again
4. Check browser console for errors

### File Upload Fails

**Solution:**
1. Check internet connection
2. Verify file format is supported
3. Check file isn't corrupted
4. Try a smaller file size
5. Check browser support (use Chrome/Firefox)

---

## 📱 Browser Compatibility

| Browser | Favicon | CV Download |
|---------|---------|------------|
| Chrome | ✅ Yes | ✅ Yes |
| Firefox | ✅ Yes | ✅ Yes |
| Safari | ✅ Yes | ✅ Yes |
| Edge | ✅ Yes | ✅ Yes |
| Opera | ✅ Yes | ✅ Yes |

---

## 🔐 Security & Privacy

- All uploads are private to your portfolio
- Files are stored securely in Supabase Storage
- Only visible to your website visitors (CV)
- Favicon is visible in browser chrome
- No personal data collection

---

## 📞 Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Verify database migration ran successfully: `supabase db push`
3. Clear browser cache and try again
4. Check browser console for error messages
5. Restart development server: `npm run dev`

---

**Last Updated:** March 31, 2026

For more help with admin features, see [DESIGN_SETTINGS_GUIDE.md](DESIGN_SETTINGS_GUIDE.md) and [ADMIN_DASHBOARD_SETUP.md](ADMIN_DASHBOARD_SETUP.md).
