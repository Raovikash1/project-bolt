import React, { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface JobPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  employerId: string;
  companyName: string;
  onJobPosted?: () => void;
}

export function JobPostModal({ isOpen, onClose, employerId, companyName, onJobPosted }: JobPostModalProps) {
  const { addJob } = useApp();
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    salary: '',
    type: 'Full-time' as 'Full-time' | 'Part-time' | 'Contract' | 'Internship',
    experience: '',
    description: '',
    skills: [''],
    requirements: [''],
    benefits: ['']
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields
    if (!formData.title || !formData.location || !formData.salary || !formData.experience || !formData.description) {
      alert('कृपया सभी आवश्यक फील्ड भरें');
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Add job using context
    addJob({
      title: formData.title,
      company: companyName,
      location: formData.location,
      salary: formData.salary,
      type: formData.type,
      experience: formData.experience,
      skills: formData.skills.filter(skill => skill.trim() !== ''),
      description: formData.description,
      requirements: formData.requirements.filter(req => req.trim() !== ''),
      benefits: formData.benefits.filter(benefit => benefit.trim() !== ''),
      postedBy: employerId,
      status: 'active'
    });
    
    setIsSubmitting(false);
    alert('नौकरी सफलतापूर्वक पोस्ट की गई!');
    
    // Reset form
    setFormData({
      title: '',
      location: '',
      salary: '',
      type: 'Full-time',
      experience: '',
      description: '',
      skills: [''],
      requirements: [''],
      benefits: ['']
    });
    
    // Notify parent component
    if (onJobPosted) {
      onJobPosted();
    }
    
    onClose();
  };

  const addField = (field: 'skills' | 'requirements' | 'benefits') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeField = (field: 'skills' | 'requirements' | 'benefits', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const updateField = (field: 'skills' | 'requirements' | 'benefits', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">नई नौकरी पोस्ट करें</h3>
            <p className="text-gray-600">नई नौकरी पोस्ट करने के लिए विवरण भरें</p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">नौकरी का शीर्षक *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="जैसे: Software Developer"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">स्थान *</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="जैसे: Mumbai, Maharashtra"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">वेतन सीमा *</label>
              <input
                type="text"
                value={formData.salary}
                onChange={(e) => setFormData({...formData, salary: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="जैसे: ₹5-8 LPA"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">नौकरी का प्रकार *</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value as any})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">आवश्यक अनुभव *</label>
              <input
                type="text"
                value={formData.experience}
                onChange={(e) => setFormData({...formData, experience: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="जैसे: 2-4 years"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">नौकरी का विवरण *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="नौकरी की भूमिका, जिम्मेदारियों और आवश्यकताओं का वर्णन करें..."
              required
            />
          </div>

          {/* Skills */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">आवश्यक कौशल</label>
              <button
                type="button"
                onClick={() => addField('skills')}
                className="text-blue-600 hover:text-blue-700 flex items-center text-sm"
              >
                <Plus size={16} className="mr-1" />
                कौशल जोड़ें
              </button>
            </div>
            <div className="space-y-2">
              {formData.skills.map((skill, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => updateField('skills', index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="जैसे: React, Node.js, Python"
                  />
                  {formData.skills.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeField('skills', index)}
                      className="text-red-600 hover:text-red-700 p-2"
                    >
                      <Minus size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Requirements */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">नौकरी की आवश्यकताएं</label>
              <button
                type="button"
                onClick={() => addField('requirements')}
                className="text-blue-600 hover:text-blue-700 flex items-center text-sm"
              >
                <Plus size={16} className="mr-1" />
                आवश्यकता जोड़ें
              </button>
            </div>
            <div className="space-y-2">
              {formData.requirements.map((req, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={req}
                    onChange={(e) => updateField('requirements', index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="जैसे: Computer Science में स्नातक की डिग्री"
                  />
                  {formData.requirements.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeField('requirements', index)}
                      className="text-red-600 hover:text-red-700 p-2"
                    >
                      <Minus size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">लाभ और सुविधाएं</label>
              <button
                type="button"
                onClick={() => addField('benefits')}
                className="text-blue-600 hover:text-blue-700 flex items-center text-sm"
              >
                <Plus size={16} className="mr-1" />
                लाभ जोड़ें
              </button>
            </div>
            <div className="space-y-2">
              {formData.benefits.map((benefit, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={benefit}
                    onChange={(e) => updateField('benefits', index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="जैसे: स्वास्थ्य बीमा, लचीले काम के घंटे"
                  />
                  {formData.benefits.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeField('benefits', index)}
                      className="text-red-600 hover:text-red-700 p-2"
                    >
                      <Minus size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              रद्द करें
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                'नौकरी पोस्ट करें'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}