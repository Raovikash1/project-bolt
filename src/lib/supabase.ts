import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables not found. Please set up your Supabase project.');
}

// Create client with optimized settings
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'pkce'
    },
    global: {
      headers: {
        'x-client-info': 'babadham-a2z-consultancy'
      }
    },
    db: {
      schema: 'public'
    },
    realtime: {
      params: {
        eventsPerSecond: 2
      }
    }
  }
);

// Database types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          phone: string | null;
          user_type: 'jobseeker' | 'employer';
          company_name: string | null;
          location: string | null;
          bio: string | null;
          skills: string[] | null;
          experience_years: number | null;
          education: string | null;
          resume_url: string | null;
          profile_image_url: string | null;
          is_verified: boolean | null;
          is_active: boolean | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id: string;
          email: string;
          full_name: string;
          phone?: string | null;
          user_type: 'jobseeker' | 'employer';
          company_name?: string | null;
          location?: string | null;
          bio?: string | null;
          skills?: string[] | null;
          experience_years?: number | null;
          education?: string | null;
          resume_url?: string | null;
          profile_image_url?: string | null;
          is_verified?: boolean | null;
          is_active?: boolean | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          phone?: string | null;
          user_type?: 'jobseeker' | 'employer';
          company_name?: string | null;
          location?: string | null;
          bio?: string | null;
          skills?: string[] | null;
          experience_years?: number | null;
          education?: string | null;
          resume_url?: string | null;
          profile_image_url?: string | null;
          is_verified?: boolean | null;
          is_active?: boolean | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      jobs: {
        Row: {
          id: string;
          title: string;
          company: string;
          location: string;
          salary: string;
          job_type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
          experience: string;
          skills: string[];
          description: string;
          requirements: string[];
          benefits: string[];
          posted_by: string;
          status: 'active' | 'inactive' | 'closed' | null;
          application_deadline: string | null;
          remote_work_allowed: boolean | null;
          salary_min: number | null;
          salary_max: number | null;
          views_count: number | null;
          applications_count: number | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          company: string;
          location: string;
          salary: string;
          job_type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
          experience: string;
          skills?: string[];
          description: string;
          requirements?: string[];
          benefits?: string[];
          posted_by: string;
          status?: 'active' | 'inactive' | 'closed' | null;
          application_deadline?: string | null;
          remote_work_allowed?: boolean | null;
          salary_min?: number | null;
          salary_max?: number | null;
          views_count?: number | null;
          applications_count?: number | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          company?: string;
          location?: string;
          salary?: string;
          job_type?: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
          experience?: string;
          skills?: string[];
          description?: string;
          requirements?: string[];
          benefits?: string[];
          posted_by?: string;
          status?: 'active' | 'inactive' | 'closed' | null;
          application_deadline?: string | null;
          remote_work_allowed?: boolean | null;
          salary_min?: number | null;
          salary_max?: number | null;
          views_count?: number | null;
          applications_count?: number | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      applications: {
        Row: {
          id: string;
          job_id: string;
          user_id: string;
          status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired' | null;
          cover_letter: string | null;
          resume_url: string | null;
          additional_notes: string | null;
          applied_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          job_id: string;
          user_id: string;
          status?: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired' | null;
          cover_letter?: string | null;
          resume_url?: string | null;
          additional_notes?: string | null;
          applied_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          job_id?: string;
          user_id?: string;
          status?: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired' | null;
          cover_letter?: string | null;
          resume_url?: string | null;
          additional_notes?: string | null;
          applied_at?: string | null;
          updated_at?: string | null;
        };
      };
      admin_users: {
        Row: {
          id: string;
          user_id: string;
          admin_level: 'super_admin' | 'admin' | 'moderator' | null;
          permissions: string[] | null;
          created_by: string | null;
          created_at: string | null;
          is_active: boolean | null;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          message: string;
          type: 'application' | 'job_update' | 'system' | 'admin';
          is_read: boolean | null;
          related_id: string | null;
          created_at: string | null;
        };
      };
    };
  };
}

// Connection health check
export const checkSupabaseConnection = async (): Promise<boolean> => {
  try {
    const { data, error } = await supabase.from('profiles').select('id').limit(1);
    return !error;
  } catch {
    return false;
  }
};

// Test connection on module load
checkSupabaseConnection().then(connected => {
  if (connected) {
    console.log('✅ Supabase connection successful');
  } else {
    console.warn('⚠️ Supabase connection failed - using fallback mode');
  }
});