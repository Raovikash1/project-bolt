import React, { useState } from 'react';
import { Menu, X, LogOut, User, Settings } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../context/LanguageContext';
import { LanguageToggle } from '../LanguageToggle';

interface HeaderProps {
  onAuthClick: () => void;
}

export function Header({ onAuthClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, profile, isAdmin, signOut } = useAuth();
  const { t } = useLanguage();

  return (
    <header className="relative z-10 bg-white/90 backdrop-blur-md shadow-lg border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">🕉️</div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
                {t('header.title')}
              </h1>
              <p className="text-sm text-orange-600 font-medium">
                सर्वमुक्त शिव सत्य हैं, शिव सामर्थ्य अनंत
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
              {t('header.home')}
            </a>
            <a href="#" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
              {t('header.jobs')}
            </a>
            <a href="#" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
              {t('header.companies')}
            </a>
            <a href="#" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
              {t('header.about')}
            </a>
            <a href="#" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
              {t('header.contact')}
            </a>
          </nav>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <LanguageToggle />

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg"
                >
                  <User size={18} />
                  <span className="hidden sm:block">
                    {profile?.full_name || user.email?.split('@')[0]}
                  </span>
                  {isAdmin && (
                    <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">
                      ADMIN
                    </span>
                  )}
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="font-semibold text-gray-800">{profile?.full_name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <p className="text-xs text-orange-600 capitalize">
                        {profile?.user_type === 'jobseeker' ? t('auth.jobseeker') : t('auth.employer')}
                      </p>
                    </div>
                    
                    <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2">
                      <Settings size={16} />
                      <span>{t('header.profile')}</span>
                    </button>
                    
                    {isAdmin && (
                      <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2 text-purple-600">
                        <Settings size={16} />
                        <span>{t('header.admin')}</span>
                      </button>
                    )}
                    
                    <hr className="my-2" />
                    
                    <button
                      onClick={signOut}
                      className="w-full px-4 py-2 text-left hover:bg-red-50 flex items-center space-x-2 text-red-600"
                    >
                      <LogOut size={16} />
                      <span>{t('header.logout')}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg"
              >
                <User size={18} />
                <span>{t('header.login')}</span>
              </button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <a href="#" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
                {t('header.home')}
              </a>
              <a href="#" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
                {t('header.jobs')}
              </a>
              <a href="#" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
                {t('header.companies')}
              </a>
              <a href="#" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
                {t('header.about')}
              </a>
              <a href="#" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
                {t('header.contact')}
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}