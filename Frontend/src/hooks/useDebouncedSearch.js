import { useState, useEffect } from 'react';

/**
 * Custom hook for debounced search functionality
 * Delays the execution of search until user stops typing for a specified delay
 * 
 * @param {string} initialValue - Initial search value
 * @param {number} delay - Delay in milliseconds (default: 300ms)
 * @returns {[string, string, function]} - [searchTerm, debouncedSearchTerm, setSearchTerm]
 */
export const useDebouncedSearch = (initialValue = '', delay = 300) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(initialValue);

  useEffect(() => {
    // Set up a timer to update the debounced search term
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, delay);

    // Clean up the timer if the search term changes before the delay
    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm, delay]);

  return [searchTerm, debouncedSearchTerm, setSearchTerm];
};

export default useDebouncedSearch;

