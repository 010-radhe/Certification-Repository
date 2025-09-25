import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Plus, 
  Menu, 
  X, 
  User, 
  Settings, 
  LogOut, 
  Award,
  BarChart3,
  Users
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCerts } from '../context/CertContext';
import { useDebouncedSearch } from '../hooks/useDebouncedSearch';

/**
 * Main navigation bar component
 */
const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { user, logout, hasPermission } = useAuth();
  const { setSearchQuery } = useCerts();
  const [searchTerm, debouncedSearchTerm, setSearchTerm] = useDebouncedSearch('', 300);
  const location = useLocation();
  const navigate = useNavigate();

  // Update search query when debounced term changes
  React.useEffect(() => {
    setSearchQuery(debouncedSearchTerm);
  }, [debouncedSearchTerm, setSearchQuery]);

  const handleLogout = async () => {
    await logout();
    setIsProfileMenuOpen(false);
    navigate('/');
  };

  const navigation = [
    { name: 'Feed', href: '/', icon: Award },
    { name: 'My Certs', href: '/my', icon: User, requireAuth: true },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    ...(hasPermission('manage_unit_certs') ? [
      { name: 'Manager', href: '/manager', icon: Users }
    ] : [])
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and brand */}
            <div className="flex items-center">
              <Link
                to="/"
                className="flex items-center gap-2 text-xl font-bold text-gradient"
              >
                <div className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg">
                  <Award className="w-6 h-6 text-white" />
                </div>
                CertifyHub
              </Link>
            </div>

            {/* Search bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search certifications, skills, or people..."
                  className="input-field pl-10 pr-4"
                />
              </div>
            </div>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center gap-4">
              {/* Navigation links */}
              <div className="flex items-center gap-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  
                  if (item.requireAuth && !user) {
                    return null;
                  }
                  
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`
                        flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                        ${isActive(item.href)
                          ? 'bg-primary-100 text-primary-700'
                          : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                        }
                      `}
                    >
                      <Icon className="w-4 h-4" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>

              {/* Add certificate button */}
              {user && (
                <Link
                  to="/add"
                  className="btn-primary flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Cert
                </Link>
              )}

              {/* Profile menu */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-neutral-100 transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </button>

                  <AnimatePresence>
                    {isProfileMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.1 }}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-neutral-200 py-1"
                      >
                        <div className="px-4 py-2 border-b border-neutral-100">
                          <p className="font-medium text-neutral-900">{user.name}</p>
                          <p className="text-sm text-neutral-500">{user.email}</p>
                        </div>
                        
                        <Link
                          to={`/profile/${user.id}`}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          <User className="w-4 h-4" />
                          View Profile
                        </Link>
                        
                        <Link
                          to="/settings"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          <Settings className="w-4 h-4" />
                          Settings
                        </Link>
                        
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button className="btn-secondary">Sign In</button>
                  <button className="btn-primary">Sign Up</button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile search */}
          <div className="md:hidden pb-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-neutral-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search certifications..."
                className="input-field pl-10 pr-4"
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 md:hidden"
          >
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)} />
            
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="absolute left-0 top-0 bottom-0 w-80 max-w-sm bg-white shadow-xl"
            >
              <div className="p-6">
                {/* Mobile menu header */}
                <div className="flex items-center justify-between mb-6">
                  <Link
                    to="/"
                    className="flex items-center gap-2 text-xl font-bold text-gradient"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    CertifyHub
                  </Link>
                  
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg text-neutral-600 hover:bg-neutral-100"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* User info */}
                {user && (
                  <div className="mb-6 p-4 bg-neutral-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-neutral-900">{user.name}</p>
                        <p className="text-sm text-neutral-500">{user.jobTitle}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation links */}
                <div className="space-y-2 mb-6">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    
                    if (item.requireAuth && !user) {
                      return null;
                    }
                    
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`
                          flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors
                          ${isActive(item.href)
                            ? 'bg-primary-100 text-primary-700'
                            : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                          }
                        `}
                      >
                        <Icon className="w-5 h-5" />
                        {item.name}
                      </Link>
                    );
                  })}
                </div>

                {/* Action buttons */}
                {user ? (
                  <div className="space-y-2">
                    <Link
                      to="/add"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="btn-primary w-full flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Certificate
                    </Link>
                    
                    <Link
                      to={`/profile/${user.id}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="btn-secondary w-full flex items-center justify-center gap-2"
                    >
                      <User className="w-4 h-4" />
                      View Profile
                    </Link>
                    
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="btn-primary w-full"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="btn-secondary w-full"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close profile menu */}
      {isProfileMenuOpen && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setIsProfileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default NavBar;

