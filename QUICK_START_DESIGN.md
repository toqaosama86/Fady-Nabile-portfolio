# Quick Start - Design & Layout Feature

## 🎨 Color Management
Go to **Admin → Design & Layout → Color settings**
- 10 customizable colors
- HSL format (e.g., `38 90% 55%`)
- Advanced sliders for visual adjustment
- Preview colors before saving

## 🔤 Font Customization  
Go to **Admin → Design & Layout → Font Family settings**
- Choose heading font (h1, h2, h3...)
- Choose body font (paragraphs, text)
- 7 professional fonts available
- Changes apply site-wide

## 📑 Section Order & Visibility
Go to **Admin → Design & Layout → Section Order & Visibility**
- Use **↑/↓** arrows to reorder sections
- Click **👁️ eye** to show/hide sections
- Navbar always stays at top
- Changes take effect after save

---

## Setup (Do This First!)

```bash
# 1. Apply database migration
supabase db push

# 2. Start your dev server
npm run dev  # or: bun run dev

# 3. Navigate to admin dashboard
# http://localhost:5173/admin → Design & Layout tab
```

---

## Handy Color Values

| Theme | Primary | Accent | Background |
|-------|---------|--------|------------|
| Gold (Default) | `38 90% 55%` | `38 90% 55%` | `240 15% 5%` |
| Blue | `210 100% 50%` | `45 100% 50%` | `220 20% 10%` |
| Green | `120 100% 40%` | `60 100% 50%` | `120 30% 8%` |
| Purple | `280 100% 50%` | `320 100% 60%` | `260 30% 10%` |
| Bronze | `30 100% 45%` | `15 100% 50%` | `25 30% 10%` |

---

## Common Tasks

| Task | Steps |
|------|-------|
| **Change Theme Color** | Go to Primary/Accent colors → Update HSL → Save |
| **Hide "About" Section** | Click eye icon next to About → Save |
| **Move Projects to Top** | Use ↑ arrows on Projects → Save |
| **Change to Poppins Font** | Select Heading Font → Choose Poppins → Save |
| **Revert to Default** | Replace all settings with defaults → Save |

---

## CSS Variable Reference
All colors use CSS custom properties:
```
--primary, --accent, --gold, --gold-light, --gold-dark
--background, --surface, --surface-elevated
--secondary, --muted
--font-heading, --font-body
```

---

## 💡 Tips

✅ Test changes on mobile after updating  
✅ Use high contrast for readability  
✅ Keep consistent colors across sections  
✅ Save before checking results  
✅ Clear cache if colors don't update: Ctrl+Shift+Del  

---

## Where Are These Changes Stored?

All settings stored in: **Supabase → public.settings table**
- No code changes needed
- Changes persist across sessions
- Only admins can modify (RLS protected)
- Instant updates to public site

---

## Files You Need to Know

| File | Purpose |
|------|---------|
| `src/components/admin/ColorPicker.tsx` | Color input UI |
| `src/components/admin/SectionReordering.tsx` | Section UI |
| `src/hooks/useDesignSettings.ts` | Applies settings to page |
| `DESIGN_SETTINGS_GUIDE.md` | Full documentation |

---

**Questions?** Check `DESIGN_SETTINGS_GUIDE.md` for detailed docs!
