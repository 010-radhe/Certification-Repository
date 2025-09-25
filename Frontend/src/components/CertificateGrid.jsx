import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CertificateCard from './CertificateCard';
import { CertificateGridSkeleton } from './Skeletons/index.jsx';

/**
 * Grid component for displaying certificates with animations
 */
const CertificateGrid = ({ 
  certificates = [], 
  isLoading = false, 
  viewMode = 'grid',
  emptyMessage = 'No certificates found',
  emptyDescription = 'Try adjusting your search or filter criteria'
}) => {
  
  if (isLoading) {
    return <CertificateGridSkeleton count={6} />;
  }

  if (certificates.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-neutral-100 flex items-center justify-center">
            <svg 
              className="w-12 h-12 text-neutral-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-neutral-900 mb-2">
            {emptyMessage}
          </h3>
          <p className="text-neutral-600 text-sm mb-6">
            {emptyDescription}
          </p>
        </div>
      </div>
    );
  }

  const gridClasses = viewMode === 'grid' 
    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
    : 'space-y-4';

  return (
    <motion.div 
      layout 
      className={gridClasses}
    >
      <AnimatePresence mode="popLayout">
        {certificates.map((certificate, index) => (
          <motion.div
            key={certificate.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ 
              duration: 0.3,
              delay: index * 0.05,
              layout: { duration: 0.3 }
            }}
          >
            <CertificateCard 
              certificate={certificate}
              variant={viewMode === 'list' ? 'wide' : 'default'}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default CertificateGrid;
