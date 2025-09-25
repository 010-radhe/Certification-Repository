import React, { createContext, useContext, useState, useEffect } from 'react';
import { currentUser } from '../data/mockUsers';

const AuthContext = createContext();

/**
 * Authentication context provider for managing user authentication state
 * In a real app, this would handle login/logout, token management, etc.
 * For this demo, we'll use mock authentication
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simulate authentication check on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For demo purposes, always authenticate with current user
        setUser(currentUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Authentication check failed:', error);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  /**
   * Mock login function
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<boolean>} Success status
   */
  const login = async (email, password) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo, accept any email/password combination
      setUser(currentUser);
      setIsAuthenticated(true);
      
      // Store auth state in localStorage for persistence
      localStorage.setItem('certify_hub_auth', JSON.stringify({
        isAuthenticated: true,
        userId: currentUser.id,
        timestamp: Date.now()
      }));
      
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Mock logout function
   */
  const logout = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUser(null);
      setIsAuthenticated(false);
      
      // Clear auth state from localStorage
      localStorage.removeItem('certify_hub_auth');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Update user profile
   * @param {object} updates - Profile updates
   */
  const updateProfile = async (updates) => {
    if (!user) return false;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      
      return true;
    } catch (error) {
      console.error('Profile update failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Check if user has specific permission
   * @param {string} permission - Permission to check
   * @returns {boolean} Has permission
   */
  const hasPermission = (permission) => {
    if (!user) return false;
    
    switch (permission) {
      case 'manage_unit_certs':
        return user.isManager;
      case 'export_data':
        return user.isManager;
      case 'view_analytics':
        return true; // All authenticated users can view analytics
      case 'add_certificate':
        return true; // All authenticated users can add certificates
      default:
        return false;
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateProfile,
    hasPermission
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook to use authentication context
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export default AuthContext;

