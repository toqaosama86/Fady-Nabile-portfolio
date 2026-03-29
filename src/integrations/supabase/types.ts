export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          title: string
          description: string
          category: string | null
          image_url: string | null
          link_url: string | null
          display_order: number
          is_featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          category?: string | null
          image_url?: string | null
          link_url?: string | null
          display_order?: number
          is_featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          category?: string | null
          image_url?: string | null
          link_url?: string | null
          display_order?: number
          is_featured?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      brands: {
        Row: {
          id: string
          name: string
          logo_url: string | null
          link_url: string | null
          display_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          logo_url?: string | null
          link_url?: string | null
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          logo_url?: string | null
          link_url?: string | null
          display_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      testimonials: {
        Row: {
          id: string
          author_name: string
          author_title: string | null
          author_image_url: string | null
          content: string
          rating: number
          display_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          author_name: string
          author_title?: string | null
          author_image_url?: string | null
          content: string
          rating?: number
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          author_name?: string
          author_title?: string | null
          author_image_url?: string | null
          content?: string
          rating?: number
          display_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      services: {
        Row: {
          id: string
          title: string
          description: string
          icon: string | null
          display_order: number
          features: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          icon?: string | null
          display_order?: number
          features?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          icon?: string | null
          display_order?: number
          features?: Json
          created_at?: string
          updated_at?: string
        }
      }
      experience: {
        Row: {
          id: string
          company_name: string
          position: string
          description: string | null
          start_date: string | null
          end_date: string | null
          is_current: boolean
          skills: Json
          display_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_name: string
          position: string
          description?: string | null
          start_date?: string | null
          end_date?: string | null
          is_current?: boolean
          skills?: Json
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_name?: string
          position?: string
          description?: string | null
          start_date?: string | null
          end_date?: string | null
          is_current?: boolean
          skills?: Json
          display_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      tools: {
        Row: {
          id: string
          name: string
          category: string | null
          icon_url: string | null
          proficiency_level: number
          years_of_experience: number | null
          display_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          category?: string | null
          icon_url?: string | null
          proficiency_level?: number
          years_of_experience?: number | null
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          category?: string | null
          icon_url?: string | null
          proficiency_level?: number
          years_of_experience?: number | null
          display_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      settings: {
        Row: {
          id: string
          key: string
          value: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          key: string
          value?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          key?: string
          value?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      admin_users: {
        Row: {
          id: string
          user_id: string
          role: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          role?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          role?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
