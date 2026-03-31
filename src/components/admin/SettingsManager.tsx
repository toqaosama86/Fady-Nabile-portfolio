import React, { useState, useEffect } from 'react';
import { useSettings, useUpsertSetting, useDeleteSetting } from '@/hooks/useDatabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ImageUploadField } from './ImageUploadField';
import { AdminLoadingSkeleton } from './AdminLoadingSkeleton';
import { ColorPicker } from './ColorPicker';
import { SectionReordering } from './SectionReordering';
import { FaviconUpload } from './FaviconUpload';
import { CVUpload } from './CVUpload';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';

const settingsGroups = [
  {
    id: 'general',
    label: 'General',
    fields: [
      { key: 'editor_name', label: 'Your Name', type: 'text', placeholder: 'Marcus Reed' },
      { key: 'site_title', label: 'Website Title', type: 'text', placeholder: 'Marcus Reed — Video Editor' },
      { key: 'site_description', label: 'Meta Description (SEO)', type: 'textarea', placeholder: 'Professional video editor specializing in...' },
    ],
  },
  {
    id: 'hero',
    label: 'Hero Section',
    fields: [
      { key: 'hero_tagline', label: 'Tagline (small text above title)', type: 'text', placeholder: 'Professional Video Editor' },
      { key: 'hero_title_line1', label: 'Title Line 1', type: 'text', placeholder: 'Crafting Stories' },
      { key: 'hero_title_line2', label: 'Title Line 2 (gold text)', type: 'text', placeholder: 'Frame by Frame' },
      { key: 'hero_description', label: 'Description', type: 'textarea', placeholder: 'I transform raw footage...' },
      { key: 'hero_bg_image', label: 'Background Image', type: 'image' },
    ],
  },
  {
    id: 'about',
    label: 'About Section',
    fields: [
      { key: 'about_paragraph_1', label: 'Paragraph 1', type: 'textarea', placeholder: "I'm Marcus Reed — a video editor..." },
      { key: 'about_paragraph_2', label: 'Paragraph 2', type: 'textarea', placeholder: 'My editing style blends...' },
      { key: 'about_paragraph_3', label: 'Paragraph 3', type: 'textarea', placeholder: 'Every project is a collaboration...' },
      { key: 'about_portrait_image', label: 'Portrait Photo', type: 'image' },
      { key: 'about_availability', label: 'Availability Status', type: 'text', placeholder: 'Currently Available' },
      { key: 'about_availability_note', label: 'Availability Note', type: 'text', placeholder: 'Open for freelance & contract work' },
    ],
  },
  {
    id: 'stats',
    label: 'Stats',
    fields: [
      { key: 'stat_1_value', label: 'Stat 1 Value', type: 'text', placeholder: '8' },
      { key: 'stat_1_suffix', label: 'Stat 1 Suffix', type: 'text', placeholder: '+' },
      { key: 'stat_1_label', label: 'Stat 1 Label', type: 'text', placeholder: 'Years Experience' },
      { key: 'stat_2_value', label: 'Stat 2 Value', type: 'text', placeholder: '350' },
      { key: 'stat_2_suffix', label: 'Stat 2 Suffix', type: 'text', placeholder: '+' },
      { key: 'stat_2_label', label: 'Stat 2 Label', type: 'text', placeholder: 'Projects Delivered' },
      { key: 'stat_3_value', label: 'Stat 3 Value', type: 'text', placeholder: '60' },
      { key: 'stat_3_suffix', label: 'Stat 3 Suffix', type: 'text', placeholder: '+' },
      { key: 'stat_3_label', label: 'Stat 3 Label', type: 'text', placeholder: 'Brands & Clients' },
      { key: 'stat_4_value', label: 'Stat 4 Value', type: 'text', placeholder: '50' },
      { key: 'stat_4_suffix', label: 'Stat 4 Suffix', type: 'text', placeholder: 'M+' },
      { key: 'stat_4_label', label: 'Stat 4 Label', type: 'text', placeholder: 'Views Generated' },
    ],
  },
  {
    id: 'showreel',
    label: 'Showreel',
    fields: [
      { key: 'showreel_url', label: 'YouTube Embed URL', type: 'text', placeholder: 'https://www.youtube.com/embed/...' },
      { key: 'showreel_title', label: 'Showreel Title', type: 'text', placeholder: '2024 Showreel' },
      { key: 'showreel_duration', label: 'Duration Text', type: 'text', placeholder: '3:24 min' },
    ],
  },
  {
    id: 'contact',
    label: 'Contact Info',
    fields: [
      { key: 'contact_email', label: 'Email', type: 'text', placeholder: 'you@example.com' },
      { key: 'contact_phone', label: 'Phone / WhatsApp Number', type: 'text', placeholder: '+1 (555) 123-4567' },
      { key: 'whatsapp_url', label: 'WhatsApp Link (optional)', type: 'text', placeholder: 'https://wa.me/...' },
      { key: 'contact_location', label: 'Location', type: 'text', placeholder: 'Los Angeles, CA' },
    ],
  },
  {
    id: 'social',
    label: 'Social Media',
    fields: [
      { key: 'social_instagram', label: 'Instagram URL', type: 'text', placeholder: 'https://instagram.com/...' },
      { key: 'social_youtube', label: 'YouTube URL', type: 'text', placeholder: 'https://youtube.com/...' },
      { key: 'social_linkedin', label: 'LinkedIn URL', type: 'text', placeholder: 'https://linkedin.com/in/...' },
      { key: 'social_behance', label: 'Behance URL', type: 'text', placeholder: 'https://behance.net/...' },
      { key: 'social_twitter', label: 'Twitter/X URL', type: 'text', placeholder: 'https://x.com/...' },
      { key: 'social_tiktok', label: 'TikTok URL', type: 'text', placeholder: 'https://tiktok.com/@...' },
    ],
  },
  {
    id: 'design',
    label: 'Design & Layout',
    fields: [
      { key: 'color_primary', label: 'Primary Color', type: 'color', placeholder: '38 90% 55%' },
      { key: 'color_accent', label: 'Accent Color', type: 'color', placeholder: '38 90% 55%' },
      { key: 'color_gold', label: 'Gold Color', type: 'color', placeholder: '38 90% 55%' },
      { key: 'color_gold_light', label: 'Gold Light', type: 'color', placeholder: '38 85% 70%' },
      { key: 'color_gold_dark', label: 'Gold Dark', type: 'color', placeholder: '38 95% 40%' },
      { key: 'color_background', label: 'Background Color', type: 'color', placeholder: '240 15% 5%' },
      { key: 'color_surface', label: 'Surface Color', type: 'color', placeholder: '240 12% 8%' },
      { key: 'color_surface_elevated', label: 'Surface Elevated', type: 'color', placeholder: '240 10% 12%' },
      { key: 'color_secondary', label: 'Secondary Color', type: 'color', placeholder: '240 10% 12%' },
      { key: 'color_muted', label: 'Muted Color', type: 'color', placeholder: '240 8% 14%' },
      { key: 'font_family_heading', label: 'Heading Font', type: 'font-select', placeholder: 'Space Grotesk, sans-serif' },
      { key: 'font_family_body', label: 'Body Font', type: 'font-select', placeholder: 'Inter, sans-serif' },
      { key: 'section_order', label: 'Section Order', type: 'section-order' },
    ],
  },
];

