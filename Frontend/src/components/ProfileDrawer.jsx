import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Mail, 
  MessageCircle, 
  ExternalLink, 
  Award,
  Calendar,
  Building,
  MapPin,
  Linkedin,
  Github,
  Twitter,
  Globe
} from 'lucide-react';
import { formatDate } from '../utils/formatDate';
import { getCertificatesByAuthor } from '../data/mockCerts';

/**
 * Profile drawer component for displaying user profiles
 */
const ProfileDrawer = ({ user, isOpen, onClose }) => {
  const userCertificates = user ? getCertificatesByAuthor(user.id) : [];

  const getSocialIcon = (platform) => {
    const iconProps = { className: 'w-4 h-4' };
    
    switch (platform) {
      case 'linkedin':
        return <Linkedin {...iconProps} />;
      case 'github':
        return <Github {...iconProps} />;
      case 'twitter':
        return <Twitter {...iconProps} />;
      default:
        return <Globe {...iconProps} />;
    }
  };

  const getSocialLabel = (platform) => {
    return platform.charAt(0).toUpperCase() + platform.slice(1);
  };

  if (!user) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-xl z-50 overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-neutral-900">
                  Profile
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Profile Header */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl font-medium">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-neutral-900 mb-1">
                  {user.name}
                </h3>
                
                <p className="text-neutral-600 mb-2">
                  {user.jobTitle}
                </p>
                
                {user.isManager && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    Manager
                  </span>
                )}
              </div>

              {/* Contact Actions */}
              <div className="flex gap-3 mb-6">
                <button className="btn-primary flex-1 flex items-center justify-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Message
                </button>
                <button className="btn-secondary flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </button>
              </div>

              {/* Basic Info */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <Building className="w-4 h-4 text-neutral-400" />
                  <span className="text-neutral-600">Unit:</span>
                  <span className="font-medium text-neutral-900">{user.unit}</span>
                </div>
                
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-neutral-400" />
                  <span className="text-neutral-600">Email:</span>
                  <a 
                    href={`mailto:${user.email}`}
                    className="font-medium text-primary-600 hover:text-primary-700"
                  >
                    {user.email}
                  </a>
                </div>
                
                {user.joinDate && (
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-neutral-400" />
                    <span className="text-neutral-600">Joined:</span>
                    <span className="font-medium text-neutral-900">
                      {formatDate(user.joinDate, 'MMM yyyy')}
                    </span>
                  </div>
                )}
              </div>

              {/* Bio */}
              {user.bio && (
                <div className="mb-6">
                  <h4 className="font-medium text-neutral-900 mb-2">About</h4>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {user.bio}
                  </p>
                </div>
              )}

              {/* Skills */}
              {user.skills && user.skills.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-medium text-neutral-900 mb-3">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map(skill => (
                      <span 
                        key={skill}
                        className="badge badge-secondary text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Social Links */}
              {user.socialLinks && Object.keys(user.socialLinks).length > 0 && (
                <div className="mb-6">
                  <h4 className="font-medium text-neutral-900 mb-3">Links</h4>
                  <div className="space-y-2">
                    {Object.entries(user.socialLinks).map(([platform, url]) => (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-2 rounded-lg text-sm text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 transition-colors"
                      >
                        {getSocialIcon(platform)}
                        <span>{getSocialLabel(platform)}</span>
                        <ExternalLink className="w-3 h-3 ml-auto" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-neutral-900">Certifications</h4>
                  <span className="text-sm text-neutral-500">
                    {userCertificates.length} total
                  </span>
                </div>
                
                {userCertificates.length > 0 ? (
                  <div className="space-y-3">
                    {userCertificates.slice(0, 3).map(cert => (
                      <div 
                        key={cert.id}
                        className="p-3 bg-neutral-50 rounded-lg"
                      >
                        <h5 className="font-medium text-neutral-900 text-sm mb-1">
                          {cert.title}
                        </h5>
                        <div className="flex items-center gap-2 text-xs text-neutral-500">
                          <span>{cert.issuer}</span>
                          <span>•</span>
                          <span>{formatDate(cert.date)}</span>
                        </div>
                      </div>
                    ))}
                    
                    {userCertificates.length > 3 && (
                      <button className="w-full text-sm text-primary-600 hover:text-primary-700 font-medium">
                        View all {userCertificates.length} certifications
                      </button>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-neutral-500 italic">
                    No certifications yet
                  </p>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-neutral-50 rounded-lg">
                <div className="text-center">
                  <div className="text-lg font-semibold text-neutral-900">
                    {user.certificationCount || userCertificates.length}
                  </div>
                  <div className="text-xs text-neutral-500">Certifications</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-neutral-900">
                    {userCertificates.reduce((sum, cert) => sum + cert.likes, 0)}
                  </div>
                  <div className="text-xs text-neutral-500">Total Likes</div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProfileDrawer;

