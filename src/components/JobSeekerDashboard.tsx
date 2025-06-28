import React, { useState } from 'react';
import { Search, MapPin, Briefcase, Users, ChevronRight, Heart, Eye, Calendar, Building, LogOut, Filter, Star, Clock } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export function JobSeekerDashboard() {
  const { user, signOut } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [savedJobs, setSavedJobs] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState('browse');
  const [appliedJobs, setAppliedJobs] = useState<number[]>([]);

  // Mock jobs data
  const jobs = [
    {
      id: 1,
      title: 'Software Developer',
      company: 'ABC Technologies',
      location: 'Mumbai, Maharashtra',
      salary: '₹8-12 LPA',
      type: 'Full-time',
      experience: '2-4 years',
      skills: ['React', 'Node.js', 'MongoDB', 'JavaScript'],
      description: 'We are looking for a skilled Software Developer to join our dynamic team.',
      postedDate: '2024-12-20',
      applications: 45,
      rating: 4.5,
      remote: true
    },
    {
      id: 2,
      title: 'UI/UX Designer',
      company: 'Design Studio Pro',
      location: 'Delhi, NCR',
      salary: '₹6-10 LPA',
      type: 'Full-time',
      experience: '1-3 years',
      skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping'],
      description: 'Join our creative team as a UI/UX Designer and create amazing user experiences.',
      postedDate: '2024-12-19',
      applications: 32,
      rating: 4.2,
      remote: false
    },
    {
      id: 3,
      title: 'Marketing Manager',
      company: 'Growth Marketing Inc',
      location: 'Bangalore, Karnataka',
      salary: '₹10-15 LPA',
      type: 'Full-time',
      experience: '3-5 years',
      skills: ['Digital Marketing', 'SEO', 'Analytics', 'Content Strategy'],
      description: 'Lead our marketing initiatives and drive business growth.',
      postedDate: '2024-12-18',
      applications: 28,
      rating: 4.7,
      remote: true
    },
    {
      id: 4,
      title: 'Data Analyst',
      company: 'Data Insights Corp',
      location: 'Pune, Maharashtra',
      salary: '₹7-11 LPA',
      type: 'Full-time',
      experience: '2-4 years',
      skills: ['Python', 'SQL', 'Tableau', 'Excel'],
      description: 'Analyze data to provide actionable business insights.',
      postedDate: '2024-12-17',
      applications: 38,
      rating: 4.3,
      remote: false
    },
    {
      id: 5,
      title: 'Frontend Developer',
      company: 'Tech Innovators',
      location: 'Hyderabad, Telangana',
      salary: '₹6-9 LPA',
      type: 'Full-time',
      experience: '1-3 years',
      skills: ['React', 'Vue.js', 'CSS', 'TypeScript'],
      description: 'Build beautiful and responsive user interfaces.',
      postedDate: '2024-12-16',
      applications: 52,
      rating: 4.4,
      remote: true
    }
  ];

  // Mock applications data
  const myApplications = [
    {
      id: 1,
      jobId: 1,
      jobTitle: 'Software Developer',
      company: 'ABC Technologies',
      appliedDate: '2024-12-22',
      status: 'pending',
      salary: '₹8-12 LPA'
    },
    {
      id: 2,
      jobId: 2,
      jobTitle: 'UI/UX Designer',
      company: 'Design Studio Pro',
      appliedDate: '2024-12-21',
      status: 'reviewed',
      salary: '₹6-10 LPA'
    }
  ];

  const handleApplyJob = (jobId: number) => {
    if (appliedJobs.includes(jobId)) {
      alert('आपने पहले से ही इस नौकरी के लिए आवेदन किया है!');
      return;
    }
    
    setAppliedJobs([...appliedJobs, jobId]);
    alert('आवेदन सफलतापूर्वक जमा किया गया!');
  };

  const toggleSaveJob = (jobId: number) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase());
    return matchesSearch && matchesLocation;
  });

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

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'लंबित';
      case 'reviewed': return 'समीक्षित';
      case 'shortlisted': return 'चयनित';
      case 'rejected': return 'अस्वीकृत';
      case 'hired': return 'नियुक्त';
      default: return status;
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
                <p className="text-gray-600">आपके सपनों की नौकरी खोजें</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-orange-100 px-4 py-2 rounded-full">
                <span className="text-orange-700 font-medium">👤 Job Seeker</span>
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

          {/* Navigation Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('browse')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'browse'
                  ? 'bg-white text-orange-600 shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              नौकरी खोजें ({filteredJobs.length})
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'applications'
                  ? 'bg-white text-orange-600 shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              मेरे आवेदन ({myApplications.length})
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'saved'
                  ? 'bg-white text-orange-600 shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              सेव की गई नौकरियां ({savedJobs.length})
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'profile'
                  ? 'bg-white text-orange-600 shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              प्रोफाइल
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {activeTab === 'browse' && (
          <div className="space-y-6">
            {/* Search Section */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-orange-100">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative md:col-span-2">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="नौकरी का शीर्षक, कंपनी, कौशल..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="स्थान"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-8 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center">
                  <Search size={20} className="mr-2" />
                  खोजें
                </button>
              </div>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 bg-white border border-orange-200 rounded-full text-orange-600 hover:bg-orange-50 transition-colors">
                Remote Jobs
              </button>
              <button className="px-4 py-2 bg-white border border-orange-200 rounded-full text-orange-600 hover:bg-orange-50 transition-colors">
                Full-time
              </button>
              <button className="px-4 py-2 bg-white border border-orange-200 rounded-full text-orange-600 hover:bg-orange-50 transition-colors">
                Fresher Jobs
              </button>
              <button className="px-4 py-2 bg-white border border-orange-200 rounded-full text-orange-600 hover:bg-orange-50 transition-colors">
                High Salary
              </button>
            </div>

            {/* Jobs Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredJobs.map((job) => (
                <div key={job.id} className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-orange-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
                        {job.remote && (
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                            Remote
                          </span>
                        )}
                      </div>
                      <div className="flex items-center text-orange-600 font-semibold mb-2">
                        <Building size={16} className="mr-2" />
                        {job.company}
                      </div>
                      <div className="flex items-center text-gray-600 mb-2">
                        <Star size={14} className="mr-1 text-yellow-500" />
                        <span className="text-sm">{job.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleSaveJob(job.id)}
                        className={`p-2 rounded-full transition-colors ${
                          savedJobs.includes(job.id)
                            ? 'bg-red-100 text-red-600'
                            : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600'
                        }`}
                      >
                        <Heart size={18} fill={savedJobs.includes(job.id) ? 'currentColor' : 'none'} />
                      </button>
                      <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                        {job.type}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <MapPin size={16} className="mr-3 text-orange-500" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Briefcase size={16} className="mr-3 text-orange-500" />
                      <span>{job.experience}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users size={16} className="mr-3 text-orange-500" />
                      <span>{job.salary}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.slice(0, 4).map((skill, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                    {job.skills.length > 4 && (
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        +{job.skills.length - 4} और
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-gray-500 text-sm">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {job.postedDate}
                      </div>
                      <div className="flex items-center mt-1">
                        <Users size={14} className="mr-1" />
                        {job.applications} आवेदन
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center">
                        <Eye size={16} className="mr-2" />
                        विवरण
                      </button>
                      <button 
                        onClick={() => handleApplyJob(job.id)}
                        disabled={appliedJobs.includes(job.id)}
                        className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center ${
                          appliedJobs.includes(job.id)
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700'
                        }`}
                      >
                        {appliedJobs.includes(job.id) ? 'आवेदन किया गया' : 'आवेदन करें'}
                        {!appliedJobs.includes(job.id) && <ChevronRight size={16} className="ml-2" />}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">कोई नौकरी नहीं मिली</h3>
                <p className="text-gray-600">अपने खोज मापदंड बदलने का प्रयास करें</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl border border-orange-100">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <FileText className="mr-2 text-orange-500" />
                  मेरे आवेदन
                </h2>
                <p className="text-gray-600">आपके द्वारा किए गए सभी आवेदनों की स्थिति देखें</p>
              </div>

              <div className="divide-y divide-gray-200">
                {myApplications.length > 0 ? (
                  myApplications.map((application) => (
                    <div key={application.id} className="p-6 hover:bg-orange-50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            {application.jobTitle}
                          </h3>
                          <div className="flex items-center text-gray-600 mb-2">
                            <Building size={16} className="mr-2" />
                            {application.company}
                          </div>
                          <div className="flex items-center text-gray-500 text-sm mb-2">
                            <Calendar size={14} className="mr-2" />
                            आवेदन दिनांक: {application.appliedDate}
                          </div>
                          <div className="text-gray-600 font-medium">
                            {application.salary}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                            {getStatusText(application.status)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center">
                    <div className="text-6xl mb-4">📄</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">कोई आवेदन नहीं</h3>
                    <p className="text-gray-600 mb-4">आपने अभी तक कोई नौकरी के लिए आवेदन नहीं किया है</p>
                    <button
                      onClick={() => setActiveTab('browse')}
                      className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
                    >
                      नौकरी खोजना शुरू करें
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'saved' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl border border-orange-100">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <Heart className="mr-2 text-orange-500" />
                  सेव की गई नौकरियां
                </h2>
                <p className="text-gray-600">आपकी पसंदीदा नौकरियां</p>
              </div>

              <div className="divide-y divide-gray-200">
                {savedJobs.length > 0 ? (
                  jobs.filter(job => savedJobs.includes(job.id)).map((job) => (
                    <div key={job.id} className="p-6 hover:bg-orange-50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">{job.title}</h3>
                          <div className="flex items-center text-gray-600 mb-2">
                            <Building size={16} className="mr-2" />
                            {job.company}
                          </div>
                          <div className="flex items-center text-gray-600 mb-2">
                            <MapPin size={16} className="mr-2" />
                            {job.location}
                          </div>
                          <div className="flex items-center text-gray-600 mb-2">
                            <Users size={16} className="mr-2" />
                            {job.salary}
                          </div>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {job.skills.slice(0, 3).map((skill, index) => (
                              <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => toggleSaveJob(job.id)}
                            className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                          >
                            <Heart size={18} fill="currentColor" />
                          </button>
                          <button 
                            onClick={() => handleApplyJob(job.id)}
                            disabled={appliedJobs.includes(job.id)}
                            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                              appliedJobs.includes(job.id)
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700'
                            }`}
                          >
                            {appliedJobs.includes(job.id) ? 'आवेदन किया गया' : 'आवेदन करें'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center">
                    <div className="text-6xl mb-4">💾</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">कोई सेव की गई नौकरी नहीं</h3>
                    <p className="text-gray-600 mb-4">आपने अभी तक कोई नौकरी सेव नहीं की है</p>
                    <button
                      onClick={() => setActiveTab('browse')}
                      className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
                    >
                      नौकरी खोजना शुरू करें
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl border border-orange-100 p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Users className="mr-2 text-orange-500" />
                प्रोफाइल सेटिंग्स
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">पूरा नाम</label>
                  <input
                    type="text"
                    value={user?.name || ''}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="अपना नाम दर्ज करें"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ईमेल</label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="अपना ईमेल दर्ज करें"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">फोन नंबर</label>
                  <input
                    type="tel"
                    value={user?.phone || ''}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="+91 9876543210"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">स्थान</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="शहर, राज्य"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">कौशल</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="जैसे: React, JavaScript, Python (comma separated)"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">बायो</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="अपने बारे में बताएं..."
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                  प्रोफाइल अपडेट करें
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}