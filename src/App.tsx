import React, { useState, Suspense, lazy } from 'react';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './hooks/useAuth';
import { LanguageProvider } from './context/LanguageContext';
import { Header } from './components/layout/Header';
import { AuthModal } from './components/auth/AuthModal';
import { LandingPage } from './components/LandingPage';

// Lazy load heavy components
const JobSeekerDashboard = lazy(() => import('./components/JobSeekerDashboard').then(module => ({ default: module.JobSeekerDashboard })));
const EmployerDashboard = lazy(() => import('./components/EmployerDashboard').then(module => ({ default: module.EmployerDashboard })));
const AdminPanel = lazy(() => import('./components/AdminPanel').then(module => ({ default: module.AdminPanel })));

// Loading component
function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4 animate-pulse">🕉️</div>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
        <p className="text-gray-600 animate-pulse">लोड हो रहा है... / Loading...</p>
        <p className="text-orange-600 text-sm mt-2 animate-pulse">🙏 भगवान शिव के आशीर्वाद से / With Lord Shiva's Blessings 🙏</p>
      </div>
    </div>
  );
}

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, profile, loading, isAdmin } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  // Show appropriate dashboard based on user type
  if (user && profile) {
    return (
      <LanguageProvider>
        <Suspense fallback={<LoadingSpinner />}>
          {isAdmin ? (
            <AdminPanel />
          ) : profile.user_type === 'employer' ? (
            <EmployerDashboard />
          ) : (
            <JobSeekerDashboard />
          )}
        </Suspense>
      </LanguageProvider>
    );
  }

  // Show landing page for non-logged in users
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
        <Header onAuthClick={() => setIsAuthModalOpen(true)} />
        <LandingPage onAuthClick={() => setIsAuthModalOpen(true)} />
        
        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)} 
        />
        
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#fff',
              color: '#333',
              borderRadius: '12px',
              border: '1px solid #f97316',
            },
          }}
        />
      </div>
    </LanguageProvider>
  );
}

export default App;