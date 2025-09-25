import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  Area,
  AreaChart
} from 'recharts';
import {
  TrendingUp,
  Users,
  Award,
  Eye,
  Heart,
  Filter,
  Download,
  Calendar,
  Building
} from 'lucide-react';
import { useCerts } from '../context/CertContext';
import { categories, units } from '../data/mockCerts';
import { ChartSkeleton } from '../components/Skeletons/index.jsx';

/**
 * Analytics page with comprehensive certification data visualization
 */
const Analytics = () => {
  const { getAnalyticsData, isLoading } = useCerts();
  const [analyticsData, setAnalyticsData] = useState(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState('6months');
  const [selectedUnit, setSelectedUnit] = useState('all');
  const [chartLoading, setChartLoading] = useState(true);

  // Load analytics data
  useEffect(() => {
    const loadAnalytics = async () => {
      setChartLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const data = getAnalyticsData();
      setAnalyticsData(data);
      setChartLoading(false);
    };

    loadAnalytics();
  }, [getAnalyticsData, selectedTimeRange, selectedUnit]);

  const timeRangeOptions = [
    { value: '3months', label: 'Last 3 Months' },
    { value: '6months', label: 'Last 6 Months' },
    { value: '1year', label: 'Last Year' },
    { value: 'all', label: 'All Time' }
  ];

  // Colors for charts
  const colors = [
    '#14b8a6', '#8b5cf6', '#ef4444', '#10b981', '#f59e0b',
    '#3b82f6', '#ec4899', '#6366f1', '#84cc16', '#f97316'
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-neutral-200 rounded-lg shadow-lg">
          <p className="font-medium text-neutral-900">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.dataKey}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (isLoading || !analyticsData) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">Analytics</h1>
          <p className="text-neutral-600 mt-1">Certificate trends and insights</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white rounded-xl border border-neutral-200 p-6 animate-pulse">
              <div className="h-4 w-20 bg-neutral-200 rounded mb-2"></div>
              <div className="h-8 w-16 bg-neutral-200 rounded"></div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white rounded-xl border border-neutral-200 p-6">
              <ChartSkeleton height="h-80" />
            </div>
          ))}
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
            <h1 className="text-3xl font-bold text-neutral-900">Analytics</h1>
            <p className="text-neutral-600 mt-1">Certificate trends and insights</p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Time range filter */}
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="input-field w-auto text-sm"
            >
              {timeRangeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* Unit filter */}
            <select
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
              className="input-field w-auto text-sm"
            >
              <option value="all">All Units</option>
              {units.map(unit => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>

            {/* Export button */}
            <button className="btn-secondary flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl border border-neutral-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Total Certificates</p>
              <p className="text-2xl font-bold text-neutral-900">
                {analyticsData.totalCertificates}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Award className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-sm">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-green-500">+12%</span>
            <span className="text-neutral-500">vs last month</span>
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
              <p className="text-sm text-neutral-600">Total Views</p>
              <p className="text-2xl font-bold text-neutral-900">
                {analyticsData.totalViews.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Eye className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-sm">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-green-500">+8%</span>
            <span className="text-neutral-500">vs last month</span>
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
              <p className="text-sm text-neutral-600">Total Likes</p>
              <p className="text-2xl font-bold text-neutral-900">
                {analyticsData.totalLikes}
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <Heart className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-sm">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-green-500">+15%</span>
            <span className="text-neutral-500">vs last month</span>
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
              <p className="text-sm text-neutral-600">Active Users</p>
              <p className="text-2xl font-bold text-neutral-900">248</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-sm">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-green-500">+5%</span>
            <span className="text-neutral-500">vs last month</span>
          </div>
        </motion.div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Certificates by Category */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl border border-neutral-200 p-6"
        >
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">
            Certificates by Category
          </h3>
          {chartLoading ? (
            <ChartSkeleton height="h-80" />
          ) : (
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={analyticsData.categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  stroke="#64748b"
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" fill="#14b8a6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </motion.div>

        {/* Top Issuers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl border border-neutral-200 p-6"
        >
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">
            Top Issuers
          </h3>
          {chartLoading ? (
            <ChartSkeleton height="h-80" />
          ) : (
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={analyticsData.topIssuers}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {analyticsData.topIssuers.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </motion.div>
      </div>

      {/* Full-width charts */}
      <div className="space-y-6">
        {/* Certificates Over Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-xl border border-neutral-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-neutral-900">
              Certificates Over Time
            </h3>
            <div className="flex items-center gap-2 text-sm text-neutral-500">
              <Calendar className="w-4 h-4" />
              Monthly trend
            </div>
          </div>
          
          {chartLoading ? (
            <ChartSkeleton height="h-80" />
          ) : (
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={analyticsData.monthlyData}>
                <defs>
                  <linearGradient id="colorCertificates" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="certificates"
                  stroke="#14b8a6"
                  fillOpacity={1}
                  fill="url(#colorCertificates)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </motion.div>

        {/* Unit Activity Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-xl border border-neutral-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-neutral-900">
              Unit Activity
            </h3>
            <div className="flex items-center gap-2 text-sm text-neutral-500">
              <Building className="w-4 h-4" />
              By department
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {units.map((unit, index) => {
              const certCount = Math.floor(Math.random() * 20) + 5; // Mock data
              const intensity = certCount / 25; // Normalize to 0-1
              
              return (
                <div
                  key={unit}
                  className="p-4 rounded-lg border border-neutral-200 hover:shadow-md transition-shadow"
                  style={{
                    backgroundColor: `rgba(20, 184, 166, ${intensity * 0.2 + 0.1})`
                  }}
                >
                  <h4 className="font-medium text-neutral-900 text-sm mb-1">
                    {unit}
                  </h4>
                  <p className="text-2xl font-bold text-primary-600">
                    {certCount}
                  </p>
                  <p className="text-xs text-neutral-500">certificates</p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Export Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="mt-8 bg-neutral-50 rounded-xl border border-neutral-200 p-6"
      >
        <h3 className="text-lg font-semibold text-neutral-900 mb-2">
          Export Data
        </h3>
        <p className="text-neutral-600 text-sm mb-4">
          Download comprehensive reports and raw data for further analysis.
        </p>
        
        <div className="flex flex-wrap gap-3">
          <button className="btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export as CSV
          </button>
          <button className="btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export as PDF
          </button>
          <button className="btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Charts
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;
