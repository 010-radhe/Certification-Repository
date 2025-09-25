import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
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
  Globe,
  Edit,
  Settings,
  Users,
  TrendingUp,
  Eye,
  Heart
} from 'lucide-react';
import { getUserById } from '../data/mockUsers';
import { getCertificatesByAuthor } from '../data/mockCerts';
import { useAuth } from '../context/AuthContext';
import { formatDate, formatRelativeDate } from '../utils/formatDate';
import CertificateCard from '../components/CertificateCard';
import { CertificateGridSkeleton } from '../components/Skeletons/index.jsx';

/**
 * User profile page displaying user information and their certifications
 */
const Profile = () => {
  const { userId } = useParams();
  const { user: currentUser } = useAuth();
  const [profileUser, setProfileUser] = useState(null);
  const [userCertificates, setUserCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('certifications');

  const isOwnProfile = currentUser?.id === userId;

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const user = getUserById(userId);
      if (user) {
        setProfileUser(user);
        setUserCertificates(getCertificatesByAuthor(userId));
      }
      
      setLoading(false);
    };

    if (userId) {
      loadProfile();
    }
  }, [userId]);

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

  const profileStats = {
    totalCertifications: userCertificates.length,
    totalLikes: userCertificates.reduce((sum, cert) => sum + cert.likes, 0),
    totalViews: userCertificates.reduce((sum, cert) => sum + cert.views, 0),
    categoriesCount: new Set(userCertificates.map(cert => cert.category)).size
  };

  // Get recent certifications (last 6 months)
  const recentCertifications = userCertificates
    .filter(cert => {
      const certDate = new Date(cert.date);
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      return certDate >= sixMonthsAgo;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          {/* Header skeleton */}
          <div className="bg-white rounded-xl border border-neutral-200 p-8 mb-8">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-neutral-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-8 w-48 bg-neutral-200 rounded mb-2"></div>
                <div className="h-4 w-32 bg-neutral-200 rounded mb-2"></div>
                <div className="h-4 w-24 bg-neutral-200 rounded"></div>
              </div>
            </div>
          </div>
          
          <CertificateGridSkeleton count={6} />
        </div>
      </div>
    );
  }

  if (!profileUser) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
            User Not Found
          </h2>
          <p className="text-neutral-600 mb-6">
            The user profile you're looking for doesn't exist.
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
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl border border-neutral-200 p-8 mb-8"
      >
        <div className="flex flex-col md:flex-row items-start gap-6">
          {/* Avatar and basic info */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-2xl font-bold text-white">
              {profileUser.name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-neutral-900 mb-1">
                  {profileUser.name}
                </h1>
                <p className="text-lg text-neutral-600 mb-2">
                  {profileUser.jobTitle}
                </p>
                <div className="flex items-center gap-4 text-sm text-neutral-500">
                  <div className="flex items-center gap-1">
                    <Building className="w-4 h-4" />
                    {profileUser.unit}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Joined {formatDate(profileUser.joinDate, 'MMM yyyy')}
                  </div>
                </div>
                
                {profileUser.isManager && (
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      Manager
                    </span>
                  </div>
                )}
              </div>
              
              {/* Action buttons */}
              <div className="flex items-center gap-2">
                {isOwnProfile ? (
                  <Link
                    to="/settings"
                    className="btn-secondary flex items-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    Edit Profile
                  </Link>
                ) : (
                  <>
                    <button className="btn-secondary flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      Message
                    </button>
                    <button className="btn-primary flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Bio */}
            {profileUser.bio && (
              <p className="text-neutral-700 leading-relaxed mb-4">
                {profileUser.bio}
              </p>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center p-3 bg-neutral-50 rounded-lg">
                <div className="text-xl font-bold text-neutral-900">
                  {profileStats.totalCertifications}
                </div>
                <div className="text-xs text-neutral-500">Certificates</div>
              </div>
              <div className="text-center p-3 bg-neutral-50 rounded-lg">
                <div className="text-xl font-bold text-red-500">
                  {profileStats.totalLikes}
                </div>
                <div className="text-xs text-neutral-500">Likes</div>
              </div>
              <div className="text-center p-3 bg-neutral-50 rounded-lg">
                <div className="text-xl font-bold text-blue-500">
                  {profileStats.totalViews}
                </div>
                <div className="text-xs text-neutral-500">Views</div>
              </div>
              <div className="text-center p-3 bg-neutral-50 rounded-lg">
                <div className="text-xl font-bold text-green-500">
                  {profileStats.categoriesCount}
                </div>
                <div className="text-xs text-neutral-500">Categories</div>
              </div>
            </div>

            {/* Social Links */}
            {profileUser.socialLinks && Object.keys(profileUser.socialLinks).length > 0 && (
              <div className="flex flex-wrap gap-2">
                {Object.entries(profileUser.socialLinks).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                  >
                    {getSocialIcon(platform)}
                    <span>{getSocialLabel(platform)}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Skills */}
      {profileUser.skills && profileUser.skills.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white rounded-xl border border-neutral-200 p-6 mb-8"
        >
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">Skills & Expertise</h2>
          <div className="flex flex-wrap gap-2">
            {profileUser.skills.map(skill => (
              <span key={skill} className="badge badge-secondary">
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-neutral-200">
          <nav className="-mb-px flex gap-8">
            {[
              { id: 'certifications', label: 'All Certifications', count: userCertificates.length },
              { id: 'recent', label: 'Recent', count: recentCertifications.length }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                }`}
              >
                {tab.label}
                <span className="bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        {activeTab === 'certifications' && (
          <>
            {userCertificates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userCertificates.map((cert, index) => (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <CertificateCard certificate={cert} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Award className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-neutral-900 mb-2">
                  No Certificates Yet
                </h3>
                <p className="text-neutral-600">
                  {isOwnProfile 
                    ? "Start building your professional portfolio by adding your first certificate."
                    : `${profileUser.name} hasn't added any certificates yet.`
                  }
                </p>
                {isOwnProfile && (
                  <Link to="/add" className="btn-primary mt-4 inline-flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    Add Your First Certificate
                  </Link>
                )}
              </div>
            )}
          </>
        )}

        {activeTab === 'recent' && (
          <>
            {recentCertifications.length > 0 ? (
              <div className="space-y-4">
                {recentCertifications.map((cert, index) => (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <CertificateCard certificate={cert} variant="wide" />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Calendar className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-neutral-900 mb-2">
                  No Recent Activity
                </h3>
                <p className="text-neutral-600">
                  No certificates added in the last 6 months.
                </p>
              </div>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Profile;
