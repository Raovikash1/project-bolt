import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'hi' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionary
const translations = {
  // Header
  'header.title': {
    hi: 'BABADHAM-A2Z CONSULTANCY',
    en: 'BABADHAM-A2Z CONSULTANCY'
  },
  'header.home': {
    hi: 'होम',
    en: 'Home'
  },
  'header.jobs': {
    hi: 'नौकरियां',
    en: 'Jobs'
  },
  'header.companies': {
    hi: 'कंपनियां',
    en: 'Companies'
  },
  'header.about': {
    hi: 'हमारे बारे में',
    en: 'About'
  },
  'header.contact': {
    hi: 'संपर्क',
    en: 'Contact'
  },
  'header.login': {
    hi: 'लॉगिन',
    en: 'Login'
  },
  'header.logout': {
    hi: 'लॉगआउट',
    en: 'Logout'
  },
  'header.profile': {
    hi: 'प्रोफाइल सेटिंग्स',
    en: 'Profile Settings'
  },
  'header.admin': {
    hi: 'एडमिन पैनल',
    en: 'Admin Panel'
  },

  // Landing Page
  'landing.hero.title': {
    hi: 'अपना सपनों का करियर खोजें',
    en: 'Find Your Dream Career'
  },
  'landing.hero.subtitle': {
    hi: 'आपका आशीर्वादित करियर यहाँ से शुरू होता है। हजारों नौकरियों में से अपने लिए सबसे अच्छी चुनें।',
    en: 'Your blessed career journey starts here. Choose the best from thousands of opportunities.'
  },
  'landing.search.job': {
    hi: 'नौकरी का शीर्षक...',
    en: 'Job title...'
  },
  'landing.search.location': {
    hi: 'स्थान',
    en: 'Location'
  },
  'landing.search.button': {
    hi: 'नौकरी खोजें',
    en: 'Search Jobs'
  },
  'landing.stats.jobs': {
    hi: 'सक्रिय नौकरियां',
    en: 'Active Jobs'
  },
  'landing.stats.companies': {
    hi: 'कंपनियां',
    en: 'Companies'
  },
  'landing.stats.seekers': {
    hi: 'नौकरी खोजने वाले',
    en: 'Job Seekers'
  },
  'landing.stats.success': {
    hi: 'सफलता दर',
    en: 'Success Rate'
  },

  // Features
  'features.title': {
    hi: 'क्यों चुनें BABADHAM-A2Z?',
    en: 'Why Choose BABADHAM-A2Z?'
  },
  'features.subtitle': {
    hi: 'आपके करियर की सफलता के लिए',
    en: 'For your career success'
  },
  'features.secure.title': {
    hi: 'सुरक्षित प्लेटफॉर्म',
    en: 'Secure Platform'
  },
  'features.secure.desc': {
    hi: 'आपकी जानकारी पूर्णतः सुरक्षित',
    en: 'Your data is completely secure'
  },
  'features.network.title': {
    hi: 'तेज़ी से बढ़ता नेटवर्क',
    en: 'Growing Network'
  },
  'features.network.desc': {
    hi: 'हजारों कंपनियों से जुड़ाव',
    en: 'Connected with thousands of companies'
  },
  'features.verified.title': {
    hi: 'प्रमाणित नियोक्ता',
    en: 'Verified Employers'
  },
  'features.verified.desc': {
    hi: 'केवल सत्यापित कंपनियां',
    en: 'Only verified companies'
  },

  // Companies
  'companies.title': {
    hi: 'शीर्ष कंपनियां',
    en: 'Top Companies'
  },
  'companies.subtitle': {
    hi: 'भारत की अग्रणी संस्थाओं से जुड़ें',
    en: 'Join leading organizations across India'
  },
  'companies.jobs': {
    hi: 'नौकरियां',
    en: 'Jobs'
  },

  // CTA
  'cta.title': {
    hi: 'अपनी यात्रा शुरू करने के लिए तैयार हैं?',
    en: 'Ready to Start Your Journey?'
  },
  'cta.subtitle': {
    hi: 'हजारों पेशेवरों से जुड़ें जिन्होंने BABADHAM-A2Z CONSULTANCY के माध्यम से अपने सपनों की नौकरी पाई है',
    en: 'Join thousands of professionals who found their dream jobs through BABADHAM-A2Z CONSULTANCY'
  },
  'cta.post': {
    hi: 'नौकरी पोस्ट करें',
    en: 'Post a Job'
  },
  'cta.find': {
    hi: 'नौकरी खोजें',
    en: 'Find Jobs'
  },

  // Auth Modal
  'auth.welcome': {
    hi: 'स्वागत है',
    en: 'Welcome'
  },
  'auth.create': {
    hi: 'नया खाता बनाएं',
    en: 'Create New Account'
  },
  'auth.signin.subtitle': {
    hi: 'अपने खाते में साइन इन करें',
    en: 'Sign in to your account'
  },
  'auth.signup.subtitle': {
    hi: 'BABADHAM-A2Z में शामिल हों',
    en: 'Join BABADHAM-A2Z'
  },
  'auth.admin.demo': {
    hi: 'एडमिन लॉगिन (डेमो)',
    en: 'Admin Login (Demo)'
  },
  'auth.email': {
    hi: 'ईमेल',
    en: 'Email'
  },
  'auth.phone': {
    hi: 'फोन',
    en: 'Phone'
  },
  'auth.who.are.you': {
    hi: 'आप कौन हैं?',
    en: 'Who are you?'
  },
  'auth.jobseeker': {
    hi: 'नौकरी खोजने वाले',
    en: 'Job Seeker'
  },
  'auth.employer': {
    hi: 'नियोक्ता',
    en: 'Employer'
  },
  'auth.fullname': {
    hi: 'पूरा नाम',
    en: 'Full Name'
  },
  'auth.password': {
    hi: 'पासवर्ड',
    en: 'Password'
  },
  'auth.company': {
    hi: 'कंपनी का नाम',
    en: 'Company Name'
  },
  'auth.location': {
    hi: 'स्थान',
    en: 'Location'
  },
  'auth.phone.number': {
    hi: 'फोन नंबर',
    en: 'Phone Number'
  },
  'auth.signin': {
    hi: 'साइन इन करें',
    en: 'Sign In'
  },
  'auth.signup': {
    hi: 'खाता बनाएं',
    en: 'Create Account'
  },
  'auth.otp.send': {
    hi: 'OTP भेजें',
    en: 'Send OTP'
  },
  'auth.otp.verify': {
    hi: 'OTP वेरिफाई करें',
    en: 'Verify OTP'
  },
  'auth.new.account': {
    hi: 'नया खाता बनाना चाहते हैं? यहाँ क्लिक करें',
    en: 'Want to create new account? Click here'
  },
  'auth.existing.account': {
    hi: 'पहले से खाता है? साइन इन करें',
    en: 'Already have account? Sign in'
  },

  // Dashboard Common
  'dashboard.welcome': {
    hi: 'नमस्ते',
    en: 'Welcome'
  },
  'dashboard.loading': {
    hi: 'लोड हो रहा है...',
    en: 'Loading...'
  },

  // Job Seeker Dashboard
  'jobseeker.subtitle': {
    hi: 'आपके सपनों की नौकरी खोजें',
    en: 'Find your dream job'
  },
  'jobseeker.browse': {
    hi: 'नौकरी खोजें',
    en: 'Browse Jobs'
  },
  'jobseeker.applications': {
    hi: 'मेरे आवेदन',
    en: 'My Applications'
  },
  'jobseeker.saved': {
    hi: 'सेव की गई नौकरियां',
    en: 'Saved Jobs'
  },
  'jobseeker.profile': {
    hi: 'प्रोफाइल',
    en: 'Profile'
  },

  // Employer Dashboard
  'employer.subtitle': {
    hi: 'अपनी कंपनी के लिए बेहतरीन प्रतिभा खोजें',
    en: 'Find excellent talent for your company'
  },
  'employer.jobs': {
    hi: 'मेरी नौकरियां',
    en: 'My Jobs'
  },
  'employer.post.job': {
    hi: 'नई नौकरी पोस्ट करें',
    en: 'Post New Job'
  },

  // Admin Panel
  'admin.title': {
    hi: 'BABADHAM-A2Z ADMIN',
    en: 'BABADHAM-A2Z ADMIN'
  },
  'admin.subtitle': {
    hi: 'CONSULTANCY MANAGEMENT PORTAL',
    en: 'CONSULTANCY MANAGEMENT PORTAL'
  },
  'admin.dashboard': {
    hi: 'Dashboard',
    en: 'Dashboard'
  },
  'admin.jobs': {
    hi: 'Jobs Management',
    en: 'Jobs Management'
  },
  'admin.users': {
    hi: 'User Management',
    en: 'User Management'
  },
  'admin.applications': {
    hi: 'Applications',
    en: 'Applications'
  },
  'admin.settings': {
    hi: 'Settings',
    en: 'Settings'
  },

  // Common
  'common.apply': {
    hi: 'आवेदन करें',
    en: 'Apply'
  },
  'common.view': {
    hi: 'विवरण',
    en: 'View Details'
  },
  'common.edit': {
    hi: 'संपादित करें',
    en: 'Edit'
  },
  'common.delete': {
    hi: 'डिलीट करें',
    en: 'Delete'
  },
  'common.save': {
    hi: 'सेव करें',
    en: 'Save'
  },
  'common.cancel': {
    hi: 'रद्द करें',
    en: 'Cancel'
  },
  'common.search': {
    hi: 'खोजें',
    en: 'Search'
  },
  'common.filter': {
    hi: 'फिल्टर',
    en: 'Filter'
  },
  'common.loading': {
    hi: 'लोड हो रहा है...',
    en: 'Loading...'
  },
  'common.error': {
    hi: 'कुछ गलत हुआ है',
    en: 'Something went wrong'
  },
  'common.success': {
    hi: 'सफल',
    en: 'Success'
  },

  // Footer
  'footer.jobseekers': {
    hi: 'नौकरी खोजने वालों के लिए',
    en: 'For Job Seekers'
  },
  'footer.employers': {
    hi: 'नियोक्ताओं के लिए',
    en: 'For Employers'
  },
  'footer.company': {
    hi: 'कंपनी',
    en: 'Company'
  },
  'footer.browse.jobs': {
    hi: 'नौकरी ब्राउज़ करें',
    en: 'Browse Jobs'
  },
  'footer.career.advice': {
    hi: 'करियर सलाह',
    en: 'Career Advice'
  },
  'footer.resume.builder': {
    hi: 'रिज्यूमे बिल्डर',
    en: 'Resume Builder'
  },
  'footer.salary.guide': {
    hi: 'सैलरी गाइड',
    en: 'Salary Guide'
  },
  'footer.post.jobs': {
    hi: 'नौकरी पोस्ट करें',
    en: 'Post Jobs'
  },
  'footer.find.candidates': {
    hi: 'उम्मीदवार खोजें',
    en: 'Find Candidates'
  },
  'footer.pricing': {
    hi: 'प्राइसिंग',
    en: 'Pricing'
  },
  'footer.resources': {
    hi: 'संसाधन',
    en: 'Resources'
  },
  'footer.about': {
    hi: 'हमारे बारे में',
    en: 'About Us'
  },
  'footer.contact': {
    hi: 'संपर्क',
    en: 'Contact'
  },
  'footer.privacy': {
    hi: 'प्राइवेसी पॉलिसी',
    en: 'Privacy Policy'
  },
  'footer.terms': {
    hi: 'सेवा की शर्तें',
    en: 'Terms of Service'
  },
  'footer.copyright': {
    hi: '© 2025 BABADHAM-A2Z CONSULTANCY. सभी अधिकार सुरक्षित।',
    en: '© 2025 BABADHAM-A2Z CONSULTANCY. All rights reserved.'
  },
  'footer.made.with': {
    hi: 'आपके आशीर्वादित करियर के लिए बनाया गया',
    en: 'Made with 🙏 for your blessed career'
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('hi');

  // Load language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'hi' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language preference to localStorage
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  // Translation function
  const t = (key: string): string => {
    const translation = translations[key as keyof typeof translations];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translation[language] || translation.en || key;
  };

  const value: LanguageContextType = {
    language,
    setLanguage: handleSetLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}