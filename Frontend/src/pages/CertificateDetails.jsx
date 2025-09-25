import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Heart, 
  Eye, 
  ExternalLink, 
  Calendar, 
  Building,
  User,
  MessageCircle,
  Share2,
  Download,
  Tag,
  Award,
  Clock,
  MapPin
} from 'lucide-react';
import { useCerts } from '../context/CertContext';
import { formatDate, formatRelativeDate } from '../utils/formatDate';
import { mockCertificates } from '../data/mockCerts';
import ProfileDrawer from '../components/ProfileDrawer';
import CertificateCard from '../components/CertificateCard';

/**
 * Certificate details page showing full certificate information
 */
const CertificateDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggleLike, incrementViews } = useCerts();
  
  const [certificate, setCertificate] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [showProfileDrawer, setShowProfileDrawer] = useState(false);
  const [relatedCertificates, setRelatedCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const viewCountIncremented = React.useRef(false);

  // Load certificate data
  useEffect(() => {
    const loadCertificate = async () => {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const cert = mockCertificates.find(c => c.id === id);
      
      if (cert) {
        setCertificate(cert);
        setIsLiked(cert.isLikedByUser || false);
        
        // Load related certificates (same category or tags)
        const related = mockCertificates
          .filter(c => 
            c.id !== id && 
            (c.category === cert.category || 
             c.tags.some(tag => cert.tags.includes(tag)))
          )
          .slice(0, 3);
        setRelatedCertificates(related);
      }
      
      setLoading(false);
    };

    if (id) {
      loadCertificate();
      viewCountIncremented.current = false; // Reset for new certificate
    }
  }, [id]);

  // Separate effect for incrementing views to avoid infinite loop
  useEffect(() => {
    if (certificate && !viewCountIncremented.current) {
      incrementViews(id);
      viewCountIncremented.current = true;
    }
  }, [certificate, id, incrementViews]);

  const handleLike = async () => {
    const success = await toggleLike(id);
    if (success) {
      setIsLiked(!isLiked);
      setCertificate(prev => ({
        ...prev,
        likes: prev.likes + (isLiked ? -1 : 1),
        isLikedByUser: !isLiked
      }));
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: certificate.title,
          text: `Check out this certificate: ${certificate.title} by ${certificate.author.name}`,
          url: window.location.href
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(window.location.href);
      // You could show a toast here
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Development': 'bg-blue-100 text-blue-800 border-blue-200',
      'Cloud': 'bg-purple-100 text-purple-800 border-purple-200',
      'Security': 'bg-red-100 text-red-800 border-red-200',
      'Data Science': 'bg-green-100 text-green-800 border-green-200',
      'DevOps': 'bg-orange-100 text-orange-800 border-orange-200',
      'Business': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Design': 'bg-pink-100 text-pink-800 border-pink-200',
      'Management': 'bg-indigo-100 text-indigo-800 border-indigo-200'
    };
    return colors[category] || 'bg-neutral-100 text-neutral-800 border-neutral-200';
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-6 w-24 bg-neutral-200 rounded mb-6"></div>
          <div className="h-8 w-3/4 bg-neutral-200 rounded mb-4"></div>
          <div className="h-4 w-1/2 bg-neutral-200 rounded mb-8"></div>
          <div className="bg-white rounded-xl border border-neutral-200 p-8">
            <div className="space-y-4">
              <div className="h-4 w-full bg-neutral-200 rounded"></div>
              <div className="h-4 w-5/6 bg-neutral-200 rounded"></div>
              <div className="h-4 w-4/6 bg-neutral-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!certificate) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
            Certificate Not Found
          </h2>
          <p className="text-neutral-600 mb-6">
            The certificate you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/" className="btn-primary">
            Back to Feed
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className={`badge border ${getCategoryColor(certificate.category)}`}>
                {certificate.category}
              </span>
              {certificate.subcategory && (
                <span className="text-sm text-neutral-500">
                  • {certificate.subcategory}
                </span>
              )}
            </div>
            
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">
              {certificate.title}
            </h1>
            
            <div className="flex items-center gap-4 text-neutral-600 mb-4">
              <div className="flex items-center gap-1">
                <Building className="w-4 h-4" />
                {certificate.issuer}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(certificate.date)}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {formatRelativeDate(certificate.date)}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
              title="Share certificate"
            >
              <Share2 className="w-5 h-5" />
            </button>
            
            <button
              onClick={handleLike}
              className={`p-2 rounded-lg transition-colors ${
                isLiked 
                  ? 'text-red-500 bg-red-50 hover:bg-red-100' 
                  : 'text-neutral-600 hover:text-red-500 hover:bg-red-50'
              }`}
              title={isLiked ? 'Unlike' : 'Like'}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 text-sm text-neutral-500">
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            {certificate.likes} likes
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {certificate.views} views
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Certificate preview */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6">
            <h3 className="font-semibold text-neutral-900 mb-4">Certificate</h3>
            <div className="bg-neutral-100 rounded-lg p-8 text-center">
              <Award className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
              <p className="text-neutral-600 mb-4">Certificate preview</p>
              <div className="flex items-center justify-center gap-4">
                <button className="btn-secondary flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Preview
                </button>
                <button className="btn-primary flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>
          </div>

          {/* Description and remarks */}
          {certificate.remarks && (
            <div className="bg-white rounded-xl border border-neutral-200 p-6">
              <h3 className="font-semibold text-neutral-900 mb-4">Remarks & Experience</h3>
              <p className="text-neutral-700 leading-relaxed whitespace-pre-wrap">
                {certificate.remarks}
              </p>
            </div>
          )}

          {/* External links */}
          {certificate.links && certificate.links.length > 0 && (
            <div className="bg-white rounded-xl border border-neutral-200 p-6">
              <h3 className="font-semibold text-neutral-900 mb-4">External Links</h3>
              <div className="space-y-2">
                {certificate.links.map((link, index) => (
                  <a
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 bg-neutral-50 rounded-lg text-primary-600 hover:text-primary-700 hover:bg-primary-50 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="flex-1 truncate">{link}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {certificate.tags && certificate.tags.length > 0 && (
            <div className="bg-white rounded-xl border border-neutral-200 p-6">
              <h3 className="font-semibold text-neutral-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {certificate.tags.map(tag => (
                  <span key={tag} className="badge badge-secondary flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Author info */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6">
            <h3 className="font-semibold text-neutral-900 mb-4">Certificate Holder</h3>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">
                  {certificate.author.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-neutral-900">{certificate.author.name}</h4>
                <p className="text-sm text-neutral-500">{certificate.author.jobTitle}</p>
                <p className="text-sm text-neutral-500">{certificate.author.unit}</p>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setShowProfileDrawer(true)}
                className="btn-secondary w-full flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4" />
                View Profile
              </button>
              
              {certificate.contactsEnabled && (
                <button className="btn-primary w-full flex items-center justify-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Contact
                </button>
              )}
            </div>
          </div>

          {/* Related certificates */}
          {relatedCertificates.length > 0 && (
            <div className="bg-white rounded-xl border border-neutral-200 p-6">
              <h3 className="font-semibold text-neutral-900 mb-4">You May Also Like</h3>
              <div className="space-y-4">
                {relatedCertificates.map(cert => (
                  <Link
                    key={cert.id}
                    to={`/cert/${cert.id}`}
                    className="block p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors"
                  >
                    <h4 className="font-medium text-neutral-900 text-sm mb-1 line-clamp-2">
                      {cert.title}
                    </h4>
                    <p className="text-xs text-neutral-500">{cert.issuer}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-xs px-2 py-1 rounded ${getCategoryColor(cert.category)}`}>
                        {cert.category}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Profile drawer */}
      <ProfileDrawer
        user={certificate.author}
        isOpen={showProfileDrawer}
        onClose={() => setShowProfileDrawer(false)}
      />
    </div>
  );
};

export default CertificateDetails;
