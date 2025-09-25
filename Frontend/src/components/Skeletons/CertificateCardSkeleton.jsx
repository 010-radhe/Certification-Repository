import React from 'react';

/**
 * Skeleton loader for certificate cards
 */
const CertificateCardSkeleton = ({ variant = 'default' }) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'wide':
        return 'col-span-full';
      case 'large':
        return 'col-span-2';
      default:
        return '';
    }
  };

  return (
    <div className={`card animate-pulse ${getVariantClasses()}`}>
      {/* Header with category badge */}
      <div className="flex items-start justify-between mb-4">
        <div className="h-6 w-20 bg-neutral-200 rounded-full animate-skeleton"></div>
        <div className="h-4 w-4 bg-neutral-200 rounded animate-skeleton"></div>
      </div>

      {/* Title */}
      <div className="space-y-2 mb-4">
        <div className="h-6 w-4/5 bg-neutral-200 rounded animate-skeleton"></div>
        <div className="h-4 w-3/4 bg-neutral-200 rounded animate-skeleton"></div>
      </div>

      {/* Issuer and date */}
      <div className="flex items-center gap-2 mb-4">
        <div className="h-4 w-16 bg-neutral-200 rounded animate-skeleton"></div>
        <div className="h-1 w-1 bg-neutral-200 rounded-full animate-skeleton"></div>
        <div className="h-4 w-20 bg-neutral-200 rounded animate-skeleton"></div>
      </div>

      {/* Author info */}
      <div className="flex items-center gap-3 mb-4">
        <div className="h-8 w-8 bg-neutral-200 rounded-full animate-skeleton"></div>
        <div className="flex-1">
          <div className="h-4 w-24 bg-neutral-200 rounded animate-skeleton mb-1"></div>
          <div className="h-3 w-20 bg-neutral-200 rounded animate-skeleton"></div>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="h-6 w-12 bg-neutral-200 rounded-full animate-skeleton"></div>
        <div className="h-6 w-16 bg-neutral-200 rounded-full animate-skeleton"></div>
        <div className="h-6 w-14 bg-neutral-200 rounded-full animate-skeleton"></div>
      </div>

      {/* Footer with stats and button */}
      <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
        <div className="flex items-center gap-4">
          <div className="h-4 w-12 bg-neutral-200 rounded animate-skeleton"></div>
          <div className="h-4 w-16 bg-neutral-200 rounded animate-skeleton"></div>
        </div>
        <div className="h-8 w-20 bg-neutral-200 rounded animate-skeleton"></div>
      </div>
    </div>
  );
};

/**
 * Grid of certificate card skeletons
 */
export const CertificateGridSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }, (_, index) => (
        <CertificateCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default CertificateCardSkeleton;

