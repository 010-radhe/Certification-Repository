import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Award, 
  TrendingUp, 
  Download, 
  Search, 
  Filter,
  Eye,
  MessageSquare,
  UserCheck,
  Calendar,
  ChevronDown,
  ChevronUp,
  Target,
  Star
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { mockUsers, getUsersByUnit } from '../data/mockUsers';
import { mockCertificates, getCertificatesByAuthor } from '../data/mockCerts';
import { formatDate, getMonthYear } from '../utils/formatDate';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

/**
 * Manager view page for unit managers to track team certifications
 */
const ManagerView = () => {
  const { user, hasPermission } = useAuth();
  const [selectedUnit, setSelectedUnit] = useState(user?.unit || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('certifications');
  const [viewMode, setViewMode] = useState('overview'); // overview, team, individual
  const [expandedEmployee, setExpandedEmployee] = useState(null);

  // Redirect if user doesn't have manager permissions
  if (!hasPermission('manage_unit_certs')) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
            Access Denied
          </h2>
          <p className="text-neutral-600">
            You need manager permissions to access this page.
          </p>
        </div>
      </div>
    );
  }

  // Get unit data
  const unitMembers = getUsersByUnit(selectedUnit);
  const allUnits = [...new Set(mockUsers.map(u => u.unit))];

  // Filter and sort team members
  const filteredMembers = unitMembers
    .filter(member => 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'certifications':
          return b.certificationCount - a.certificationCount;
        case 'recent':
          // Sort by most recent certification (mock logic)
          return new Date() - new Date(); // Placeholder
        default:
          return 0;
      }
    });

  // Calculate unit statistics
  const unitStats = {
    totalMembers: unitMembers.length,
    totalCertifications: unitMembers.reduce((sum, member) => sum + member.certificationCount, 0),
    averageCertifications: unitMembers.length > 0 
      ? (unitMembers.reduce((sum, member) => sum + member.certificationCount, 0) / unitMembers.length).toFixed(1)
      : 0,
    activeLearners: unitMembers.filter(member => member.certificationCount > 0).length,
    topPerformer: unitMembers.reduce((top, member) => 
      member.certificationCount > (top?.certificationCount || 0) ? member : top, null
    )
  };

  // Get certification trends for the unit
  const getUnitCertificationTrends = () => {
    const trends = {};
    
    unitMembers.forEach(member => {
      const memberCerts = getCertificatesByAuthor(member.id);
      memberCerts.forEach(cert => {
        const month = getMonthYear(cert.date);
        trends[month] = (trends[month] || 0) + 1;
      });
    });

    return Object.entries(trends)
      .sort(([a], [b]) => new Date(a + '-01') - new Date(b + '-01'))
      .slice(-6)
      .map(([month, count]) => ({ month, certifications: count }));
  };

  const trendData = getUnitCertificationTrends();

  const handleExportData = () => {
    // Mock CSV export
    const csvData = filteredMembers.map(member => ({
      name: member.name,
      jobTitle: member.jobTitle,
      certifications: member.certificationCount,
      email: member.email,
      joinDate: member.joinDate
    }));
    
    console.log('Exporting CSV data:', csvData);
    // In a real app, this would generate and download a CSV file
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">
              Manager Dashboard
            </h1>
            <p className="text-neutral-600 mt-1">
              Track team certifications and learning progress
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Unit selector */}
            <select
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
              className="input-field w-auto"
            >
              {allUnits.map(unit => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
            
            <button 
              onClick={handleExportData}
              className="btn-secondary flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* View Mode Tabs */}
      <div className="mb-6">
        <div className="border-b border-neutral-200">
          <nav className="-mb-px flex gap-8">
            {[
              { id: 'overview', label: 'Overview', icon: TrendingUp },
              { id: 'team', label: 'Team View', icon: Users },
              { id: 'individual', label: 'Individual', icon: UserCheck }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setViewMode(tab.id)}
                  className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    viewMode === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Overview Tab */}
      {viewMode === 'overview' && (
        <div className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl border border-neutral-200 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-600">Team Members</p>
                  <p className="text-2xl font-bold text-neutral-900">
                    {unitStats.totalMembers}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl border border-neutral-200 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-600">Total Certifications</p>
                  <p className="text-2xl font-bold text-neutral-900">
                    {unitStats.totalCertifications}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl border border-neutral-200 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-600">Average per Person</p>
                  <p className="text-2xl font-bold text-neutral-900">
                    {unitStats.averageCertifications}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl border border-neutral-200 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-600">Active Learners</p>
                  <p className="text-2xl font-bold text-neutral-900">
                    {unitStats.activeLearners}
                  </p>
                </div>
                <div className="p-3 bg-orange-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Certification Trends Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl border border-neutral-200 p-6"
          >
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">
              Unit Certification Trends
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip />
                <Bar dataKey="certifications" fill="#14b8a6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Top Performer */}
          {unitStats.topPerformer && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900">Top Performer</h3>
                  <p className="text-neutral-600">
                    {unitStats.topPerformer.name} leads with {unitStats.topPerformer.certificationCount} certifications
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* Team View Tab */}
      {viewMode === 'team' && (
        <div className="space-y-6">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search team members..."
                className="input-field pl-10"
              />
            </div>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-field w-auto"
            >
              <option value="certifications">Sort by Certifications</option>
              <option value="name">Sort by Name</option>
              <option value="recent">Sort by Recent Activity</option>
            </select>
          </div>

          {/* Team Members List */}
          <div className="space-y-4">
            {filteredMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl border border-neutral-200 p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-neutral-900">
                        {member.name}
                      </h3>
                      <p className="text-neutral-600">{member.jobTitle}</p>
                      <div className="flex items-center gap-4 mt-1 text-sm text-neutral-500">
                        <span>{member.certificationCount} certifications</span>
                        <span>Joined {formatDate(member.joinDate, 'MMM yyyy')}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary-600">
                        {member.certificationCount}
                      </div>
                      <div className="text-sm text-neutral-500">certs</div>
                    </div>
                    
                    <button
                      onClick={() => setExpandedEmployee(
                        expandedEmployee === member.id ? null : member.id
                      )}
                      className="p-2 text-neutral-400 hover:text-neutral-600"
                    >
                      {expandedEmployee === member.id ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedEmployee === member.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-neutral-200"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-neutral-900 mb-2">Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {member.skills?.slice(0, 5).map(skill => (
                            <span key={skill} className="badge badge-secondary text-xs">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-neutral-900 mb-2">Recent Certifications</h4>
                        <div className="space-y-1 text-sm text-neutral-600">
                          {getCertificatesByAuthor(member.id).slice(0, 3).map(cert => (
                            <div key={cert.id}>
                              {cert.title} - {cert.issuer}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 mt-4">
                      <button className="btn-secondary text-sm">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Message
                      </button>
                      <button className="btn-secondary text-sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Profile
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Individual Tab */}
      {viewMode === 'individual' && (
        <div className="bg-white rounded-xl border border-neutral-200 p-8 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 bg-neutral-100 rounded-full flex items-center justify-center">
              <UserCheck className="w-8 h-8 text-neutral-400" />
            </div>
            <h3 className="text-lg font-medium text-neutral-900 mb-2">
              Individual Reports
            </h3>
            <p className="text-neutral-600 mb-6">
              Detailed individual performance reports and 1:1 insights coming soon.
            </p>
            <button className="btn-primary">
              Request Early Access
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerView;

