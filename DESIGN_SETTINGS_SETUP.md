# Design & Layout Feature - Setup Instructions

## What Was Added

Your admin dashboard now includes full control over:
1. ✅ **All Portfolio Colors** - Primary, accent, backgrounds, surfaces
2. ✅ **Font Families** - Heading and body text fonts
3. ✅ **Section Order** - Reorder sections on the homepage
4. ✅ **Section Visibility** - Show/hide sections without deleting content

## New Files Created

### Components
- `src/components/admin/ColorPicker.tsx` - HSL color picker with visual preview
- `src/components/admin/SectionReordering.tsx` - Drag & reorder sections

### Hooks
- `src/hooks/useDesignSettings.ts` - Applies dynamic colors/fonts from database

### Database
- `supabase/migrations/20260331120000_add_design_settings.sql` - Initializes design settings

### Documentation
- `DESIGN_SETTINGS_GUIDE.md` - Complete user guide

## Setup Instructions (5 Minutes)

### Step 1: Apply Database Migration
```bash
# From your project root
supabase db push
```

This will:
- Initialize default color settings
- Initialize default font settings
- Initialize section order
- Set all sections as visible by default

### Step 2: Verify Installation
1. Start your dev server: `npm run dev` or `bun run dev`
2. Navigate to: **http://localhost:5173/admin**
3. Login with your admin account
4. Click on the **Design & Layout** tab
5. You should see:
   - Color picker inputs
   - Font family dropdowns
   - Section reordering interface

### Step 3: Test Color Settings
1. Click any color field (e.g., "Primary Color")
2. Change the HSL value (e.g., from `38 90% 55%` to `210 100% 50%` for blue)
3. Click "Save Design & Layout"
4. Go to your homepage and see the colors update!

### Step 4: Test Section Reordering
1. In **Design & Layout** tab, scroll to "Section Order & Visibility"
2. Use ↑/↓ arrows to reorder sections
3. Click eye icon to hide a section
4. Click "Save Design & Layout"
5. Go home and see sections in new order!

## Features Explained

### Color Picker
- **HSL Format**: Use `hue saturation% lightness%` format
- **Advanced Mode**: Click "Show Advanced" for visual sliders
- **Live Preview**: See color while editing

### Font Selection
- Choose from 7 professional font families
- Separate fonts for headings and body text
- Changes apply instantly to the entire site

### Section Management
- **Reorder**: Use arrow buttons to change display order
- **Visibility**: Eye icon toggles section visibility
- **Position Number**: Shows current position
- **Navbar**: Always visible at top, not included in reordering

## Common Tasks

### Change All Colors to Blue Theme
1. Primary Color: `210 100% 50%`
2. Accent Color: `45 100% 50%`
3. Gold Color: `210 100% 50%`
4. Background: `220 20% 10%`
5. Save

### Hide Sections
1. Go to Section Order & Visibility
2. Click eye icon next to sections you want to hide
3. Save

### Reorder to Showcase Projects First
1. Click Project section arrows to move it up
2. Click About section arrows to move it down
3. Save

## Database Changes

The database migration adds these settings automatically:

### Color Settings
```
color_primary, color_accent, color_gold, color_gold_light, color_gold_dark,
color_background, color_surface, color_surface_elevated, color_secondary, color_muted
```

### Font Settings
```
font_family_heading, font_family_body
```

### Section Settings
```
section_order (comma-separated list)
section_[name]_visible (true/false for each section)
```

## What Changed in Existing Files

### `src/pages/Index.tsx`
- Now imports `useDesignSettings` hook
- Now imports `useSettings` for section configuration
- Renders sections dynamically based on database settings
- Applies custom section order and visibility

### `src/components/admin/SettingsManager.tsx`
- Added "Design & Layout" tab
- Added color picker UI
- Added font family dropdown
- Added section reordering UI
- Now manages 10+ color settings
- Now handles section order persistence

## Troubleshooting

### Compilation Errors
If you see TypeScript errors, run:
```bash
npm install  # or bun install
```

### Colors Not Updating
1. Check browser console for errors: F12 → Console tab
2. Ensure database migration ran successfully
3. Try clearing browser cache: Ctrl+Shift+Delete
4. Restart dev server

### Migration Failed
```bash
# Reset database and reapply
supabase db reset
```

### Select Component Missing
The Select component should be at `src/components/ui/select.tsx`. If missing, regenerate it:
```bash
npx shadcn-ui@latest add select
```

## Next Steps

1. ✅ Run migration: `supabase db push`
2. ✅ Test in admin dashboard
3. ✅ Create your custom color scheme
4. ✅ Reorder sections
5. ✅ Choose your preferred fonts

## Support

For issues or questions:
1. Check `DESIGN_SETTINGS_GUIDE.md` for user documentation
2. Review component code in `src/components/admin/`
3. Check Supabase logs for database errors

---

**Ready to customize?** Go to `/admin` → **Design & Layout** tab and start creating your unique portfolio!
