import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Eye, 
  ExternalLink, 
  Calendar, 
  Building,
  MessageCircle,
  BookmarkPlus,
  Bookmark
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDate, formatRelativeDate } from '../utils/formatDate';
import { useCerts } from '../context/CertContext';

/**
 * Certificate card component for displaying certificate information
 */
const CertificateCard = ({ certificate, variant = 'default' }) => {
  const { toggleLike, incrementViews } = useCerts();
  const [isLiked, setIsLiked] = React.useState(certificate.isLikedByUser || false);
  const [isBookmarked, setIsBookmarked] = React.useState(false);

  const handleLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const success = await toggleLike(certificate.id);
    if (success) {
      setIsLiked(!isLiked);
    }
  };

  const handleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const handleCardClick = () => {
    incrementViews(certificate.id);
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'wide':
        return 'col-span-full flex flex-col sm:flex-row gap-6';
      case 'large':
        return 'col-span-2';
      default:
        return '';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Development': 'bg-blue-100 text-blue-800',
      'Cloud': 'bg-purple-100 text-purple-800',
      'Security': 'bg-red-100 text-red-800',
      'Data Science': 'bg-green-100 text-green-800',
      'DevOps': 'bg-orange-100 text-orange-800',
      'Business': 'bg-yellow-100 text-yellow-800',
      'Design': 'bg-pink-100 text-pink-800',
      'Management': 'bg-indigo-100 text-indigo-800'
    };
    return colors[category] || 'bg-neutral-100 text-neutral-800';
  };

  if (variant === 'wide') {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
      >
        <Link
          to={`/cert/${certificate.id}`}
          onClick={handleCardClick}
          className={`card ${getVariantClasses()} hover:shadow-card-hover transition-all duration-300`}
        >
          <div className="flex-1">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <span className={`badge ${getCategoryColor(certificate.category)}`}>
                {certificate.category}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleBookmark}
                  className="p-1 text-neutral-400 hover:text-yellow-500 transition-colors"
                >
                  {isBookmarked ? (
                    <Bookmark className="w-4 h-4 fill-current" />
                  ) : (
                    <BookmarkPlus className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Title and description */}
            <h3 className="text-xl font-semibold text-neutral-900 mb-2 line-clamp-2">
              {certificate.title}
            </h3>
            
            <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
              {certificate.remarks}
            </p>

            {/* Meta info */}
            <div className="flex items-center gap-4 text-sm text-neutral-500 mb-4">
              <div className="flex items-center gap-1">
                <Building className="w-4 h-4" />
                {certificate.issuer}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(certificate.date)}
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {certificate.tags.slice(0, 4).map(tag => (
                <span key={tag} className="badge badge-secondary text-xs">
                  {tag}
                </span>
              ))}
              {certificate.tags.length > 4 && (
                <span className="text-xs text-neutral-500">
                  +{certificate.tags.length - 4} more
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col justify-between">
            {/* Author info */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">
                  {certificate.author.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <p className="font-medium text-neutral-900">{certificate.author.name}</p>
                <p className="text-sm text-neutral-500">{certificate.author.unit}</p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
              <div className="flex items-center gap-4 text-sm text-neutral-500">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-1 hover:text-red-500 transition-colors ${
                    isLiked ? 'text-red-500' : ''
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                  {certificate.likes}
                </button>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {certificate.views}
                </div>
              </div>
              
              {certificate.contactsEnabled && (
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  className="btn-primary text-xs px-3 py-1"
                >
                  Contact
                </button>
              )}
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        to={`/cert/${certificate.id}`}
        onClick={handleCardClick}
        className={`card ${getVariantClasses()} hover:shadow-card-hover transition-all duration-300 block`}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <span className={`badge ${getCategoryColor(certificate.category)}`}>
            {certificate.category}
          </span>
          <button
            onClick={handleBookmark}
            className="p-1 text-neutral-400 hover:text-yellow-500 transition-colors"
          >
            {isBookmarked ? (
              <Bookmark className="w-4 h-4 fill-current" />
            ) : (
              <BookmarkPlus className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-neutral-900 mb-2 line-clamp-2">
          {certificate.title}
        </h3>

        {/* Issuer and date */}
        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-4">
          <span>{certificate.issuer}</span>
          <span>•</span>
          <span>{formatRelativeDate(certificate.date)}</span>
        </div>

        {/* Author info */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {certificate.author.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-medium text-neutral-900 text-sm truncate">
              {certificate.author.name}
            </p>
            <p className="text-xs text-neutral-500 truncate">
              {certificate.author.unit}
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {certificate.tags.slice(0, 3).map(tag => (
            <span key={tag} className="badge badge-secondary text-xs">
              {tag}
            </span>
          ))}
          {certificate.tags.length > 3 && (
            <span className="text-xs text-neutral-500">
              +{certificate.tags.length - 3}
            </span>
          )}
        </div>

        {/* Remarks preview */}
        <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
          {certificate.remarks}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
          <div className="flex items-center gap-4 text-sm text-neutral-500">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 hover:text-red-500 transition-colors ${
                isLiked ? 'text-red-500' : ''
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              {certificate.likes}
            </button>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {certificate.views}
            </div>
          </div>
          
          {certificate.contactsEnabled && (
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              <MessageCircle className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* External link indicator */}
        {certificate.links && certificate.links.length > 0 && (
          <div className="absolute top-3 right-3">
            <ExternalLink className="w-3 h-3 text-neutral-400" />
          </div>
        )}
      </Link>
    </motion.div>
  );
};

export default CertificateCard;

