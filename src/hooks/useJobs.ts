import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import type { Database } from '../lib/supabase';

type Job = Database['public']['Tables']['jobs']['Row'];
type JobInsert = Database['public']['Tables']['jobs']['Insert'];
type JobUpdate = Database['public']['Tables']['jobs']['Update'];

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchJobs = async (filters?: {
    search?: string;
    location?: string;
    jobType?: string;
    postedBy?: string;
  }) => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('jobs')
        .select(`
          *,
          profiles:posted_by (
            full_name,
            company_name
          )
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (filters?.search) {
        query = query.or(`title.ilike.%${filters.search}%,company.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }

      if (filters?.location) {
        query = query.ilike('location', `%${filters.location}%`);
      }

      if (filters?.jobType) {
        query = query.eq('job_type', filters.jobType);
      }

      if (filters?.postedBy) {
        query = query.eq('posted_by', filters.postedBy);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching jobs:', error);
        toast.error('नौकरियां लोड करने में त्रुटि');
        return;
      }

      setJobs(data || []);
    } catch (error) {
      console.error('Error in fetchJobs:', error);
      toast.error('नौकरियां लोड करने में त्रुटि');
    } finally {
      setLoading(false);
    }
  };

  const createJob = async (jobData: JobInsert) => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('jobs')
        .insert([jobData])
        .select()
        .single();

      if (error) {
        console.error('Error creating job:', error);
        toast.error('नौकरी पोस्ट करने में त्रुटि');
        return { success: false, error: error.message };
      }

      toast.success('नौकरी सफलतापूर्वक पोस्ट की गई!');
      await fetchJobs(); // Refresh jobs list
      return { success: true, data };
    } catch (error: any) {
      console.error('Error in createJob:', error);
      toast.error('नौकरी पोस्ट करने में त्रुटि');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const updateJob = async (jobId: string, updates: JobUpdate) => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('jobs')
        .update(updates)
        .eq('id', jobId)
        .select()
        .single();

      if (error) {
        console.error('Error updating job:', error);
        toast.error('नौकरी अपडेट करने में त्रुटि');
        return { success: false, error: error.message };
      }

      toast.success('नौकरी सफलतापूर्वक अपडेट हो गई!');
      await fetchJobs(); // Refresh jobs list
      return { success: true, data };
    } catch (error: any) {
      console.error('Error in updateJob:', error);
      toast.error('नौकरी अपडेट करने में त्रुटि');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (jobId: string) => {
    try {
      setLoading(true);

      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', jobId);

      if (error) {
        console.error('Error deleting job:', error);
        toast.error('नौकरी डिलीट करने में त्रुटि');
        return { success: false, error: error.message };
      }

      toast.success('नौकरी सफलतापूर्वक डिलीट हो गई!');
      await fetchJobs(); // Refresh jobs list
      return { success: true };
    } catch (error: any) {
      console.error('Error in deleteJob:', error);
      toast.error('नौकरी डिलीट करने में त्रुटि');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const incrementViews = async (jobId: string) => {
    try {
      await supabase.rpc('increment_job_views', { job_id: jobId });
    } catch (error) {
      console.error('Error incrementing views:', error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return {
    jobs,
    loading,
    fetchJobs,
    createJob,
    updateJob,
    deleteJob,
    incrementViews
  };
}