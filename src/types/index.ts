export interface User {
  id: string;
  name: string;
  email: string;
  type: 'jobseeker' | 'employer' | 'admin';
  phone?: string;
  company?: string;
  location?: string;
  createdAt: Date;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  experience: string;
  skills: string[];
  description: string;
  requirements: string[];
  benefits: string[];
  postedBy: string; // employer user id
  postedAt: Date;
  status: 'active' | 'inactive' | 'closed';
  applications: Application[];
}

export interface Application {
  id: string;
  jobId: string;
  userId: string;
  userName: string;
  userEmail: string;
  appliedAt: Date;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired';
  resume?: string;
  coverLetter?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, userType: 'jobseeker' | 'employer' | 'admin') => Promise<boolean>;
  register: (name: string, email: string, password: string, userType: 'jobseeker' | 'employer') => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}