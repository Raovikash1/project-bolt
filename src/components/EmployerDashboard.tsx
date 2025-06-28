import React, { useState } from 'react';
import { Plus, Eye, Edit, Trash2, Users, Briefcase, Calendar, MapPin, Building, Search, Filter, LogOut, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export function EmployerDashboard() {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('jobs');
  const [searchTerm, setSearchTerm] = useState('');
  const [showJobModal, setShowJobModal] = useState(false);
  const [jobForm, setJobForm] = useState({
    title: '',
    location: '',
    salary: '',
    type: 'Full-time',
    experience: '',
    description: '',
    skills: '',
    requirements: ''
  });

  // Mock data for employer
  const employerJobs = [
    { 
      id: 1, 
      title: 'Software Developer', 
      location: 'Mumbai', 
      salary: '₹8-12 LPA', 
      type: 'Full-time',
      applications: 45, 
      status: 'active',
      postedDate: '2024-12-20',
      skills: ['React', 'Node.js', 'MongoDB']
    },
    { 
      id: 2, 
      title: 'UI/UX Designer', 
      location: 'Delhi', 
      salary: '₹6-10 LPA', 
      type: 'Full-time',
      applications: 32, 
      status: 'active',
      postedDate: '2024-12-18',
      skills: ['Figma', 'Adobe XD', 'Sketch']
    },
    { 
      id: 3, 
      title: 'Marketing Manager', 
      location: 'Bangalore', 
      salary: '₹10-15 LPA', 
      type: 'Full-time',
      applications: 28, 
      status: 'inactive',
      postedDate: '2024-12-15',
      skills: ['Digital Marketing', 'SEO', 'Analytics']
    }
  ];

  const applications = [
    { 
      id: 1, 
      jobTitle: 'Software Developer', 
      candidateName: 'राम शर्मा', 
      candidateEmail: 'ram@example.com',
      appliedDate: '2024-12-22', 
      status: 'pending',
      experience: '3 years',
      skills: ['React', 'JavaScript', 'Python']
    },
    { 
      id: 2, 
      jobTitle: 'UI/UX Designer', 
      candidateName: 'सीता देवी', 
      candidateEmail: 'sita@example.com',
      appliedDate: '2024-12-21', 
      status: 'reviewed',
      experience: '2 years',
      skills: ['Figma', 'Photoshop', 'Illustrator']
    },
    { 
      id: 3, 
      jobTitle: 'Software Developer', 
      candidateName: 'गीता पटेल', 
      candidateEmail: 'geeta@example.com',
      appliedDate: '2024-12-20', 
      status: 'shortlisted',
      experience: '4 years',
      skills: ['React', 'Node.js', 'AWS']
    }
  ];

  const handleJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Job posted:', jobForm);
    setShowJobModal(false);
    setJobForm({
      title: '',
      location: '',
      salary: '',
      type: 'Full-time',
      experience: '',
      description: '',
      skills: '',
      requirements: ''
    });
    alert('नौकरी सफलतापूर्वक पोस्ट की गई!');
  };

  const handleStatusChange = (appId: number, newStatus: string) => {
    console.log(`Application ${appId} status changed to ${newStatus}`);
    alert(`आवेदन की स्थिति "${newStatus}" में बदल दी गई है।`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'reviewed': return 'bg-blue-100 text-blue-800';
      case 'shortlisted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'hired': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md shadow-lg border-b border-orange-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">🕉️</div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">नमस्ते, {user?.name}!</h1>
                <p className="text-gray-600">अपनी कंपनी के लिए बेहतरीन प्रतिभा खोजें</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 px-4 py-2 rounded-full">
                <span className="text-blue-700 font-medium">🏢 Employer</span>
              </div>
              <button
                onClick={() => setShowJobModal(true)}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center"
              >
                <Plus size={20} className="mr-2" />
                नई नौकरी पोस्ट करें
              </button>
              <button
                onClick={signOut}
                className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('jobs')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'jobs'
                  ? 'bg-white text-orange-600 shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              मेरी नौकरियां ({employerJobs.length})
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'applications'
                  ? 'bg-white text-orange-600 shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              आवेदन ({applications.length})
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'analytics'
                  ? 'bg-white text-orange-600 shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              एनालिटिक्स
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-orange-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">कुल नौकरियां</p>
                <p className="text-3xl font-bold text-blue-600">{employerJobs.length}</p>
              </div>
              <Briefcase className="text-blue-600" size={32} />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-orange-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">कुल आवेदन</p>
                <p className="text-3xl font-bold text-green-600">{applications.length}</p>
              </div>
              <Users className="text-green-600" size={32} />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-orange-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">सक्रिय नौकरियां</p>
                <p className="text-3xl font-bold text-orange-600">
                  {employerJobs.filter(job => job.status === 'active').length}
                </p>
              </div>
              <Eye className="text-orange-600" size={32} />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-orange-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">नए आवेदन</p>
                <p className="text-3xl font-bold text-purple-600">
                  {applications.filter(app => app.status === 'pending').length}
                </p>
              </div>
              <Calendar className="text-purple-600" size={32} />
            </div>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'jobs' && (
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="bg-white rounded-xl p-4 shadow-lg border border-orange-100">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="नौकरी खोजें..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
                  <Filter size={20} className="mr-2" />
                  फिल्टर
                </button>
              </div>
            </div>

            {/* Jobs List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {employerJobs.map((job) => (
                <div key={job.id} className="bg-white rounded-2xl p-6 shadow-xl border border-orange-100 hover:shadow-2xl transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{job.title}</h3>
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin size={16} className="mr-2" />
                        {job.location}
                      </div>
                      <div className="flex items-center text-gray-600 mb-2">
                        <Briefcase size={16} className="mr-2" />
                        {job.salary}
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      job.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {job.status === 'active' ? 'सक्रिय' : 'निष्क्रिय'}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.map((skill, index) => (
                      <span key={index} className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-gray-500 text-sm">
                      <div>{job.applications} आवेदन</div>
                      <div>पोस्ट: {job.postedDate}</div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                        <Edit size={18} />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl border border-orange-100">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800">प्राप्त आवेदन</h2>
              </div>

              <div className="divide-y divide-gray-200">
                {applications.map((app) => (
                  <div key={app.id} className="p-6 hover:bg-orange-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-800">{app.candidateName}</h3>
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(app.status)}`}>
                            {app.status}
                          </span>
                        </div>
                        
                        <div className="text-gray-600 mb-2">{app.candidateEmail}</div>
                        
                        <div className="flex items-center text-gray-600 mb-2">
                          <Briefcase size={16} className="mr-2" />
                          आवेदन: {app.jobTitle}
                        </div>
                        
                        <div className="flex items-center text-gray-600 mb-2">
                          <Users size={16} className="mr-2" />
                          अनुभव: {app.experience}
                        </div>

                        <div className="flex flex-wrap gap-2 mb-2">
                          {app.skills.map((skill, index) => (
                            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                              {skill}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center text-gray-500 text-sm">
                          <Calendar size={14} className="mr-2" />
                          आवेदन दिनांक: {app.appliedDate}
                        </div>
                      </div>

                      <div className="ml-4">
                        <select
                          value={app.status}
                          onChange={(e) => handleStatusChange(app.id, e.target.value)}
                          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                        >
                          <option value="pending">लंबित</option>
                          <option value="reviewed">समीक्षित</option>
                          <option value="shortlisted">चयनित</option>
                          <option value="rejected">अस्वीकृत</option>
                          <option value="hired">नियुक्त</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-orange-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <BarChart3 className="mr-2 text-orange-500" />
                एनालिटिक्स
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h3 className="font-semibold text-orange-800 mb-2">नौकरी प्रदर्शन</h3>
                  <div className="space-y-2">
                    {employerJobs.map(job => (
                      <div key={job.id} className="flex justify-between text-sm">
                        <span className="text-gray-700">{job.title}</span>
                        <span className="font-medium text-orange-600">{job.applications} आवेदन</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">आवेदन स्थिति</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700">लंबित</span>
                      <span className="font-medium text-yellow-600">
                        {applications.filter(app => app.status === 'pending').length}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700">चयनित</span>
                      <span className="font-medium text-green-600">
                        {applications.filter(app => app.status === 'shortlisted').length}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700">नियुक्त</span>
                      <span className="font-medium text-purple-600">
                        {applications.filter(app => app.status === 'hired').length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Job Post Modal */}
      {showJobModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">नई नौकरी पोस्ट करें</h3>
              <button onClick={() => setShowJobModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleJobSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">नौकरी का शीर्षक *</label>
                  <input
                    type="text"
                    value={jobForm.title}
                    onChange={(e) => setJobForm({...jobForm, title: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="जैसे: Software Developer"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">स्थान *</label>
                  <input
                    type="text"
                    value={jobForm.location}
                    onChange={(e) => setJobForm({...jobForm, location: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="जैसे: Mumbai, Maharashtra"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">वेतन सीमा *</label>
                  <input
                    type="text"
                    value={jobForm.salary}
                    onChange={(e) => setJobForm({...jobForm, salary: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="जैसे: ₹5-8 LPA"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">नौकरी का प्रकार *</label>
                  <select
                    value={jobForm.type}
                    onChange={(e) => setJobForm({...jobForm, type: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">आवश्यक अनुभव *</label>
                <input
                  type="text"
                  value={jobForm.experience}
                  onChange={(e) => setJobForm({...jobForm, experience: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="जैसे: 2-4 years"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">नौकरी का विवरण *</label>
                <textarea
                  value={jobForm.description}
                  onChange={(e) => setJobForm({...jobForm, description: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="नौकरी की भूमिका, जिम्मेदारियों का वर्णन करें..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">आवश्यक कौशल</label>
                <input
                  type="text"
                  value={jobForm.skills}
                  onChange={(e) => setJobForm({...jobForm, skills: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="जैसे: React, Node.js, Python (comma separated)"
                />
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => setShowJobModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  नौकरी पोस्ट करें
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}