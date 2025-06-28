import React, { useState } from 'react';
import { X, LogIn, UserPlus, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<'jobseeker' | 'employer' | 'admin'>('jobseeker');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  const { login, register, isLoading } = useApp();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password || (!isLogin && !formData.name)) {
      setError('कृपया सभी फील्ड भरें');
      return;
    }

    try {
      let success = false;
      
      if (isLogin) {
        success = await login(formData.email, formData.password, userType);
        if (!success) {
          setError('गलत ईमेल या पासवर्ड। कृपया फिर से कोशिश करें।');
        }
      } else {
        if (userType === 'admin') {
          setError('Admin accounts cannot be created through registration.');
          return;
        }
        success = await register(formData.name, formData.email, formData.password, userType);
        if (!success) {
          setError('यह ईमेल पहले से मौजूद है। कृपया दूसरा ईमेल उपयोग करें।');
        }
      }

      if (success) {
        onClose();
        setFormData({ name: '', email: '', password: '' });
        setError('');
      }
    } catch (err) {
      setError('कुछ गलत हुआ है। कृपया फिर से कोशिश करें।');
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', password: '' });
    setError('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="text-center flex-1">
            <div className="text-3xl mb-2">🕉️</div>
            <h3 className="text-2xl font-bold text-gray-800">
              {isLogin ? 'स्वागत है' : 'नया खाता बनाएं'}
            </h3>
            <p className="text-gray-600">
              {isLogin ? 'अपने खाते में साइन इन करें' : 'BABADHAM-A2Z में शामिल हों'}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2"
          >
            <X size={24} />
          </button>
        </div>

        {/* User Type Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">आप कौन हैं?</label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setUserType('jobseeker')}
              className={`p-3 rounded-xl border-2 transition-all duration-300 text-sm ${
                userType === 'jobseeker'
                  ? 'border-orange-500 bg-orange-50 text-orange-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-xl mb-1">👤</div>
              <div className="font-medium text-xs">Job Seeker</div>
            </button>
            <button
              type="button"
              onClick={() => setUserType('employer')}
              className={`p-3 rounded-xl border-2 transition-all duration-300 text-sm ${
                userType === 'employer'
                  ? 'border-orange-500 bg-orange-50 text-orange-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-xl mb-1">🏢</div>
              <div className="font-medium text-xs">Employer</div>
            </button>
            <button
              type="button"
              onClick={() => setUserType('admin')}
              className={`p-3 rounded-xl border-2 transition-all duration-300 text-sm ${
                userType === 'admin'
                  ? 'border-orange-500 bg-orange-50 text-orange-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-xl mb-1">⚙️</div>
              <div className="font-medium text-xs">Admin</div>
            </button>
          </div>
        

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">पूरा नाम</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="अपना नाम दर्ज करें"
                required={!isLogin}
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ईमेल</label>
            <input 
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="अपना ईमेल दर्ज करें"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">पासवर्ड</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="अपना पासवर्ड दर्ज करें"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}
          
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                {isLogin ? <LogIn size={18} className="mr-2" /> : <UserPlus size={18} className="mr-2" />}
                {isLogin ? 'साइन इन करें' : 'खाता बनाएं'}
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              resetForm();
            }}
            className="text-orange-600 hover:text-orange-700 font-semibold text-sm"
          >
            {isLogin 
              ? 'नया खाता बनाना चाहते हैं? यहाँ क्लिक करें' 
              : 'पहले से खाता है? साइन इन करें'
            }
          </button>
        </div>
      </div>
    </div>
  );
}