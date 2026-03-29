import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

// Projects Hooks
export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      // @ts-ignore - Supabase typing will be correct once schema is generated
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true });
      if (error) throw error;
      return data as Tables<'projects'>[];
    },
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (project: any) => {
      // @ts-ignore
      const { data, error } = await supabase
        .from('projects')
        .insert([project] as any)
        .select();
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...project }: any) => {
      // @ts-ignore
      const { data, error } = await supabase
        .from('projects')
        .update(project as any)
        .eq('id', id)
        .select();
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};

// Brands Hooks
export const useBrands = () => {
  return useQuery({
    queryKey: ['brands'],
    queryFn: async () => {
      // @ts-ignore
      const { data, error } = await supabase
        .from('brands')
        .select('*')
        .order('display_order', { ascending: true });
      if (error) throw error;
      return data as Tables<'brands'>[];
    },
  });
};

export const useCreateBrand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (brand: any) => {
      // @ts-ignore
      const { data, error } = await supabase
        .from('brands')
        .insert([brand] as any)
        .select();
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brands'] });
    },
  });
};

export const useUpdateBrand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...brand }: any) => {
      // @ts-ignore
      const { data, error } = await supabase
        .from('brands')
        .update(brand as any)
        .eq('id', id)
        .select();
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brands'] });
    },
  });
};

export const useDeleteBrand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('brands')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brands'] });
    },
  });
};

// Testimonials Hooks
export const useTestimonials = () => {
  return useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      // @ts-ignore
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('display_order', { ascending: true });
      if (error) throw error;
      return data as Tables<'testimonials'>[];
    },
  });
};

export const useCreateTestimonial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (testimonial: any) => {
      // @ts-ignore
      const { data, error } = await supabase
        .from('testimonials')
        .insert([testimonial] as any)
        .select();
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
    },
  });
};

export const useUpdateTestimonial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...testimonial }: any) => {
      // @ts-ignore
      const { data, error } = await supabase
        .from('testimonials')
        .update(testimonial as any)
        .eq('id', id)
        .select();
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
    },
  });
};

export const useDeleteTestimonial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
    },
  });
};

// Services Hooks
export const useServices = () => {
  return useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      // @ts-ignore
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('display_order', { ascending: true });
      if (error) throw error;
      return data as Tables<'services'>[];
    },
  });
};

export const useCreateService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (service: any) => {
      // @ts-ignore
      const { data, error } = await supabase
        .from('services')
        .insert([service] as any)
        .select();
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
    },
  });
};

export const useUpdateService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...service }: any) => {
      // @ts-ignore
      const { data, error } = await supabase
        .from('services')
        .update(service as any)
        .eq('id', id)
        .select();
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
    },
  });
};

export const useDeleteService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
    },
  });
};

// Experience Hooks
export const useExperience = () => {
  return useQuery({
    queryKey: ['experience'],
    queryFn: async () => {
      // @ts-ignore
      const { data, error } = await supabase
        .from('experience')
        .select('*')
        .order('display_order', { ascending: true });
      if (error) throw error;
      return data as Tables<'experience'>[];
    },
  });
};

export const useCreateExperience = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (experience: any) => {
      // @ts-ignore
      const { data, error } = await supabase
        .from('experience')
        .insert([experience] as any)
        .select();
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experience'] });
    },
  });
};

export const useUpdateExperience = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...experience }: any) => {
      // @ts-ignore
      const { data, error } = await supabase
        .from('experience')
        .update(experience as any)
        .eq('id', id)
        .select();
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experience'] });
    },
  });
};

export const useDeleteExperience = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('experience')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experience'] });
    },
  });
};

// Tools Hooks
export const useTools = () => {
  return useQuery({
    queryKey: ['tools'],
    queryFn: async () => {
      // @ts-ignore
      const { data, error } = await supabase
        .from('tools')
        .select('*')
        .order('display_order', { ascending: true });
      if (error) throw error;
      return data as Tables<'tools'>[];
    },
  });
};

export const useCreateTool = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (tool: any) => {
      // @ts-ignore
      const { data, error } = await supabase
        .from('tools')
        .insert([tool] as any)
        .select();
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tools'] });
    },
  });
};

export const useUpdateTool = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...tool }: any) => {
      // @ts-ignore
      const { data, error } = await supabase
        .from('tools')
        .update(tool as any)
        .eq('id', id)
        .select();
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tools'] });
    },
  });
};

export const useDeleteTool = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('tools')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tools'] });
    },
  });
};

// Settings Hooks
export const useSettings = () => {
  return useQuery({
    queryKey: ['settings'],
    queryFn: async () => {
      // @ts-ignore
      const { data, error } = await supabase
        .from('settings')
        .select('*');
      if (error) throw error;
      return data as Tables<'settings'>[];
    },
  });
};

export const useCreateSetting = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (setting: any) => {
      // @ts-ignore
      const { data, error } = await supabase
        .from('settings')
        .insert([setting] as any)
        .select();
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    },
  });
};

export const useUpdateSetting = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...setting }: any) => {
      // @ts-ignore
      const { data, error } = await supabase
        .from('settings')
        .update(setting as any)
        .eq('id', id)
        .select();
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    },
  });
};

export const useDeleteSetting = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('settings')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    },
  });
};
