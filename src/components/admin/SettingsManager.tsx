import React, { useState, useEffect } from 'react';
import { useSettings, useUpsertSetting, useDeleteSetting } from '@/hooks/useDatabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ImageUploadField } from './ImageUploadField';
import { AdminLoadingSkeleton } from './AdminLoadingSkeleton';
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
];

export const SettingsManager: React.FC = () => {
  const { data: settings = [], isLoading } = useSettings();
  const upsertSetting = useUpsertSetting();
  const { toast } = useToast();

  // Build a local form state from the DB settings
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [dirty, setDirty] = useState<Set<string>>(new Set());

  useEffect(() => {
    const map: Record<string, string> = {};
    settings.forEach((s) => {
      if (s.value !== null) map[s.key] = s.value;
    });
    setFormValues(map);
    setDirty(new Set());
  }, [settings]);

  const handleChange = (key: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
    setDirty((prev) => new Set(prev).add(key));
  };

  const handleSaveGroup = async (groupId: string) => {
    const group = settingsGroups.find((g) => g.id === groupId);
    if (!group) return;

    const keysToSave = group.fields.map((f) => f.key).filter((k) => dirty.has(k));
    if (keysToSave.length === 0) {
      toast({ title: 'No changes', description: 'Nothing to save.' });
      return;
    }

    try {
      for (const key of keysToSave) {
        await upsertSetting.mutateAsync({ key, value: formValues[key] || '' });
      }
      setDirty((prev) => {
        const next = new Set(prev);
        keysToSave.forEach((k) => next.delete(k));
        return next;
      });
      toast({ title: 'Saved!', description: `${group.label} settings updated.` });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to save settings.', variant: 'destructive' });
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
        </TabsList>

        {settingsGroups.map((group) => (
          <TabsContent key={group.id} value={group.id}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{group.label}</CardTitle>
                <Button
                  size="sm"
                  onClick={() => handleSaveGroup(group.id)}
                  disabled={!group.fields.some((f) => dirty.has(f.key))}
                >
                  <Save className="w-4 h-4 mr-2" /> Save {group.label}
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {group.fields.map((field) => (
                  <div key={field.key}>
                    <label className="text-sm font-medium mb-1.5 block">{field.label}</label>
                    {field.type === 'image' ? (
                      <ImageUploadField
                        currentImageUrl={formValues[field.key] || ''}
                        onImageUrl={(url) => handleChange(field.key, url)}
                      />
                    ) : field.type === 'textarea' ? (
                      <Textarea
                        value={formValues[field.key] || ''}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        placeholder={field.placeholder}
                        rows={3}
                      />
                    ) : (
                      <Input
                        value={formValues[field.key] || ''}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        placeholder={field.placeholder}
                      />
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
      </Tabs>
    </div>
  );
};
