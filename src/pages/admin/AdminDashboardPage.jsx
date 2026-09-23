import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { adminService } from '../../services';
import {
  Users, FileText, CreditCard, CheckCircle, XCircle, Clock,
  TrendingUp, DollarSign, BarChart3, UserCheck, Mail, Heart
} from 'lucide-react';

// A small honest placeholder used where no verified analytics data source exists
// yet. The backend dashboard endpoint only exposes aggregate counts (see the
// stat cards / Platform Summary below); it does not provide a monthly donation
// time-series or an initiative-wise breakdown, so we intentionally avoid
// displaying fabricated chart numbers.
function AnalyticsEmptyState({ icon: Icon = BarChart3, title }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border">
      <h3 className="font-bold text-lg text-[#0d2c54] mb-4 flex items-center gap-2">
        <Icon size={20} /> {title}
      </h3>
      <div className="flex flex-col items-center justify-center text-center py-14 text-gray-400">
        <BarChart3 size={40} className="mb-3 text-gray-300" />
        <p className="text-sm font-medium">No analytics data available yet.</p>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDonations: 0,
    pendingApplications: 0,
    approvedApplications: 0,
    rejectedApplications: 0,
    totalVolunteers: 0,
    totalContacts: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await adminService.getDashboard();

      // Extract data from response.data.data (axios wraps in data, then our ApiResponse wraps in data)
      const dashboardData = response.data?.data;
      
      if (dashboardData) {
        setStats({
          totalUsers: dashboardData.totalUsers ?? 0,
          totalDonations: dashboardData.totalDonations ?? 0,
          pendingApplications: dashboardData.pendingApplications ?? 0,
          approvedApplications: dashboardData.approvedApplications ?? 0,
          rejectedApplications: dashboardData.rejectedApplications ?? 0,
          totalVolunteers: dashboardData.totalVolunteers ?? 0,
          totalContacts: dashboardData.totalContacts ?? 0,
        });
      } else {
        console.warn('[AdminDashboard] No data received from API');
      }
    } catch (err) {
      console.error('[AdminDashboard] Failed to fetch dashboard data:', err);
      setError(err.response?.data?.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // Widget configuration using backend DTO field names
  const widgets = [
    { 
      icon: Users, 
      label: 'Total Users', 
      value: stats.totalUsers, 
      color: 'from-blue-500 to-cyan-500', 
      bg: 'bg-blue-50',
      format: (v) => v.toLocaleString()
    },
    { 
      icon: DollarSign, 
      label: 'Successful Donations', 
      value: stats.totalDonations, 
      color: 'from-green-500 to-emerald-500', 
      bg: 'bg-green-50',
      format: (v) => v.toLocaleString()
    },
    { 
      icon: Clock, 
      label: 'Pending Applications', 
      value: stats.pendingApplications, 
      color: 'from-yellow-500 to-orange-500', 
      bg: 'bg-yellow-50',
      format: (v) => v.toLocaleString()
    },
    { 
      icon: CheckCircle, 
      label: 'Approved Applications', 
      value: stats.approvedApplications, 
      color: 'from-green-500 to-teal-500', 
      bg: 'bg-green-50',
      format: (v) => v.toLocaleString()
    },
    { 
      icon: XCircle, 
      label: 'Rejected Applications', 
      value: stats.rejectedApplications, 
      color: 'from-red-500 to-pink-500', 
      bg: 'bg-red-50',
      format: (v) => v.toLocaleString()
    },
    { 
      icon: UserCheck, 
      label: 'Total Volunteers', 
      value: stats.totalVolunteers, 
      color: 'from-purple-500 to-violet-500', 
      bg: 'bg-purple-50',
      format: (v) => v.toLocaleString()
    },
    { 
      icon: Mail, 
      label: 'Total Contacts', 
      value: stats.totalContacts, 
      color: 'from-indigo-500 to-blue-500', 
      bg: 'bg-indigo-50',
      format: (v) => v.toLocaleString()
    },
  ];

  // Loading skeleton
  if (loading) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0d2c54]">Admin Dashboard</h1>
          <p className="text-gray-500">Loading dashboard data...</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-2xl p-6 border animate-pulse">
              <div className="flex items-center justify-between">
                <div>
                  <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
                  <div className="h-8 w-16 bg-gray-200 rounded"></div>
                </div>
                <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0d2c54]">Admin Dashboard</h1>
          <p className="text-gray-500">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <XCircle className="text-red-500" size={20} />
            </div>
            <div>
              <p className="font-semibold text-red-800">Failed to load dashboard</p>
              <p className="text-sm text-red-600">{error}</p>
            </div>
          </div>
          <button
            onClick={fetchDashboardData}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0d2c54]">Admin Dashboard</h1>
        <p className="text-gray-500">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {widgets.map(({ icon: Icon, label, value, color, bg, format }, index) => (
          <motion.div 
            key={label} 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`${bg} rounded-2xl p-6 border`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="text-2xl font-bold text-[#0d2c54] mt-1">{format(value)}</p>
              </div>
              <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center`}>
                <Icon size={22} className="text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts – the backend does not yet expose a monthly donation
          time-series or an initiative distribution breakdown, so these are
          shown as honest empty states instead of fabricated numbers. */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <AnalyticsEmptyState title="Monthly Donations" />
        <AnalyticsEmptyState icon={Heart} title="Initiative Distribution" />
      </div>

      {/* Quick Stats Summary */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border">
        <h3 className="font-bold text-lg text-[#0d2c54] mb-4 flex items-center gap-2">
          <Heart size={20} className="text-orange-500" /> Platform Summary
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <p className="text-3xl font-bold text-[#0d2c54]">{stats.totalUsers}</p>
            <p className="text-sm text-gray-500 mt-1">Registered Users</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-xl">
            <p className="text-3xl font-bold text-green-600">{stats.totalDonations}</p>
            <p className="text-sm text-gray-500 mt-1">Total Donations</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-xl">
            <p className="text-3xl font-bold text-purple-600">
              {stats.pendingApplications + stats.approvedApplications + stats.rejectedApplications}
            </p>
            <p className="text-sm text-gray-500 mt-1">Total Applications</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-xl">
            <p className="text-3xl font-bold text-orange-600">{stats.totalVolunteers}</p>
            <p className="text-sm text-gray-500 mt-1">Active Volunteers</p>
          </div>
        </div>
      </div>
    </div>
  );
}
