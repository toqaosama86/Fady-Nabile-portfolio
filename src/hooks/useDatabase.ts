import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// ============ GENERIC TYPES ============
interface Project {
  id: string;
  title: string;
  description: string;
  category: string | null;
  image_url: string | null;
  video_url: string | null;
  link_url: string | null;
  client_name: string | null;
  year: string | null;
  services_provided: string | null;
  results: string | null;
  is_featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

interface Brand {
  id: string;
  name: string;
  logo_url: string | null;
  link_url: string | null;
  display_order: number;
  created_at: string;
}

interface Testimonial {
  id: string;
  author_name: string;
  author_title: string | null;
  author_image_url: string | null;
  content: string;
  rating: number;
  display_order: number;
  created_at: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string | null;
  features: any;
  display_order: number;
  created_at: string;
}

interface Experience {
  id: string;
  company_name: string;
  position: string;
  description: string | null;
  start_date: string | null;
  end_date: string | null;
  is_current: boolean;
  skills: any;
  display_order: number;
  created_at: string;
}

interface Tool {
  id: string;
  name: string;
  category: string | null;
  icon_url: string | null;
  proficiency_level: number;
  years_of_experience: number | null;
  display_order: number;
  created_at: string;
}

interface Setting {
  id: string;
  key: string;
  value: string | null;
  created_at: string;
  updated_at: string;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

// ============ HELPER: Settings Map ============
export const useSettingsMap = () => {
  const { data: settings = [], ...rest } = useSettings();
  const map: Record<string, string> = {};
  settings.forEach((s) => {
    if (s.key && s.value !== null) map[s.key] = s.value;
  });
  return { settings: map, ...rest };
};

// ============ PROJECTS ============
export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true });
      if (error) throw error;
      return data as Project[];
    },
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (project: any) => {
      const { data, error } = await (supabase as any)
        .from('projects')
        .insert([project])
        .select();
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['projects'] }),
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...project }: any) => {
      const { data, error } = await (supabase as any)
        .from('projects')
        .update(project)
        .eq('id', id)
        .select();
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['projects'] }),
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase as any).from('projects').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['projects'] }),
  });
};

// ============ BRANDS ============
export const useBrands = () => {
  return useQuery({
    queryKey: ['brands'],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from('brands')
        .select('*')
        .order('display_order', { ascending: true });
      if (error) throw error;
      return data as Brand[];
    },
  });
};

export const useCreateBrand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (brand: any) => {
      const { data, error } = await (supabase as any).from('brands').insert([brand]).select();
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['brands'] }),
  });
};

export const useUpdateBrand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...brand }: any) => {
      const { data, error } = await (supabase as any).from('brands').update(brand).eq('id', id).select();
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['brands'] }),
  });
};

export const useDeleteBrand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase as any).from('brands').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['brands'] }),
  });
};

// ============ TESTIMONIALS ============
export const useTestimonials = () => {
  return useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from('testimonials')
        .select('*')
        .order('display_order', { ascending: true });
      if (error) throw error;
      return data as Testimonial[];
    },
  });
};

export const useCreateTestimonial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (testimonial: any) => {
      const { data, error } = await (supabase as any).from('testimonials').insert([testimonial]).select();
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['testimonials'] }),
  });
};

export const useUpdateTestimonial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...testimonial }: any) => {
      const { data, error } = await (supabase as any).from('testimonials').update(testimonial).eq('id', id).select();
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['testimonials'] }),
  });
};

export const useDeleteTestimonial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase as any).from('testimonials').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['testimonials'] }),
  });
};

// ============ SERVICES ============
export const useServices = () => {
  return useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from('services')
        .select('*')
        .order('display_order', { ascending: true });
      if (error) throw error;
      return data as Service[];
    },
  });
};

export const useCreateService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (service: any) => {
      const { data, error } = await (supabase as any).from('services').insert([service]).select();
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['services'] }),
  });
};

export const useUpdateService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...service }: any) => {
      const { data, error } = await (supabase as any).from('services').update(service).eq('id', id).select();
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['services'] }),
  });
};

export const useDeleteService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase as any).from('services').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['services'] }),
  });
};

// ============ EXPERIENCE ============
export const useExperience = () => {
  return useQuery({
    queryKey: ['experience'],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from('experience')
        .select('*')
        .order('display_order', { ascending: true });
      if (error) throw error;
      return data as Experience[];
    },
  });
};

export const useCreateExperience = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (experience: any) => {
      const { data, error } = await (supabase as any).from('experience').insert([experience]).select();
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['experience'] }),
  });
};

export const useUpdateExperience = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...experience }: any) => {
      const { data, error } = await (supabase as any).from('experience').update(experience).eq('id', id).select();
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['experience'] }),
  });
};

export const useDeleteExperience = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase as any).from('experience').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['experience'] }),
  });
};

// ============ TOOLS ============
export const useTools = () => {
  return useQuery({
    queryKey: ['tools'],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from('tools')
        .select('*')
        .order('display_order', { ascending: true });
      if (error) throw error;
      return data as Tool[];
    },
  });
};

export const useCreateTool = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (tool: any) => {
      const { data, error } = await (supabase as any).from('tools').insert([tool]).select();
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tools'] }),
  });
};

export const useUpdateTool = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...tool }: any) => {
      const { data, error } = await (supabase as any).from('tools').update(tool).eq('id', id).select();
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tools'] }),
  });
};

export const useDeleteTool = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase as any).from('tools').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tools'] }),
  });
};

// ============ SETTINGS ============
export const useSettings = () => {
  return useQuery({
    queryKey: ['settings'],
    queryFn: async () => {
      const { data, error } = await (supabase as any).from('settings').select('*');
      if (error) throw error;
      return data as Setting[];
    },
  });
};

export const useUpsertSetting = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ key, value }: { key: string; value: string }) => {
      const { data, error } = await (supabase as any)
        .from('settings')
        .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' })
        .select();
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['settings'] }),
  });
};

export const useCreateSetting = useUpsertSetting;

export const useUpdateSetting = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...setting }: any) => {
      const { data, error } = await (supabase as any).from('settings').update(setting).eq('id', id).select();
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['settings'] }),
  });
};

export const useDeleteSetting = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase as any).from('settings').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['settings'] }),
  });
};

// ============ CONTACT MESSAGES ============
export const useContactMessages = () => {
  return useQuery({
    queryKey: ['contact_messages'],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as ContactMessage[];
    },
  });
};

export const useCreateContactMessage = () => {
  return useMutation({
    mutationFn: async (message: { name: string; email: string; message: string }) => {
      const { data, error } = await (supabase as any).from('contact_messages').insert([message]).select();
      if (error) throw error;
      return data[0];
    },
  });
};

export const useDeleteContactMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase as any).from('contact_messages').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['contact_messages'] }),
  });
};