export const SettingsManager: React.FC = () => {
  const { data: settings = [], isLoading } = useSettings();
  const upsertSetting = useUpsertSetting();
  const { toast } = useToast();

  // Build a local form state from the DB settings
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [dirty, setDirty] = useState<Set<string>>(new Set());
  const [sectionList, setSectionList] = useState<any[]>([]);
  const [savingGroup, setSavingGroup] = useState<string | null>(null);

  // Available fonts
  const availableFonts = [
    { label: 'Space Grotesk', value: 'Space Grotesk, sans-serif' },
    { label: 'Inter', value: 'Inter, sans-serif' },
    { label: 'Poppins', value: 'Poppins, sans-serif' },
    { label: 'Roboto', value: 'Roboto, sans-serif' },
    { label: 'Montserrat', value: 'Montserrat, sans-serif' },
    { label: 'Playfair Display', value: 'Playfair Display, serif' },
    { label: 'Lora', value: 'Lora, serif' },
  ];

  // Default sections
  const defaultSections = [
    { id: 'hero', label: 'Hero', visible: true },
    { id: 'about', label: 'About', visible: true },
    { id: 'stats', label: 'Stats', visible: true },
    { id: 'showreel', label: 'Showreel', visible: true },
    { id: 'projects', label: 'Projects', visible: true },
    { id: 'brands', label: 'Brands', visible: true },
    { id: 'services', label: 'Services', visible: true },
    { id: 'experience', label: 'Experience', visible: true },
    { id: 'testimonials', label: 'Testimonials', visible: true },
    { id: 'process', label: 'Process', visible: true },
    { id: 'tools', label: 'Tools', visible: true },
    { id: 'contact', label: 'Contact', visible: true },
    { id: 'footer', label: 'Footer', visible: true },
  ];

  useEffect(() => {
    const map: Record<string, string> = {};
    settings.forEach((s) => {
      if (s.value !== null) map[s.key] = s.value;
    });
    setFormValues(map);
    
    // Parse section order
    if (map.section_order) {
      const sectionIds = map.section_order.split(',');
      const parsed = defaultSections.map((sec) => ({
        ...sec,
        visible:
          map[`section_${sec.id}_visible`] !== 'false',
      }));
      setSectionList(
        parsed.sort(
          (a, b) =>
            sectionIds.indexOf(a.id) - sectionIds.indexOf(b.id)
        )
      );
    } else {
      setSectionList(defaultSections);
    }
    
    setDirty(new Set());
  }, [settings]);

  const handleChange = (key: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
    setDirty((prev) => new Set(prev).add(key));
  };

  const handleSectionReorder = (sections: any[]) => {
    setSectionList(sections);
    const sectionOrder = sections.map((s) => s.id).join(',');
    handleChange('section_order', sectionOrder);
    
    // Mark visibility settings as dirty
    sections.forEach((s) => {
      const key = `section_${s.id}_visible`;
      handleChange(key, s.visible ? 'true' : 'false');
    });
  };

  const handleSaveGroup = async (groupId: string) => {
    let keysToSave: string[] = [];
    let groupLabel = '';

    if (groupId === 'uploads') {
      // Special handling for uploads
      if (dirty.has('site_favicon_url')) keysToSave.push('site_favicon_url');
      if (dirty.has('site_cv_url')) keysToSave.push('site_cv_url');
      groupLabel = 'Uploads';
    } else if (groupId === 'design') {
      // Special handling for design - include section visibility settings
      const group = settingsGroups.find((g) => g.id === groupId);
      if (!group) return;
      keysToSave = group.fields.map((f) => f.key).filter((k) => dirty.has(k));
      
      // Also include all visibility settings that are dirty
      sectionList.forEach((section) => {
        const visibilityKey = `section_${section.id}_visible`;
        if (dirty.has(visibilityKey)) {
          keysToSave.push(visibilityKey);
        }
      });
      groupLabel = group.label;
    } else {
      const group = settingsGroups.find((g) => g.id === groupId);
      if (!group) return;
      keysToSave = group.fields.map((f) => f.key).filter((k) => dirty.has(k));
      groupLabel = group.label;
    }

    if (keysToSave.length === 0) {
      toast({ title: 'No changes', description: 'Nothing to save.' });
      return;
    }

    setSavingGroup(groupId);
    try {
      // Save all keys in parallel
      await Promise.all(
        keysToSave.map((key) =>
          upsertSetting.mutateAsync({ key, value: formValues[key] || '' })
        )
      );
      
      setDirty((prev) => {
        const next = new Set(prev);
        keysToSave.forEach((k) => next.delete(k));
        return next;
      });
      
      toast({ title: '✓ Saved!', description: `${groupLabel} settings updated.`, variant: 'default' });
    } catch (error) {
      console.error('Save error:', error);
      toast({ title: 'Error', description: 'Failed to save settings.', variant: 'destructive' });
    } finally {
      setSavingGroup(null);
    }
  };

  if (isLoading) return <AdminLoadingSkeleton />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Site Settings</h1>
        <p className="text-muted-foreground">Manage all your portfolio content, titles, images, and social links</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="flex flex-wrap h-auto gap-1 bg-card border border-border p-1">
          {settingsGroups.map((group) => (
            <TabsTrigger key={group.id} value={group.id} className="text-xs sm:text-sm">
              {group.label}
            </TabsTrigger>
          ))}
          <TabsTrigger value="uploads" className="text-xs sm:text-sm">
            📁 Uploads
          </TabsTrigger>
        </TabsList>

        {settingsGroups.map((group) => (
          <TabsContent key={group.id} value={group.id}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{group.label}</CardTitle>
                <Button
                  size="sm"
                  onClick={() => handleSaveGroup(group.id)}
                  disabled={!group.fields.some((f) => dirty.has(f.key)) || savingGroup === group.id}
                  className={savingGroup === group.id ? 'opacity-75' : ''}
                >
                  <Save className="w-4 h-4 mr-2" /> 
                  {savingGroup === group.id ? 'Saving...' : `Save ${group.label}`}
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {group.fields.map((field) => (
                  <div key={field.key}>
                    {field.type === 'section-order' ? (
                      <SectionReordering
                        sections={sectionList}
                        onChange={handleSectionReorder}
                      />
                    ) : field.type === 'color' ? (
                      <ColorPicker
                        label={field.label}
                        value={formValues[field.key] || field.placeholder || ''}
                        onChange={(value) => handleChange(field.key, value)}
                        placeholder={field.placeholder}
                      />
                    ) : field.type === 'font-select' ? (
                      <div>
                        <Label className="text-sm font-medium mb-1.5 block">{field.label}</Label>
                        <Select
                          value={formValues[field.key] || field.placeholder || ''}
                          onValueChange={(value) => handleChange(field.key, value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select font family..." />
                          </SelectTrigger>
                          <SelectContent>
                            {availableFonts.map((font) => (
                              <SelectItem key={font.value} value={font.value}>
                                {font.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    ) : field.type === 'image' ? (
                      <>
                        <label className="text-sm font-medium mb-1.5 block">{field.label}</label>
                        <ImageUploadField
                          currentImageUrl={formValues[field.key] || ''}
                          onImageUrl={(url) => handleChange(field.key, url)}
                        />
                      </>
                    ) : field.type === 'textarea' ? (
                      <>
                        <label className="text-sm font-medium mb-1.5 block">{field.label}</label>
                        <Textarea
                          value={formValues[field.key] || ''}
                          onChange={(e) => handleChange(field.key, e.target.value)}
                          placeholder={field.placeholder}
                          rows={3}
                        />
                      </>
                    ) : (
                      <>
                        <label className="text-sm font-medium mb-1.5 block">{field.label}</label>
                        <Input
                          value={formValues[field.key] || ''}
                          onChange={(e) => handleChange(field.key, e.target.value)}
                          placeholder={field.placeholder}
                        />
                      </>
                    )}
                    {dirty.has(field.key) && (
                      <p className="text-xs text-primary mt-1">• Unsaved changes</p>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        ))}

        {/* Uploads Tab */}
        <TabsContent value="uploads">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>📁 Uploads</CardTitle>
              <Button
                size="sm"
                onClick={() => handleSaveGroup('uploads')}
                disabled={!dirty.has('site_favicon_url') && !dirty.has('site_cv_url') || savingGroup === 'uploads'}
                className={savingGroup === 'uploads' ? 'opacity-75' : ''}
              >
                <Save className="w-4 h-4 mr-2" /> 
                {savingGroup === 'uploads' ? 'Saving...' : 'Save Uploads'}
              </Button>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <FaviconUpload
                  currentFaviconUrl={formValues['site_favicon_url'] || ''}
                  onFaviconChange={(url) => handleChange('site_favicon_url', url)}
                />
                {dirty.has('site_favicon_url') && (
                  <p className="text-xs text-primary mt-2">• Unsaved changes</p>
                )}
              </div>
              
              <div>
                <CVUpload
                  currentCvUrl={formValues['site_cv_url'] || ''}
                  onCvChange={(url) => handleChange('site_cv_url', url)}
                />
                {dirty.has('site_cv_url') && (
                  <p className="text-xs text-primary mt-2">• Unsaved changes</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
