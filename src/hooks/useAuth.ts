import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import type { User } from '@supabase/supabase-js';
import type { Database } from '../lib/supabase';

type Profile = Database['public']['Tables']['profiles']['Row'];

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if user is admin based on admin_users table
  const checkAdminStatus = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('admin_level, is_active')
        .eq('user_id', userId)
        .eq('is_active', true)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking admin status:', error);
        return false;
      }

      return !!data;
    } catch (error) {
      console.error('Error in checkAdminStatus:', error);
      return false;
    }
  }, []);

  // Fetch user profile from database
  const fetchProfile = useCallback(async (userId: string, userEmail: string) => {
    try {
      // Check admin status
      const adminStatus = await checkAdminStatus(userId);
      setIsAdmin(adminStatus);

      // Fetch user profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Error fetching profile:', profileError);
        return;
      }

      if (profileData) {
        setProfile(profileData);
      } else {
        // Profile doesn't exist, this might be a new user
        console.log('No profile found for user:', userId);
      }
    } catch (error) {
      console.error('Error in fetchProfile:', error);
    }
  }, [checkAdminStatus]);

  useEffect(() => {
    let mounted = true;

    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Session error:', error);
          setLoading(false);
          return;
        }

        if (!mounted) return;

        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchProfile(session.user.id, session.user.email || '');
        }
      } catch (error) {
        console.error('Session initialization error:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      console.log('Auth state changed:', event, session?.user?.email);

      setUser(session?.user ?? null);
      
      if (session?.user) {
        await fetchProfile(session.user.id, session.user.email || '');
      } else {
        setProfile(null);
        setIsAdmin(false);
      }
      
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [fetchProfile]);

  const signUp = async (
    email: string, 
    password: string, 
    fullName: string, 
    phone: string,
    userType: 'jobseeker' | 'employer',
    companyName?: string,
    location?: string
  ) => {
    try {
      setLoading(true);
      
      // Sign up user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            user_type: userType
          }
        }
      });

      if (authError) {
        console.error('Auth signup error:', authError);
        toast.error(authError.message);
        return { success: false, error: authError.message };
      }

      if (authData.user) {
        // Create profile in profiles table
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([{
            id: authData.user.id,
            email: email,
            full_name: fullName,
            phone: phone || null,
            user_type: userType,
            company_name: companyName || null,
            location: location || null,
            is_active: true
          }]);

        if (profileError) {
          console.error('Profile creation error:', profileError);
          // Don't show error to user as auth was successful
        }

        toast.success('खाता सफलतापूर्वक बनाया गया! कृपया अपना ईमेल चेक करें।');
        return { success: true, user: authData.user };
      }

      return { success: false, error: 'Unknown error occurred' };
    } catch (error: any) {
      console.error('Signup error:', error);
      toast.error('खाता बनाने में त्रुटि');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('Signin error:', error);
        toast.error('गलत ईमेल या पासवर्ड');
        return { success: false, error: error.message };
      }

      if (data.user) {
        toast.success('सफलतापूर्वक लॉगिन हो गए!');
        return { success: true, user: data.user };
      }

      return { success: false, error: 'Unknown error occurred' };
    } catch (error: any) {
      console.error('Signin error:', error);
      toast.error('लॉगिन में त्रुटि');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const signInWithOTP = async (phone: string) => {
    try {
      setLoading(true);
      
      const { error } = await supabase.auth.signInWithOtp({
        phone: phone
      });

      if (error) {
        console.error('OTP error:', error);
        toast.error('OTP भेजने में त्रुटि');
        return { success: false, error: error.message };
      }

      toast.success('OTP आपके फोन पर भेजा गया है');
      return { success: true };
    } catch (error: any) {
      console.error('OTP error:', error);
      toast.error('OTP भेजने में त्रुटि');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (phone: string, token: string) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.auth.verifyOtp({
        phone,
        token,
        type: 'sms'
      });

      if (error) {
        console.error('OTP verification error:', error);
        toast.error('गलत OTP');
        return { success: false, error: error.message };
      }

      if (data.user) {
        toast.success('सफलतापूर्वक वेरिफाई हो गया!');
        return { success: true, user: data.user };
      }

      return { success: false, error: 'Unknown error occurred' };
    } catch (error: any) {
      console.error('OTP verification error:', error);
      toast.error('OTP वेरिफिकेशन में त्रुटि');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Signout error:', error);
        toast.error('लॉगआउट में त्रुटि');
        return;
      }

      setUser(null);
      setProfile(null);
      setIsAdmin(false);
      toast.success('सफलतापूर्वक लॉगआउट हो गए!');
    } catch (error: any) {
      console.error('Signout error:', error);
      toast.error('लॉगआउट में त्रुटि');
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      
      if (error) {
        console.error('Password reset error:', error);
        toast.error('पासवर्ड रीसेट में त्रुटि');
        return { success: false, error: error.message };
      }

      toast.success('पासवर्ड रीसेट लिंक आपके ईमेल पर भेजा गया है');
      return { success: true };
    } catch (error: any) {
      console.error('Password reset error:', error);
      toast.error('पासवर्ड रीसेट में त्रुटि');
      return { success: false, error: error.message };
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      if (!user) return { success: false, error: 'User not authenticated' };

      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) {
        console.error('Profile update error:', error);
        toast.error('प्रोफाइल अपडेट में त्रुटि');
        return { success: false, error: error.message };
      }

      // Refresh profile data
      await fetchProfile(user.id, user.email || '');
      toast.success('प्रोफाइल सफलतापूर्वक अपडेट हो गया!');
      return { success: true };
    } catch (error: any) {
      console.error('Profile update error:', error);
      toast.error('प्रोफाइल अपडेट में त्रुटि');
      return { success: false, error: error.message };
    }
  };

  return {
    user,
    profile,
    loading,
    isAdmin,
    signUp,
    signIn,
    signInWithOTP,
    verifyOTP,
    signOut,
    resetPassword,
    updateProfile,
    fetchProfile
  };
}