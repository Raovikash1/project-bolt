import React, { useState } from 'react';
import { X, LogIn, UserPlus, Eye, EyeOff, Phone } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../context/LanguageContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
  const [userType, setUserType] = useState<'jobseeker' | 'employer'>('jobseeker');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    companyName: '',
    location: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  
  const { signIn, signUp, signInWithOTP, verifyOTP, loading } = useAuth();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (authMethod === 'phone') {
      if (!otpSent) {
        // Send OTP
        if (!formData.phone) {
          setError('कृपया फोन नंबर दर्ज करें / Please enter phone number');
          return;
        }
        const result = await signInWithOTP(formData.phone);
        if (result.success) {
          setOtpSent(true);
        } else {
          setError(result.error || 'OTP भेजने में त्रुटि / Error sending OTP');
        }
      } else {
        // Verify OTP
        if (!otp) {
          setError('कृपया OTP दर्ज करें / Please enter OTP');
          return;
        }
        const result = await verifyOTP(formData.phone, otp);
        if (result.success) {
          onClose();
          resetForm();
        } else {
          setError('गलत OTP / Invalid OTP');
        }
      }
      return;
    }

    // Email authentication
    if (!formData.email || !formData.password || (!isLogin && !formData.name)) {
      setError('कृपया सभी आवश्यक फील्ड भरें / Please fill all required fields');
      return;
    }

    try {
      let result;
      
      if (isLogin) {
        result = await signIn(formData.email, formData.password);
      } else {
        result = await signUp(
          formData.email, 
          formData.password, 
          formData.name,
          formData.phone,
          userType,
          formData.companyName,
          formData.location
        );
      }

      if (result.success) {
        onClose();
        resetForm();
      } else {
        setError(result.error || (isLogin ? 'गलत ईमेल या पासवर्ड / Invalid email or password' : 'खाता बनाने में त्रुटि / Error creating account'));
      }
    } catch (err) {
      setError('कुछ गलत हुआ है। कृपया फिर से कोशिश करें। / Something went wrong. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', phone: '', password: '', companyName: '', location: '' });
    setError('');
    setOtpSent(false);
    setOtp('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="text-center flex-1">
            <div className="text-3xl mb-2">🕉️</div>
            <h3 className="text-2xl font-bold text-gray-800">
              {isLogin ? t('auth.welcome') : t('auth.create')}
            </h3>
            <p className="text-gray-600">
              {isLogin ? t('auth.signin.subtitle') : t('auth.signup.subtitle')}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2"
          >
            <X size={24} />
          </button>
        </div>

        {/* Auth Method Toggle */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
          <button
            onClick={() => setAuthMethod('email')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
              authMethod === 'email'
                ? 'bg-white text-orange-600 shadow-md'
                : 'text-gray-600'
            }`}
          >
            {t('auth.email')}
          </button>
          <button
            onClick={() => setAuthMethod('phone')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
              authMethod === 'phone'
                ? 'bg-white text-orange-600 shadow-md'
                : 'text-gray-600'
            }`}
          >
            {t('auth.phone')}
          </button>
        </div>

        {/* User Type Selection */}
        {authMethod === 'email' && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">{t('auth.who.are.you')}</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setUserType('jobseeker')}
                className={`p-4 rounded-xl border-2 transition-all duration-300 text-sm ${
                  userType === 'jobseeker'
                    ? 'border-orange-500 bg-orange-50 text-orange-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-2">👤</div>
                <div className="font-medium">Job Seeker</div>
                <div className="text-xs text-gray-500">{t('auth.jobseeker')}</div>
              </button>
              <button
                type="button"
                onClick={() => setUserType('employer')}
                className={`p-4 rounded-xl border-2 transition-all duration-300 text-sm ${
                  userType === 'employer'
                    ? 'border-orange-500 bg-orange-50 text-orange-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-2">🏢</div>
                <div className="font-medium">Employer</div>
                <div className="text-xs text-gray-500">{t('auth.employer')}</div>
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {authMethod === 'phone' ? (
            // Phone Authentication
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('auth.phone.number')}</label>
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="+91 9876543210"
                  required
                  disabled={otpSent}
                />
              </div>

              {otpSent && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">OTP दर्ज करें / Enter OTP</label>
                  <input 
                    type="text" 
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="6 अंकों का कोड / 6 digit code"
                    maxLength={6}
                    required
                  />
                </div>
              )}
            </>
          ) : (
            // Email Authentication
            <>
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('auth.fullname')} *</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="अपना नाम दर्ज करें / Enter your name"
                    required={!isLogin}
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('auth.email')} *</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="अपना ईमेल दर्ज करें / Enter your email"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('auth.password')} *</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="अपना पासवर्ड दर्ज करें / Enter your password"
                    required
                    minLength={6}
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

              {!isLogin && userType === 'employer' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('auth.company')}</label>
                    <input 
                      type="text" 
                      value={formData.companyName}
                      onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="आपकी कंपनी का नाम / Your company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('auth.location')}</label>
                    <input 
                      type="text" 
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="शहर, राज्य / City, State"
                    />
                  </div>
                </>
              )}

              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('auth.phone.number')} (वैकल्पिक / Optional)</label>
                  <input 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="+91 9876543210"
                  />
                </div>
              )}
            </>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}
          
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                {authMethod === 'phone' ? (
                  <>
                    <Phone size={18} className="mr-2" />
                    {otpSent ? t('auth.otp.verify') : t('auth.otp.send')}
                  </>
                ) : (
                  <>
                    {isLogin ? <LogIn size={18} className="mr-2" /> : <UserPlus size={18} className="mr-2" />}
                    {isLogin ? t('auth.signin') : t('auth.signup')}
                  </>
                )}
              </>
            )}
          </button>
        </form>

        {authMethod === 'email' && (
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                resetForm();
              }}
              className="text-orange-600 hover:text-orange-700 font-semibold text-sm"
            >
              {isLogin ? t('auth.new.account') : t('auth.existing.account')}
            </button>
          </div>
        )}

        {otpSent && (
          <div className="mt-4 text-center">
            <button
              onClick={() => {
                setOtpSent(false);
                setOtp('');
              }}
              className="text-orange-600 hover:text-orange-700 font-semibold text-sm"
            >
              फोन नंबर बदलें / Change phone number
            </button>
          </div>
        )}

        <div className="mt-6 text-center text-xs text-gray-500">
          <p>{t('landing.hero.blessing')}</p>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-blue-800 font-medium">🔗 Supabase Setup Required</p>
            <p className="text-blue-600 text-xs mt-1">
              To enable real authentication, please connect your Supabase project in the top-right corner.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}