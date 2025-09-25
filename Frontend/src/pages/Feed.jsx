import React from 'react';
import { motion } from 'framer-motion';
import { Filter, Grid, List } from 'lucide-react';
import { useCerts } from '../context/CertContext';
import CertificateCard from '../components/CertificateCard';
import FiltersPanel from '../components/FiltersPanel';
import { CertificateGridSkeleton } from '../components/Skeletons/index.jsx';

/**
 * Main feed page showing all certificates
 */
const Feed = () => {
  const { 
    certificates, 
    isLoading, 
    error,
    totalCount,
    currentPage,
    totalPages,
    setCurrentPage
  } = useCerts();
  
  const [showFilters, setShowFilters] = React.useState(false);
  const [viewMode, setViewMode] = React.useState('grid'); // 'grid' or 'list'

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-red-600">Error loading certificates: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">
              Certificate Feed
            </h1>
            <p className="text-neutral-600 mt-1">
              Discover certifications from your colleagues
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* View mode toggle */}
            <div className="flex rounded-lg border border-neutral-300 p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${
                  viewMode === 'grid'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${
                  viewMode === 'list'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Filters toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`btn-secondary flex items-center gap-2 ${
                showFilters ? 'bg-primary-100 text-primary-700 border-primary-300' : ''
              }`}
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>

        {/* Results count */}
        {!isLoading && (
          <div className="mt-4 text-sm text-neutral-600">
            Showing {certificates.length} of {totalCount} certificates
          </div>
        )}
      </div>

      <div className="flex gap-8">
        {/* Filters sidebar */}
        <motion.aside
          initial={false}
          animate={{ 
            width: showFilters ? 320 : 0,
            opacity: showFilters ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          {showFilters && (
            <div className="w-80 shrink-0">
              <FiltersPanel />
            </div>
          )}
        </motion.aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {isLoading ? (
            <CertificateGridSkeleton count={6} />
          ) : certificates.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-neutral-400 mb-4">No certificates found</div>
              <p className="text-neutral-600 text-sm">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <>
              {/* Certificate grid */}
              <motion.div
                layout
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'space-y-4'
                }
              >
                {certificates.map((cert, index) => (
                  <motion.div
                    key={cert.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <CertificateCard 
                      certificate={cert}
                      variant={viewMode === 'list' ? 'wide' : 'default'}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                  <nav className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-2 text-sm font-medium rounded ${
                          page === currentPage
                            ? 'bg-primary-600 text-white'
                            : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feed;
