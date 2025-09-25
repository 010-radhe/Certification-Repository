import { useState, useCallback } from 'react';

/**
 * Custom hook for simulating API calls with loading states and error handling
 * Useful for demonstrating loading states and error handling in the UI
 */
export const useMockApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Execute a mock API call with simulated delay and error handling
   * @param {Function} apiCall - Function that returns a Promise
   * @param {object} options - Configuration options
   * @param {number} options.delay - Delay in milliseconds (default: 1000)
   * @param {number} options.errorRate - Error probability 0-1 (default: 0)
   * @param {string} options.errorMessage - Custom error message
   * @returns {Promise} - Promise that resolves with the API call result
   */
  const execute = useCallback(async (
    apiCall, 
    { 
      delay = 1000, 
      errorRate = 0, 
      errorMessage = 'Something went wrong' 
    } = {}
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, delay));

      // Simulate random errors based on error rate
      if (Math.random() < errorRate) {
        throw new Error(errorMessage);
      }

      // Execute the actual API call
      const result = await apiCall();
      
      return result;
    } catch (err) {
      const errorMsg = err.message || errorMessage;
      setError(errorMsg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Clear any existing errors
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Reset loading and error states
   */
  const reset = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  return {
    isLoading,
    error,
    execute,
    clearError,
    reset
  };
};

/**
 * Hook for simulating file upload with progress
 * @returns {object} Upload state and functions
 */
export const useMockFileUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);

  /**
   * Simulate file upload with progress updates
   * @param {File} file - File to upload
   * @param {object} options - Upload options
   * @returns {Promise<string>} - Promise that resolves with file URL
   */
  const uploadFile = useCallback(async (file, { errorRate = 0.1 } = {}) => {
    setIsUploading(true);
    setUploadProgress(0);
    setUploadError(null);

    try {
      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setUploadProgress(progress);
      }

      // Simulate random upload errors
      if (Math.random() < errorRate) {
        throw new Error('Upload failed. Please try again.');
      }

      // Return mock file URL
      const fileUrl = `/uploads/${Date.now()}_${file.name}`;
      return fileUrl;
    } catch (err) {
      setUploadError(err.message);
      throw err;
    } finally {
      setIsUploading(false);
    }
  }, []);

  /**
   * Reset upload state
   */
  const resetUpload = useCallback(() => {
    setIsUploading(false);
    setUploadProgress(0);
    setUploadError(null);
  }, []);

  return {
    isUploading,
    uploadProgress,
    uploadError,
    uploadFile,
    resetUpload
  };
};

/**
 * Hook for simulating paginated data fetching
 * @param {Function} fetchFunction - Function that fetches data for a given page
 * @param {object} options - Configuration options
 * @returns {object} Pagination state and functions
 */
export const useMockPagination = (fetchFunction, { pageSize = 10 } = {}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  /**
   * Load data for a specific page
   * @param {number} page - Page number to load
   */
  const loadPage = useCallback(async (page) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));

      const result = await fetchFunction(page, pageSize);
      
      setData(result.data);
      setTotalPages(result.totalPages);
      setTotalItems(result.totalItems);
      setCurrentPage(page);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [fetchFunction, pageSize]);

  /**
   * Go to next page
   */
  const nextPage = useCallback(() => {
    if (currentPage < totalPages) {
      loadPage(currentPage + 1);
    }
  }, [currentPage, totalPages, loadPage]);

  /**
   * Go to previous page
   */
  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      loadPage(currentPage - 1);
    }
  }, [currentPage, loadPage]);

  /**
   * Go to specific page
   */
  const goToPage = useCallback((page) => {
    if (page >= 1 && page <= totalPages) {
      loadPage(page);
    }
  }, [totalPages, loadPage]);

  return {
    data,
    currentPage,
    totalPages,
    totalItems,
    isLoading,
    error,
    loadPage,
    nextPage,
    prevPage,
    goToPage,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1
  };
};

export default useMockApi;

