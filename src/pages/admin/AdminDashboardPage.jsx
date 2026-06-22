import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { adminService } from '../../services';
import {
  Users, FileText, CreditCard, CheckCircle, XCircle, Clock,
  TrendingUp, DollarSign, BarChart3, UserCheck, Mail, Heart
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Chart data remains static for now (can be made dynamic later)
const monthlyData = [
  { month: 'Jan', donations: 45000 }, { month: 'Feb', donations: 62000 },
  { month: 'Mar', donations: 78000 }, { month: 'Apr', donations: 55000 },
  { month: 'May', donations: 92000 }, { month: 'Jun', donations: 110000 },
];

const pieData = [
  { name: 'Hospital', value: 30, color: '#3b82f6' },
  { name: 'Education', value: 25, color: '#8b5cf6' },
  { name: 'Marriage', value: 20, color: '#ec4899' },
  { name: 'Financial', value: 15, color: '#f97316' },
  { name: 'School', value: 10, color: '#14b8a6' },
];

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
      console.log('[AdminDashboard] API Response:', response);
      
      // Extract data from response.data.data (axios wraps in data, then our ApiResponse wraps in data)
      const dashboardData = response.data?.data;
      
      if (dashboardData) {
        console.log('[AdminDashboard] Dashboard Stats:', dashboardData);
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

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 border">
          <h3 className="font-bold text-lg text-[#0d2c54] mb-4 flex items-center gap-2">
            <BarChart3 size={20} /> Monthly Donations
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(val) => `₹${val.toLocaleString()}`} />
              <Bar dataKey="donations" fill="#f97316" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border">
          <h3 className="font-bold text-lg text-[#0d2c54] mb-4">Initiative Distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
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
