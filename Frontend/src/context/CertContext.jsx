import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  mockCertificates, 
  searchCertificates, 
  getCertificatesByCategory,
  getCertificatesByAuthor,
  categories,
  popularTags,
  units
} from '../data/mockCerts';

const CertContext = createContext();

/**
 * Certificate context provider for managing certificate state and operations
 */
export const CertProvider = ({ children }) => {
  // State for certificates and filtering
  const [certificates, setCertificates] = useState([]);
  const [filteredCertificates, setFilteredCertificates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedUnits, setSelectedUnits] = useState([]);
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [sortBy, setSortBy] = useState('date'); // date, likes, views, title
  const [sortOrder, setSortOrder] = useState('desc'); // asc, desc

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  // Load certificates on mount
  useEffect(() => {
    const loadCertificates = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setCertificates(mockCertificates);
        setFilteredCertificates(mockCertificates);
      } catch (err) {
        setError('Failed to load certificates');
        console.error('Error loading certificates:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadCertificates();
  }, []);

  // Apply filters whenever filter state changes
  useEffect(() => {
    let filtered = [...certificates];

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = searchCertificates(searchQuery);
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(cert => 
        selectedCategories.includes(cert.category)
      );
    }

    // Apply tag filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter(cert =>
        selectedTags.some(tag => cert.tags.includes(tag))
      );
    }

    // Apply unit filter
    if (selectedUnits.length > 0) {
      filtered = filtered.filter(cert =>
        selectedUnits.includes(cert.author.unit)
      );
    }

    // Apply date range filter
    if (dateRange.start && dateRange.end) {
      filtered = filtered.filter(cert => {
        const certDate = new Date(cert.date);
        return certDate >= new Date(dateRange.start) && certDate <= new Date(dateRange.end);
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.date) - new Date(b.date);
          break;
        case 'likes':
          comparison = a.likes - b.likes;
          break;
        case 'views':
          comparison = a.views - b.views;
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        default:
          comparison = 0;
      }
      
      return sortOrder === 'desc' ? -comparison : comparison;
    });

    setFilteredCertificates(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [
    certificates,
    searchQuery,
    selectedCategories,
    selectedTags,
    selectedUnits,
    dateRange,
    sortBy,
    sortOrder
  ]);

  /**
   * Add a new certificate
   * @param {object} certificateData - Certificate data
   * @returns {Promise<boolean>} Success status
   */
  const addCertificate = async (certificateData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newCertificate = {
        ...certificateData,
        id: `cert_${Date.now()}`,
        likes: 0,
        views: 0,
        date: certificateData.date || new Date().toISOString().split('T')[0]
      };
      
      const updatedCertificates = [newCertificate, ...certificates];
      setCertificates(updatedCertificates);
      
      return true;
    } catch (error) {
      console.error('Failed to add certificate:', error);
      setError('Failed to add certificate');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Update an existing certificate
   * @param {string} certificateId - Certificate ID
   * @param {object} updates - Updates to apply
   * @returns {Promise<boolean>} Success status
   */
  const updateCertificate = React.useCallback(async (certificateId, updates) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedCertificates = certificates.map(cert =>
        cert.id === certificateId ? { ...cert, ...updates } : cert
      );
      
      setCertificates(updatedCertificates);
      return true;
    } catch (error) {
      console.error('Failed to update certificate:', error);
      setError('Failed to update certificate');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [certificates]);

  /**
   * Delete a certificate
   * @param {string} certificateId - Certificate ID
   * @returns {Promise<boolean>} Success status
   */
  const deleteCertificate = async (certificateId) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const updatedCertificates = certificates.filter(cert => cert.id !== certificateId);
      setCertificates(updatedCertificates);
      return true;
    } catch (error) {
      console.error('Failed to delete certificate:', error);
      setError('Failed to delete certificate');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Like/unlike a certificate
   * @param {string} certificateId - Certificate ID
   * @returns {Promise<boolean>} Success status
   */
  const toggleLike = async (certificateId) => {
    try {
      const cert = certificates.find(c => c.id === certificateId);
      if (!cert) return false;
      
      // In a real app, track user likes
      const newLikes = cert.isLikedByUser ? cert.likes - 1 : cert.likes + 1;
      
      await updateCertificate(certificateId, {
        likes: newLikes,
        isLikedByUser: !cert.isLikedByUser
      });
      
      return true;
    } catch (error) {
      console.error('Failed to toggle like:', error);
      return false;
    }
  };

  /**
   * Increment view count for a certificate
   * @param {string} certificateId - Certificate ID
   */
  const incrementViews = React.useCallback(async (certificateId) => {
    try {
      const cert = certificates.find(c => c.id === certificateId);
      if (!cert) return;
      
      await updateCertificate(certificateId, {
        views: cert.views + 1
      });
    } catch (error) {
      console.error('Failed to increment views:', error);
    }
  }, [certificates, updateCertificate]);

  /**
   * Get certificates for current page
   */
  const getPaginatedCertificates = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredCertificates.slice(startIndex, endIndex);
  };

  /**
   * Get total pages
   */
  const getTotalPages = () => {
    return Math.ceil(filteredCertificates.length / itemsPerPage);
  };

  /**
   * Clear all filters
   */
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedTags([]);
    setSelectedUnits([]);
    setDateRange({ start: null, end: null });
    setCurrentPage(1);
  };

  /**
   * Get analytics data
   */
  const getAnalyticsData = () => {
    // Certificate count by category
    const categoryData = categories.map(cat => ({
      name: cat.label,
      value: getCertificatesByCategory(cat.value).length,
      color: `hsl(${Math.random() * 360}, 70%, 50%)`
    }));

    // Certificates by month
    const monthlyData = certificates.reduce((acc, cert) => {
      const month = cert.date.substring(0, 7); // YYYY-MM
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});

    const monthlyChartData = Object.entries(monthlyData)
      .sort()
      .slice(-6) // Last 6 months
      .map(([month, count]) => ({
        month: new Date(month + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        certificates: count
      }));

    // Top issuers
    const issuerData = certificates.reduce((acc, cert) => {
      acc[cert.issuer] = (acc[cert.issuer] || 0) + 1;
      return acc;
    }, {});

    const topIssuers = Object.entries(issuerData)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([issuer, count]) => ({ name: issuer, value: count }));

    return {
      categoryData,
      monthlyData: monthlyChartData,
      topIssuers,
      totalCertificates: certificates.length,
      totalViews: certificates.reduce((sum, cert) => sum + cert.views, 0),
      totalLikes: certificates.reduce((sum, cert) => sum + cert.likes, 0)
    };
  };

  const value = {
    // Data
    certificates: getPaginatedCertificates(),
    allCertificates: certificates,
    filteredCertificates,
    categories,
    popularTags,
    units,
    
    // State
    isLoading,
    error,
    
    // Filters
    searchQuery,
    setSearchQuery,
    selectedCategories,
    setSelectedCategories,
    selectedTags,
    setSelectedTags,
    selectedUnits,
    setSelectedUnits,
    dateRange,
    setDateRange,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    
    // Pagination
    currentPage,
    setCurrentPage,
    itemsPerPage,
    totalPages: getTotalPages(),
    totalCount: filteredCertificates.length,
    
    // Actions
    addCertificate,
    updateCertificate,
    deleteCertificate,
    toggleLike,
    incrementViews,
    clearFilters,
    getAnalyticsData
  };

  return (
    <CertContext.Provider value={value}>
      {children}
    </CertContext.Provider>
  );
};

/**
 * Hook to use certificate context
 */
export const useCerts = () => {
  const context = useContext(CertContext);
  
  if (context === undefined) {
    throw new Error('useCerts must be used within a CertProvider');
  }
  
  return context;
};

export default CertContext;
