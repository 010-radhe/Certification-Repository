// Export all skeleton components from this index file
export { default as CertificateCardSkeleton, CertificateGridSkeleton } from './CertificateCardSkeleton';

/**
 * Generic skeleton component for text content
 */
export const TextSkeleton = ({ lines = 3, className = '' }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }, (_, index) => (
        <div
          key={index}
          className={`h-4 bg-neutral-200 rounded animate-skeleton ${
            index === lines - 1 ? 'w-3/4' : 'w-full'
          }`}
        />
      ))}
    </div>
  );
};

/**
 * Skeleton for user profile section
 */
export const ProfileSkeleton = () => {
  return (
    <div className="flex items-center gap-3 animate-pulse">
      <div className="h-12 w-12 bg-neutral-200 rounded-full animate-skeleton"></div>
      <div className="flex-1">
        <div className="h-5 w-24 bg-neutral-200 rounded animate-skeleton mb-2"></div>
        <div className="h-4 w-32 bg-neutral-200 rounded animate-skeleton"></div>
      </div>
    </div>
  );
};

/**
 * Skeleton for analytics charts
 */
export const ChartSkeleton = ({ height = 'h-64' }) => {
  return (
    <div className={`${height} bg-neutral-100 rounded-lg animate-pulse flex items-center justify-center`}>
      <div className="text-neutral-400 text-sm">Loading chart...</div>
    </div>
  );
};

/**
 * Skeleton for filters panel
 */
export const FiltersSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Search */}
      <div>
        <div className="h-5 w-16 bg-neutral-200 rounded animate-skeleton mb-2"></div>
        <div className="h-10 w-full bg-neutral-200 rounded animate-skeleton"></div>
      </div>

      {/* Categories */}
      <div>
        <div className="h-5 w-20 bg-neutral-200 rounded animate-skeleton mb-3"></div>
        <div className="space-y-2">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex items-center gap-2">
              <div className="h-4 w-4 bg-neutral-200 rounded animate-skeleton"></div>
              <div className="h-4 w-24 bg-neutral-200 rounded animate-skeleton"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div>
        <div className="h-5 w-12 bg-neutral-200 rounded animate-skeleton mb-3"></div>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-6 w-16 bg-neutral-200 rounded-full animate-skeleton"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Skeleton for table rows
 */
export const TableRowSkeleton = ({ columns = 4 }) => {
  return (
    <tr className="animate-pulse">
      {Array.from({ length: columns }, (_, index) => (
        <td key={index} className="px-6 py-4">
          <div className="h-4 bg-neutral-200 rounded animate-skeleton"></div>
        </td>
      ))}
    </tr>
  );
};

/**
 * Skeleton for form fields
 */
export const FormSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Title field */}
      <div>
        <div className="h-5 w-12 bg-neutral-200 rounded animate-skeleton mb-2"></div>
        <div className="h-10 w-full bg-neutral-200 rounded animate-skeleton"></div>
      </div>

      {/* Select field */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="h-5 w-16 bg-neutral-200 rounded animate-skeleton mb-2"></div>
          <div className="h-10 w-full bg-neutral-200 rounded animate-skeleton"></div>
        </div>
        <div>
          <div className="h-5 w-14 bg-neutral-200 rounded animate-skeleton mb-2"></div>
          <div className="h-10 w-full bg-neutral-200 rounded animate-skeleton"></div>
        </div>
      </div>

      {/* Textarea */}
      <div>
        <div className="h-5 w-16 bg-neutral-200 rounded animate-skeleton mb-2"></div>
        <div className="h-24 w-full bg-neutral-200 rounded animate-skeleton"></div>
      </div>

      {/* File upload */}
      <div>
        <div className="h-5 w-20 bg-neutral-200 rounded animate-skeleton mb-2"></div>
        <div className="h-32 w-full bg-neutral-200 rounded-lg animate-skeleton"></div>
      </div>

      {/* Tags */}
      <div>
        <div className="h-5 w-12 bg-neutral-200 rounded animate-skeleton mb-2"></div>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-8 w-16 bg-neutral-200 rounded-full animate-skeleton"></div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-4">
        <div className="h-10 w-24 bg-neutral-200 rounded animate-skeleton"></div>
        <div className="h-10 w-20 bg-neutral-200 rounded animate-skeleton"></div>
      </div>
    </div>
  );
};
