import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import type { Database } from '../lib/supabase';

type Application = Database['public']['Tables']['applications']['Row'];
type ApplicationInsert = Database['public']['Tables']['applications']['Insert'];
type ApplicationUpdate = Database['public']['Tables']['applications']['Update'];

export function useApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchApplications = async (filters?: {
    userId?: string;
    jobId?: string;
    employerId?: string;
  }) => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('applications')
        .select(`
          *,
          jobs:job_id (
            title,
            company,
            salary,
            posted_by
          ),
          profiles:user_id (
            full_name,
            email,
            phone,
            skills,
            experience_years
          )
        `)
        .order('applied_at', { ascending: false });

      if (filters?.userId) {
        query = query.eq('user_id', filters.userId);
      }

      if (filters?.jobId) {
        query = query.eq('job_id', filters.jobId);
      }

      if (filters?.employerId) {
        query = query.eq('jobs.posted_by', filters.employerId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching applications:', error);
        toast.error('आवेदन लोड करने में त्रुटि');
        return;
      }

      setApplications(data || []);
    } catch (error) {
      console.error('Error in fetchApplications:', error);
      toast.error('आवेदन लोड करने में त्रुटि');
    } finally {
      setLoading(false);
    }
  };

  const createApplication = async (applicationData: ApplicationInsert) => {
    try {
      setLoading(true);

      // Check if user already applied for this job
      const { data: existingApplication } = await supabase
        .from('applications')
        .select('id')
        .eq('job_id', applicationData.job_id)
        .eq('user_id', applicationData.user_id)
        .single();

      if (existingApplication) {
        toast.error('आपने पहले से ही इस नौकरी के लिए आवेदन किया है!');
        return { success: false, error: 'Already applied' };
      }

      const { data, error } = await supabase
        .from('applications')
        .insert([applicationData])
        .select()
        .single();

      if (error) {
        console.error('Error creating application:', error);
        toast.error('आवेदन जमा करने में त्रुटि');
        return { success: false, error: error.message };
      }

      toast.success('आवेदन सफलतापूर्वक जमा किया गया!');
      await fetchApplications(); // Refresh applications list
      return { success: true, data };
    } catch (error: any) {
      console.error('Error in createApplication:', error);
      toast.error('आवेदन जमा करने में त्रुटि');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (
    applicationId: string, 
    status: Application['status']
  ) => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('applications')
        .update({ status })
        .eq('id', applicationId)
        .select()
        .single();

      if (error) {
        console.error('Error updating application status:', error);
        toast.error('आवेदन स्थिति अपडेट करने में त्रुटि');
        return { success: false, error: error.message };
      }

      toast.success('आवेदन स्थिति सफलतापूर्वक अपडेट हो गई!');
      await fetchApplications(); // Refresh applications list
      return { success: true, data };
    } catch (error: any) {
      console.error('Error in updateApplicationStatus:', error);
      toast.error('आवेदन स्थिति अपडेट करने में त्रुटि');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const checkApplicationExists = async (jobId: string, userId: string) => {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('id')
        .eq('job_id', jobId)
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking application:', error);
        return false;
      }

      return !!data;
    } catch (error) {
      console.error('Error in checkApplicationExists:', error);
      return false;
    }
  };

  return {
    applications,
    loading,
    fetchApplications,
    createApplication,
    updateApplicationStatus,
    checkApplicationExists
  };
}