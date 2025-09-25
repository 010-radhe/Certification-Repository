import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  Heart, 
  Filter,
  Grid,
  List,
  Search
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCerts } from '../context/CertContext';
import { getCertificatesByAuthor } from '../data/mockCerts';
import CertificateCard from '../components/CertificateCard';
import CertificateGrid from '../components/CertificateGrid';
import { CertificateGridSkeleton } from '../components/Skeletons/index.jsx';

/**
 * My Certificates page - shows certificates uploaded by the current user
 */
const MyCerts = () => {
  const { user } = useAuth();
  const { deleteCertificate, isLoading } = useCerts();
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [certToDelete, setCertToDelete] = useState(null);

  // Get user's certificates
  const userCertificates = user ? getCertificatesByAuthor(user.id) : [];

  // Filter and sort certificates
  const filteredCertificates = userCertificates
    .filter(cert => 
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date) - new Date(a.date);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'likes':
          return b.likes - a.likes;
        case 'views':
          return b.views - a.views;
        default:
          return 0;
      }
    });

  const handleDelete = async () => {
    if (!certToDelete) return;
    
    const success = await deleteCertificate(certToDelete.id);
    if (success) {
      setShowDeleteModal(false);
      setCertToDelete(null);
    }
  };

  const stats = {
    total: userCertificates.length,
    totalLikes: userCertificates.reduce((sum, cert) => sum + cert.likes, 0),
    totalViews: userCertificates.reduce((sum, cert) => sum + cert.views, 0),
    categories: new Set(userCertificates.map(cert => cert.category)).size
  };

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-neutral-600">Please sign in to view your certificates.</p>
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
              My Certificates
            </h1>
            <p className="text-neutral-600 mt-1">
              Manage and showcase your professional certifications
            </p>
          </div>
          
          <Link
            to="/add"
            className="btn-primary flex items-center gap-2 w-fit"
          >
            <Plus className="w-4 h-4" />
            Add Certificate
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div className="bg-white rounded-lg p-4 border border-neutral-200">
            <div className="text-2xl font-bold text-neutral-900">{stats.total}</div>
            <div className="text-sm text-neutral-600">Certificates</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-neutral-200">
            <div className="text-2xl font-bold text-red-500">{stats.totalLikes}</div>
            <div className="text-sm text-neutral-600">Total Likes</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-neutral-200">
            <div className="text-2xl font-bold text-blue-500">{stats.totalViews}</div>
            <div className="text-sm text-neutral-600">Total Views</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-neutral-200">
            <div className="text-2xl font-bold text-green-500">{stats.categories}</div>
            <div className="text-sm text-neutral-600">Categories</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search your certificates..."
            className="input-field pl-10"
          />
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="input-field w-auto"
        >
          <option value="date">Sort by Date</option>
          <option value="title">Sort by Title</option>
          <option value="likes">Sort by Likes</option>
          <option value="views">Sort by Views</option>
        </select>

        {/* View mode */}
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
      </div>

      {/* Content */}
      {isLoading ? (
        <CertificateGridSkeleton count={6} />
      ) : filteredCertificates.length === 0 ? (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-neutral-100 flex items-center justify-center">
              <Plus className="w-12 h-12 text-neutral-400" />
            </div>
            <h3 className="text-lg font-medium text-neutral-900 mb-2">
              {searchQuery ? 'No matching certificates' : 'No certificates yet'}
            </h3>
            <p className="text-neutral-600 text-sm mb-6">
              {searchQuery 
                ? 'Try adjusting your search criteria'
                : 'Start building your professional portfolio by adding your first certificate'
              }
            </p>
            {!searchQuery && (
              <Link
                to="/add"
                className="btn-primary inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Your First Certificate
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
        }>
          {filteredCertificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <CertificateCard 
                certificate={cert}
                variant={viewMode === 'list' ? 'wide' : 'default'}
              />
              
              {/* Action buttons overlay */}
              <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link
                  to={`/add?edit=${cert.id}`}
                  className="p-2 bg-white rounded-lg shadow-md hover:shadow-lg text-neutral-600 hover:text-blue-600 transition-all"
                  title="Edit certificate"
                >
                  <Edit3 className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => {
                    setCertToDelete(cert);
                    setShowDeleteModal(true);
                  }}
                  className="p-2 bg-white rounded-lg shadow-md hover:shadow-lg text-neutral-600 hover:text-red-600 transition-all"
                  title="Delete certificate"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && certToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full"
          >
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
              Delete Certificate
            </h3>
            <p className="text-neutral-600 mb-6">
              Are you sure you want to delete "{certToDelete.title}"? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setCertToDelete(null);
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isLoading}
                className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default MyCerts;
