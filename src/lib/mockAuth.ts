interface User {
  id: string;
  email: string;
  name: string;
  type: 'jobseeker' | 'employer' | 'admin';
  phone?: string;
  company?: string;
  location?: string;
}

interface SignUpData {
  name: string;
  type: 'jobseeker' | 'employer' | 'admin';
  phone?: string;
  company?: string;
  location?: string;
}

// Mock users database
const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    name: 'राम शर्मा',
    email: 'ram@example.com',
    password: 'password123',
    type: 'jobseeker',
    phone: '+91 9876543210',
    location: 'Mumbai, Maharashtra'
  },
  {
    id: '2',
    name: 'सीता देवी',
    email: 'sita@example.com',
    password: 'password123',
    type: 'jobseeker',
    phone: '+91 9876543211',
    location: 'Delhi, NCR'
  },
  {
    id: '3',
    name: 'ABC कंपनी HR',
    email: 'hr@abc.com',
    password: 'password123',
    type: 'employer',
    company: 'ABC Technologies',
    phone: '+91 9876543212',
    location: 'Bangalore, Karnataka'
  },
  {
    id: '4',
    name: 'XYZ HR Manager',
    email: 'jobs@xyz.com',
    password: 'password123',
    type: 'employer',
    company: 'XYZ Industries',
    phone: '+91 9876543213',
    location: 'Pune, Maharashtra'
  },
  {
    id: 'admin1',
    name: 'Admin User',
    email: 'admin@babadham.com',
    password: 'admin123',
    type: 'admin',
    phone: '+91 9876543214',
    location: 'Head Office'
  }
];

export const mockAuth = {
  getCurrentUser(): User | null {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch {
        return null;
      }
    }
    return null;
  },

  async signIn(email: string, password: string): Promise<{ success: boolean; user?: User }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const user = mockUsers.find(u => 
      u.email.toLowerCase() === email.toLowerCase() && 
      u.password === password
    );

    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      return { success: true, user: userWithoutPassword };
    }

    return { success: false };
  },

  async signUp(email: string, password: string, userData: SignUpData): Promise<{ success: boolean; user?: User }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      return { success: false };
    }

    // Create new user
    const newUser: User & { password: string } = {
      id: `user_${Date.now()}`,
      email,
      password,
      name: userData.name,
      type: userData.type,
      phone: userData.phone,
      company: userData.company,
      location: userData.location
    };

    mockUsers.push(newUser);

    const { password: _, ...userWithoutPassword } = newUser;
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    return { success: true, user: userWithoutPassword };
  },

  signOut(): void {
    localStorage.removeItem('currentUser');
  }
};