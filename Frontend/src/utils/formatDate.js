import { format, formatDistance, parseISO, isValid } from 'date-fns';

/**
 * Format a date string or Date object for display
 * @param {string|Date} date - The date to format
 * @param {string} formatString - The format string (default: 'MMM dd, yyyy')
 * @returns {string} Formatted date string
 */
export const formatDate = (date, formatString = 'MMM dd, yyyy') => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    
    if (!isValid(dateObj)) {
      return 'Invalid date';
    }
    
    return format(dateObj, formatString);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
};

/**
 * Format date as relative time (e.g., "2 months ago")
 * @param {string|Date} date - The date to format
 * @returns {string} Relative time string
 */
export const formatRelativeDate = (date) => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    
    if (!isValid(dateObj)) {
      return 'Invalid date';
    }
    
    return formatDistance(dateObj, new Date(), { addSuffix: true });
  } catch (error) {
    console.error('Error formatting relative date:', error);
    return 'Invalid date';
  }
};

/**
 * Format date for form inputs (YYYY-MM-DD)
 * @param {string|Date} date - The date to format
 * @returns {string} Date string in YYYY-MM-DD format
 */
export const formatDateForInput = (date) => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    
    if (!isValid(dateObj)) {
      return '';
    }
    
    return format(dateObj, 'yyyy-MM-dd');
  } catch (error) {
    console.error('Error formatting date for input:', error);
    return '';
  }
};

/**
 * Check if a date is within the last N days
 * @param {string|Date} date - The date to check
 * @param {number} days - Number of days to check
 * @returns {boolean} True if date is within the last N days
 */
export const isWithinLastDays = (date, days) => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    
    if (!isValid(dateObj)) {
      return false;
    }
    
    const daysDiff = Math.ceil((new Date() - dateObj) / (1000 * 60 * 60 * 24));
    return daysDiff <= days;
  } catch (error) {
    console.error('Error checking date range:', error);
    return false;
  }
};

/**
 * Get month and year from date for grouping
 * @param {string|Date} date - The date
 * @returns {string} Month and year (e.g., "Jan 2025")
 */
export const getMonthYear = (date) => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    
    if (!isValid(dateObj)) {
      return 'Invalid date';
    }
    
    return format(dateObj, 'MMM yyyy');
  } catch (error) {
    console.error('Error getting month/year:', error);
    return 'Invalid date';
  }
};

