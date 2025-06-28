import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Job, Application } from '../types';

interface AppContextType {
  // Users
  users: User[];
  currentUser: User | null;
  
  // Jobs
  jobs: Job[];
  
  // Applications
  applications: Application[];
  
  // Auth functions
  login: (email: string, password: string, userType: 'jobseeker' | 'employer' | 'admin') => Promise<boolean>;
  register: (name: string, email: string, password: string, userType: 'jobseeker' | 'employer') => Promise<boolean>;
  logout: () => void;
  
  // Job functions
  addJob: (job: Omit<Job, 'id' | 'postedAt' | 'applications'>) => void;
  updateJob: (jobId: string, updates: Partial<Job>) => void;
  deleteJob: (jobId: string) => void;
  
  // Application functions
  addApplication: (application: Omit<Application, 'id' | 'appliedAt'>) => void;
  updateApplicationStatus: (appId: string, status: Application['status']) => void;
  
  // Loading state
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Initial data
const initialUsers: (User & { password: string })[] = [
  { 
    id: '1', 
    name: 'राम शर्मा', 
    email: 'ram@example.com', 
    password: 'password123', 
    type: 'jobseeker',
    phone: '+91 9876543210',
    location: 'Mumbai, Maharashtra',
    createdAt: new Date('2024-01-15')
  },
  { 
    id: '2', 
    name: 'सीता देवी', 
    email: 'sita@example.com', 
    password: 'password123', 
    type: 'jobseeker',
    phone: '+91 9876543211',
    location: 'Delhi, NCR',
    createdAt: new Date('2024-01-20')
  },
  { 
    id: '3', 
    name: 'ABC कंपनी HR', 
    email: 'hr@abc.com', 
    password: 'password123', 
    type: 'employer',
    company: 'ABC Technologies',
    phone: '+91 9876543212',
    location: 'Bangalore, Karnataka',
    createdAt: new Date('2024-01-10')
  },
  { 
    id: '4', 
    name: 'XYZ HR Manager', 
    email: 'jobs@xyz.com', 
    password: 'password123', 
    type: 'employer',
    company: 'XYZ Industries',
    phone: '+91 9876543213',
    location: 'Pune, Maharashtra',
    createdAt: new Date('2024-01-12')
  },
  {
    id: 'admin1',
    name: 'Admin User',
    email: 'admin@babadham.com',
    password: 'admin123',
    type: 'admin',
    phone: '+91 9876543214',
    location: 'Head Office',
    createdAt: new Date('2024-01-01')
  }
];

const initialJobs: Job[] = [
  {
    id: 'job1',
    title: 'Software Developer',
    company: 'ABC Technologies',
    location: 'Mumbai, Maharashtra',
    salary: '₹8-12 LPA',
    type: 'Full-time',
    experience: '2-4 years',
    skills: ['React', 'Node.js', 'MongoDB'],
    description: 'We are looking for a skilled Software Developer to join our dynamic team.',
    requirements: ['Bachelor\'s degree in Computer Science', '2-4 years experience'],
    benefits: ['Health insurance', 'Flexible hours'],
    postedBy: '3',
    postedAt: new Date('2024-12-20'),
    status: 'active',
    applications: []
  },
  {
    id: 'job2',
    title: 'Marketing Manager',
    company: 'XYZ Industries',
    location: 'Delhi, NCR',
    salary: '₹6-10 LPA',
    type: 'Full-time',
    experience: '3-5 years',
    skills: ['Digital Marketing', 'SEO', 'Analytics'],
    description: 'Join our marketing team as a Marketing Manager.',
    requirements: ['MBA in Marketing', '3-5 years experience'],
    benefits: ['Performance bonus', 'Remote work'],
    postedBy: '4',
    postedAt: new Date('2024-12-21'),
    status: 'active',
    applications: []
  }
];

const initialApplications: Application[] = [];

export function AppProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<(User & { password: string })[]>(initialUsers);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [isLoading, setIsLoading] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
      }
    }
  }, []);

  // Save user to localStorage when currentUser changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  const login = async (email: string, password: string, userType: 'jobseeker' | 'employer' | 'admin'): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = users.find(u => 
      u.email.toLowerCase() === email.toLowerCase() && 
      u.password === password && 
      u.type === userType
    );
    
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      setCurrentUser(userWithoutPassword);
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (name: string, email: string, password: string, userType: 'jobseeker' | 'employer'): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      setIsLoading(false);
      return false;
    }
    
    // Create new user
    const newUser = {
      id: `user_${Date.now()}`,
      name,
      email,
      password,
      type: userType,
      createdAt: new Date(),
      ...(userType === 'employer' && { company: name })
    };
    
    setUsers(prev => [...prev, newUser]);
    
    // Set as current user
    const { password: _, ...userWithoutPassword } = newUser;
    setCurrentUser(userWithoutPassword);
    
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const addJob = (jobData: Omit<Job, 'id' | 'postedAt' | 'applications'>) => {
    const newJob: Job = {
      ...jobData,
      id: `job_${Date.now()}`,
      postedAt: new Date(),
      applications: []
    };
    
    setJobs(prev => [newJob, ...prev]);
  };

  const updateJob = (jobId: string, updates: Partial<Job>) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId ? { ...job, ...updates } : job
    ));
  };

  const deleteJob = (jobId: string) => {
    setJobs(prev => prev.filter(job => job.id !== jobId));
    setApplications(prev => prev.filter(app => app.jobId !== jobId));
  };

  const addApplication = (appData: Omit<Application, 'id' | 'appliedAt'>) => {
    const newApplication: Application = {
      ...appData,
      id: `app_${Date.now()}`,
      appliedAt: new Date()
    };
    
    setApplications(prev => [newApplication, ...prev]);
    
    // Update job's applications array
    setJobs(prev => prev.map(job => 
      job.id === appData.jobId 
        ? { ...job, applications: [newApplication, ...job.applications] }
        : job
    ));
  };

  const updateApplicationStatus = (appId: string, status: Application['status']) => {
    setApplications(prev => prev.map(app => 
      app.id === appId ? { ...app, status } : app
    ));
    
    // Update in jobs as well
    setJobs(prev => prev.map(job => ({
      ...job,
      applications: job.applications.map(app => 
        app.id === appId ? { ...app, status } : app
      )
    })));
  };

  const value: AppContextType = {
    users: users.map(({ password, ...user }) => user),
    currentUser,
    jobs,
    applications,
    login,
    register,
    logout,
    addJob,
    updateJob,
    deleteJob,
    addApplication,
    updateApplicationStatus,
    isLoading
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}