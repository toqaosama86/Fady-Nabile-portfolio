# Design & Layout Management Guide

This guide explains how to use the new Design & Layout management features in your admin dashboard.

## Features Added

### 1. **Dynamic Color Management**
Control all primary colors on your portfolio with intuitive color pickers.

**Managed Colors:**
- **Primary Color** - Main accent color (default: Gold)
- **Accent Color** - Used for highlights and interactive elements
- **Gold Color** - Featured accent (dark theme gold)
- **Gold Light** - Lighter variant for backgrounds
- **Gold Dark** - Darker variant for text
- **Background Color** - Main page background
- **Surface Color** - Card and component backgrounds
- **Surface Elevated** - Elevated surfaces (dialogs, modals)
- **Secondary Color** - Secondary elements
- **Muted Color** - Inactive or secondary text

**How to Use:**
1. Go to Admin Dashboard → **Design & Layout** tab
2. Click on any color field to reveal the color inputs
3. Choose to use:
   - **HSL Format Input**: Type like `38 90% 55%` (Hue, Saturation, Lightness)
   - **Advanced Sliders**: Click "Show Advanced" for visual sliders
4. Click **Save Design & Layout** to apply changes

**Color Format:**
- Colors use HSL (Hue, Saturation, Lightness) format
- Hue: 0-360 degrees
- Saturation: 0-100%
- Lightness: 0-100%

Example: `38 90% 55%` = Gold color

### 2. **Font Family Customization**
Choose different font families for headings and body text.

**Font Options:**
- Space Grotesk (default heading)
- Inter (default body)
- Poppins
- Roboto
- Montserrat
- Playfair Display
- Lora

**How to Use:**
1. Go to Admin Dashboard → **Design & Layout** tab
2. Select **Heading Font** - used for h1, h2, h3, etc.
3. Select **Body Font** - used for body text, paragraphs
4. Click **Save Design & Layout** to apply

### 3. **Section Reordering & Visibility**
Control which sections appear and in what order.

**Available Sections:**
- Hero
- About
- Stats
- Showreel
- Projects
- Brands
- Services
- Experience
- Testimonials
- Process
- Tools
- Contact
- Footer

**How to Use:**
1. Go to Admin Dashboard → **Design & Layout** tab
2. Scroll to **Section Order & Visibility**
3. **Reorder Sections**: Use ↑/↓ buttons to change display order
4. **Show/Hide Sections**: Click the eye icon to toggle visibility
5. Click **Save Design & Layout** to apply

**Tips:**
- Navbar is always visible at the top
- Use eye icon to quickly hide sections without deleting content
- Changes take effect immediately after saving

## Technical Details

### Database
All settings are stored in the `public.settings` table with HSL color format for easy CSS integration.

### CSS Variables
Colors are applied as CSS custom properties (CSS variables) to the root element:
- `--primary`, `--accent`, `--gold`, etc.
- `--font-heading`, `--font-body`

### Default Settings
If you haven't changed any settings, the default configuration is:
```
Primary Color: 38 90% 55% (Gold)
Background: 240 15% 5% (Dark)
Font Heading: Space Grotesk
Font Body: Inter
Sections: All visible in standard order
```

## Troubleshooting

### Colors Not Updating
1. Clear browser cache (Ctrl+Shift+Delete)
2. Ensure settings were saved (check for "Saved!" toast)
3. Verify the HSL format is correct (spaces between values)

### Fonts Not Changing
1. Make sure you clicked "Save Design & Layout"
2. Check browser console for any errors
3. Fonts load from Google Fonts API

### Sections Not Reordering
1. Save the changes by clicking the Save button
2. Refresh the page to see updated order
3. Ensure at least one section is visible

### Missing Colors in Color Picker
- All 10 primary colors are available
- For custom colors not in the list, use HSL format directly
- Examples: `0 0% 50%` (gray), `255 100% 50%` (pure red)

## Best Practices

1. **Test Changes**: After updating colors, check how they look across sections
2. **Maintain Contrast**: Ensure foreground text is visible on backgrounds
3. **Keep Consistency**: Use complementary colors for cohesive design
4. **Mobile Testing**: Check responsiveness after layout changes
5. **Backup Settings**: Note down preferred color values for future reference

## Example Workflows

### Create a Different Color Scheme

**Cool Blue Theme:**
- Primary: `210 100% 50%` (Blue)
- Accent: `45 100% 50%` (Cyan)
- Gold: `210 100% 50%` (Match primary)
- Background: `220 20% 10%` (Dark blue)

**Warm Bronze Theme:**
- Primary: `30 100% 45%` (Bronze)
- Accent: `15 100% 50%` (Orange)
- Gold: `30 100% 45%` (Match primary)
- Background: `25 30% 10%` (Warm dark)

### Minimalist Layout

1. Go to Design & Layout
2. Hide sections with eye icons: Process, Brands
3. Keep these visible: Hero, About, Projects, Contact
4. Reorder to: Hero → Projects → About → Contact
5. Save

## API Reference

### Available Settings Keys
```
color_primary
color_accent
color_gold
color_gold_light
color_gold_dark
color_background
color_surface
color_surface_elevated
color_secondary
color_muted
font_family_heading
font_family_body
section_order
section_[name]_visible (e.g., section_hero_visible)
```

## Security Notes
- Only authenticated admins can modify design settings
- Changes are immediately reflected on the public site
- All changes are logged via Supabase RLS policies
