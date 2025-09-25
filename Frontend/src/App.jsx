import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CertProvider } from './context/CertContext';

// Components
import NavBar from './components/NavBar';
import ErrorBoundary from './components/ErrorBoundary';
import Toast from './components/Toast';

// Pages
import Feed from './pages/Feed';
import MyCerts from './pages/MyCerts';
import AddCertificate from './pages/AddCertificate';
import CertificateDetails from './pages/CertificateDetails';
import Analytics from './pages/Analytics';
import ManagerView from './pages/ManagerView';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

/**
 * Main App component with routing and context providers
 */
function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <CertProvider>
          <div className="min-h-screen bg-neutral-50">
            {/* Navigation */}
            <NavBar />
            
            {/* Main content */}
            <main className="pt-16"> {/* Account for fixed navbar */}
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Feed />} />
                <Route path="/cert/:id" element={<CertificateDetails />} />
                <Route path="/profile/:userId" element={<Profile />} />
                
                {/* Authenticated routes */}
                <Route path="/my" element={<MyCerts />} />
                <Route path="/add" element={<AddCertificate />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/manager" element={<ManagerView />} />
                
                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            
            {/* Global toast notifications */}
            <Toast />
          </div>
        </CertProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;

