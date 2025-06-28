import React, { memo } from 'react';
import { Search, MapPin, Briefcase, Users, ChevronRight, Star, TrendingUp, Award, Shield } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface LandingPageProps {
  onAuthClick: () => void;
}

const companies = [
  { name: 'TCS', logo: '🏢', jobs: 150 },
  { name: 'Infosys', logo: '💼', jobs: 120 },
  { name: 'Wipro', logo: '🌟', jobs: 95 },
  { name: 'HCL', logo: '⚡', jobs: 80 },
  { name: 'Accenture', logo: '🚀', jobs: 110 },
  { name: 'IBM', logo: '💻', jobs: 75 }
];

// Memoized components for better performance
const HeroSection = memo(({ onAuthClick }: { onAuthClick: () => void }) => {
  const { t } = useLanguage();
  
  return (
    <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
      {/* Lord Shiva meditation background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 rounded-3xl"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/8978562/pexels-photo-8978562.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`
        }}
      />
      
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <div className="mb-8">
          {/* Large Shiva OM symbol */}
          <div className="text-8xl mb-6 animate-pulse">🕉️</div>
          
          {/* Shiva meditation image */}
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/8978562/pexels-photo-8978562.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop" 
                alt="Lord Shiva Meditation" 
                className="w-32 h-32 rounded-full shadow-2xl border-4 border-orange-300 object-cover"
                onError={(e) => {
                  // Fallback to another Shiva image if first one fails
                  e.currentTarget.src = "https://images.pexels.com/photos/7978562/pexels-photo-7978562.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop";
                }}
              />
              <div className="absolute -top-2 -right-2 text-2xl animate-spin-slow">🔱</div>
            </div>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent">
              {t('landing.hero.title')}
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            {t('landing.hero.subtitle')}
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-orange-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder={t('landing.search.job')}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder={t('landing.search.location')}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <button 
                onClick={onAuthClick}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-8 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {t('landing.search.button')}
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">1000+</div>
            <div className="text-gray-600">{t('landing.stats.jobs')}</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">500+</div>
            <div className="text-gray-600">{t('landing.stats.companies')}</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">10K+</div>
            <div className="text-gray-600">{t('landing.stats.seekers')}</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">95%</div>
            <div className="text-gray-600">{t('landing.stats.success')}</div>
          </div>
        </div>
      </div>
    </section>
  );
});

const FeaturesSection = memo(() => {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: <Shield className="text-orange-500" size={32} />,
      title: t('features.secure.title'),
      description: t('features.secure.desc')
    },
    {
      icon: <TrendingUp className="text-orange-500" size={32} />,
      title: t('features.network.title'),
      description: t('features.network.desc')
    },
    {
      icon: <Award className="text-orange-500" size={32} />,
      title: t('features.verified.title'),
      description: t('features.verified.desc')
    }
  ];

  return (
    <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 bg-white/70 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-4xl mb-4">🕉️</div>
          <h3 className="text-4xl font-bold text-gray-800 mb-4">
            {t('features.title')}
          </h3>
          <p className="text-xl text-gray-600">{t('features.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-orange-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 text-center">
              <div className="mb-6 flex justify-center">{feature.icon}</div>
              <h4 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h4>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

const CompaniesSection = memo(() => {
  const { t } = useLanguage();
  
  return (
    <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-4xl mb-4">🕉️</div>
          <h3 className="text-4xl font-bold text-gray-800 mb-4">
            {t('companies.title')}
          </h3>
          <p className="text-xl text-gray-600">{t('companies.subtitle')}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {companies.map((company, index) => (
            <div key={index} className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-orange-100">
              <div className="text-4xl mb-4">{company.logo}</div>
              <h4 className="font-bold text-gray-800 mb-2">{company.name}</h4>
              <p className="text-orange-600 text-sm font-medium">{company.jobs} {t('companies.jobs')}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export const LandingPage = memo(({ onAuthClick }: LandingPageProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="relative overflow-hidden">
      {/* Main background with Lord Shiva meditation theme */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/8978562/pexels-photo-8978562.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`
        }}
      />

      <HeroSection onAuthClick={onAuthClick} />
      <FeaturesSection />
      <CompaniesSection />

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="text-5xl mb-6">🕉️</div>
          <h3 className="text-4xl md:text-5xl font-bold mb-6">
            {t('cta.title')}
          </h3>
          <p className="text-xl mb-8 opacity-90">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onAuthClick}
              className="bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
            >
              {t('cta.post')}
            </button>
            <button 
              onClick={onAuthClick}
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-orange-600 transition-all duration-300 text-lg"
            >
              {t('cta.find')}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="text-3xl">🕉️</div>
                <div>
                  <h4 className="text-xl font-bold">BABADHAM-A2Z</h4>
                  <p className="text-gray-400 text-sm">CONSULTANCY</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed">
                {t('landing.hero.subtitle')}
              </p>
            </div>

            <div>
              <h5 className="font-semibold mb-4">{t('footer.jobseekers')}</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.browse.jobs')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.career.advice')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.resume.builder')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.salary.guide')}</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">{t('footer.employers')}</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.post.jobs')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.find.candidates')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.pricing')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.resources')}</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">{t('footer.company')}</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.about')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.contact')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.privacy')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.terms')}</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <div className="text-2xl mb-4">🕉️</div>
            <p>{t('footer.copyright')}</p>
            <p className="mt-2">{t('footer.made.with')}</p>
            <p className="text-sm mt-1">DEVELOPED BY VIKASH</p>
            <div className="text-orange-400 mt-4 text-lg font-medium">
              🙏 हर सफलता में भगवान शिव का आशीर्वाद 🙏
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
});