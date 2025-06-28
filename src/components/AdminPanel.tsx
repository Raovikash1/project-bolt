import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Briefcase, 
  FileText, 
  BarChart3, 
  Settings, 
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  LogOut,
  X,
  Plus,
  TrendingUp,
  Building,
  Calendar,
  MapPin
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

export function AdminPanel() {
  const { signOut, user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplications: 0,
    totalUsers: 0,
    activeJobs: 0
  });
  const [recentData, setRecentData] = useState({
    jobs: [],
    applications: [],
    users: []
  });

  // Mock data for demo purposes
  const mockStats = {
    totalJobs: 156,
    totalApplications: 1247,
    totalUsers: 892,
    activeJobs: 134
  };

  const mockRecentApplications = [
    { id: 1, userName: 'राम शर्मा', jobTitle: 'Software Developer', status: 'pending', date: '2024-12-25' },
    { id: 2, userName: 'सीता देवी', jobTitle: 'Marketing Manager', status: 'reviewed', date: '2024-12-24' },
    { id: 3, userName: 'गीता पटेल', jobTitle: 'Data Analyst', status: 'shortlisted', date: '2024-12-23' },
    { id: 4, userName: 'अमित कुमार', jobTitle: 'UI/UX Designer', status: 'pending', date: '2024-12-22' },
    { id: 5, userName: 'प्रिया शर्मा', jobTitle: 'Frontend Developer', status: 'reviewed', date: '2024-12-21' }
  ];

  const mockJobs = [
    { id: 1, title: 'Software Developer', company: 'ABC Tech', location: 'Mumbai', applications: 45, status: 'active', postedDate: '2024-12-20' },
    { id: 2, title: 'Marketing Manager', company: 'XYZ Corp', location: 'Delhi', applications: 32, status: 'active', postedDate: '2024-12-19' },
    { id: 3, title: 'Data Analyst', company: 'Data Solutions', location: 'Bangalore', applications: 28, status: 'inactive', postedDate: '2024-12-18' },
    { id: 4, title: 'UI/UX Designer', company: 'Design Studio', location: 'Pune', applications: 38, status: 'active', postedDate: '2024-12-17' },
    { id: 5, title: 'Frontend Developer', company: 'Tech Innovators', location: 'Hyderabad', applications: 52, status: 'active', postedDate: '2024-12-16' }
  ];

  const mockUsers = [
    { id: 1, name: 'राम शर्मा', email: 'ram@example.com', type: 'jobseeker', location: 'Mumbai', joined: '2024-01-15', status: 'active' },
    { id: 2, name: 'ABC Company HR', email: 'hr@abc.com', type: 'employer', location: 'Delhi', joined: '2024-01-10', status: 'active' },
    { id: 3, name: 'सीता देवी', email: 'sita@example.com', type: 'jobseeker', location: 'Pune', joined: '2024-01-20', status: 'active' },
    { id: 4, name: 'XYZ Industries', email: 'jobs@xyz.com', type: 'employer', location: 'Bangalore', joined: '2024-01-12', status: 'active' },
    { id: 5, name: 'गीता पटेल', email: 'geeta@example.com', type: 'jobseeker', location: 'Chennai', joined: '2024-01-25', status: 'active' }
  ];

  useEffect(() => {
    // Load mock data for demo
    setStats(mockStats);
    setRecentData({
      jobs: mockJobs,
      applications: mockRecentApplications,
      users: mockUsers
    });
  }, []);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'jobs', label: 'Jobs Management', icon: Briefcase },
    { id: 'applications', label: 'Applications', icon: FileText },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'reviewed': return 'bg-blue-100 text-blue-800';
      case 'shortlisted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'hired': return 'bg-purple-100 text-purple-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'लंबित';
      case 'reviewed': return 'समीक्षित';
      case 'shortlisted': return 'चयनित';
      case 'rejected': return 'अस्वीकृत';
      case 'hired': return 'नियुक्त';
      case 'active': return 'सक्रिय';
      case 'inactive': return 'निष्क्रिय';
      default: return status;
    }
  };

  const renderDashboard = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 flex items-center">
            🕉️ Admin Dashboard
          </h2>
          <p className="text-gray-600 mt-2">BABADHAM-A2Z CONSULTANCY Management Portal</p>
          <div className="text-orange-600 font-medium mt-1">
            🙏 भगवान शिव के आशीर्वाद से / With Lord Shiva's Blessings 🙏
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Welcome Admin</div>
          <div className="font-semibold text-gray-800">{user?.email}</div>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Jobs</p>
              <p className="text-3xl font-bold">{stats.totalJobs}</p>
              <p className="text-blue-200 text-xs mt-1">कुल नौकरियां</p>
            </div>
            <div className="bg-blue-400 bg-opacity-30 p-3 rounded-xl">
              <Briefcase size={32} className="text-blue-100" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Total Applications</p>
              <p className="text-3xl font-bold">{stats.totalApplications}</p>
              <p className="text-green-200 text-xs mt-1">कुल आवेदन</p>
            </div>
            <div className="bg-green-400 bg-opacity-30 p-3 rounded-xl">
              <FileText size={32} className="text-green-100" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Total Users</p>
              <p className="text-3xl font-bold">{stats.totalUsers}</p>
              <p className="text-purple-200 text-xs mt-1">कुल उपयोगकर्ता</p>
            </div>
            <div className="bg-purple-400 bg-opacity-30 p-3 rounded-xl">
              <Users size={32} className="text-purple-100" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Active Jobs</p>
              <p className="text-3xl font-bold">{stats.activeJobs}</p>
              <p className="text-orange-200 text-xs mt-1">सक्रिय नौकरियां</p>
            </div>
            <div className="bg-orange-400 bg-opacity-30 p-3 rounded-xl">
              <CheckCircle size={32} className="text-orange-100" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Applications */}
        <div className="bg-white rounded-2xl p-6 shadow-xl border border-orange-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              <FileText className="mr-2 text-orange-500" />
              Recent Applications
            </h3>
            <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {mockRecentApplications.slice(0, 5).map((app) => (
              <div key={app.id} className="flex items-center justify-between p-4 bg-orange-50 rounded-xl border border-orange-100 hover:bg-orange-100 transition-colors">
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{app.userName}</p>
                  <p className="text-gray-600 text-sm">Applied for: {app.jobTitle}</p>
                  <p className="text-gray-500 text-xs flex items-center mt-1">
                    <Calendar size={12} className="mr-1" />
                    {app.date}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(app.status)}`}>
                  {getStatusText(app.status)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Jobs */}
        <div className="bg-white rounded-2xl p-6 shadow-xl border border-orange-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              <Briefcase className="mr-2 text-orange-500" />
              Recent Jobs Posted
            </h3>
            <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {mockJobs.slice(0, 5).map((job) => (
              <div key={job.id} className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-100 hover:bg-blue-100 transition-colors">
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{job.title}</p>
                  <p className="text-gray-600 text-sm flex items-center">
                    <Building size={12} className="mr-1" />
                    {job.company}
                  </p>
                  <p className="text-gray-500 text-xs flex items-center mt-1">
                    <MapPin size={12} className="mr-1" />
                    {job.location} • {job.applications} applications
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(job.status)}`}>
                  {getStatusText(job.status)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-xl border border-orange-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <Settings className="mr-2 text-orange-500" />
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="p-4 bg-blue-50 rounded-xl border border-blue-200 hover:bg-blue-100 transition-colors text-left">
            <Plus className="text-blue-600 mb-2" size={24} />
            <div className="font-semibold text-gray-800">Add New Job</div>
            <div className="text-gray-600 text-sm">Post a new job opening</div>
          </button>
          <button className="p-4 bg-green-50 rounded-xl border border-green-200 hover:bg-green-100 transition-colors text-left">
            <Users className="text-green-600 mb-2" size={24} />
            <div className="font-semibold text-gray-800">Manage Users</div>
            <div className="text-gray-600 text-sm">View and manage users</div>
          </button>
          <button className="p-4 bg-purple-50 rounded-xl border border-purple-200 hover:bg-purple-100 transition-colors text-left">
            <BarChart3 className="text-purple-600 mb-2" size={24} />
            <div className="font-semibold text-gray-800">View Analytics</div>
            <div className="text-gray-600 text-sm">Check platform statistics</div>
          </button>
          <button className="p-4 bg-orange-50 rounded-xl border border-orange-200 hover:bg-orange-100 transition-colors text-left">
            <Settings className="text-orange-600 mb-2" size={24} />
            <div className="font-semibold text-gray-800">System Settings</div>
            <div className="text-gray-600 text-sm">Configure platform settings</div>
          </button>
        </div>
      </div>
    </div>
  );

  const renderJobs = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Briefcase className="mr-2 text-orange-500" />
          Job Management
        </h2>
        <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center">
          <Plus size={20} className="mr-2" />
          Add New Job
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-orange-100">
        <div className="p-6 border-b border-gray-200">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search jobs..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <button className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 flex items-center">
              <Filter size={20} className="mr-2" />
              Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-orange-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Job Details</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Company</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Location</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Applications</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockJobs.map((job) => (
                <tr key={job.id} className="hover:bg-orange-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{job.title}</div>
                      <div className="text-sm text-gray-500">Posted: {job.postedDate}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">{job.company}</td>
                  <td className="px-6 py-4 text-gray-900">{job.location}</td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {job.applications}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(job.status)}`}>
                      {getStatusText(job.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye size={16} />
                      </button>
                      <button className="text-green-600 hover:text-green-900 p-2 hover:bg-green-50 rounded-lg transition-colors">
                        <Edit size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Users className="mr-2 text-orange-500" />
          User Management
        </h2>
        <div className="flex gap-3">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            Export Users
          </button>
          <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center">
            <Plus size={20} className="mr-2" />
            Add User
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-orange-100">
        <div className="p-6 border-b border-gray-200">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search users..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <select className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent">
              <option value="">All Types</option>
              <option value="jobseeker">Job Seekers</option>
              <option value="employer">Employers</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-orange-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">User</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Type</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Location</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Joined</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockUsers.map((user) => (
                <tr key={user.id} className="hover:bg-orange-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      user.type === 'employer' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {user.type === 'employer' ? 'Employer' : 'Job Seeker'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-900">{user.location}</td>
                  <td className="px-6 py-4 text-gray-900">{user.joined}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                      {getStatusText(user.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye size={16} />
                      </button>
                      <button className="text-green-600 hover:text-green-900 p-2 hover:bg-green-50 rounded-lg transition-colors">
                        <Edit size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-lg transition-colors">
                        <XCircle size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md shadow-lg border-b border-orange-100 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">🕉️</div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
                BABADHAM-A2Z ADMIN
              </h1>
              <p className="text-sm text-gray-600">CONSULTANCY MANAGEMENT PORTAL</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-purple-100 px-4 py-2 rounded-full">
              <span className="text-purple-700 font-medium">👑 Admin</span>
            </div>
            <button
              onClick={signOut}
              className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-64 bg-white rounded-2xl shadow-xl p-6 border border-orange-100 h-fit">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-orange-50'
                  }`}
                >
                  <tab.icon size={20} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'jobs' && renderJobs()}
            {activeTab === 'users' && renderUsers()}
            {activeTab === 'applications' && (
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-orange-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <FileText className="mr-2 text-orange-500" />
                  Applications Management
                </h2>
                <p className="text-gray-600">Application management features coming soon...</p>
              </div>
            )}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-orange-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <Settings className="mr-2 text-orange-500" />
                  System Settings
                </h2>
                <p className="text-gray-600">Settings panel coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}