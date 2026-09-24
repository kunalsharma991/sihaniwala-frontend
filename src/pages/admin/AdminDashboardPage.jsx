import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { adminService } from '../../services';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
  Users, FileText, CreditCard, CheckCircle, XCircle, Clock, FolderOpen,
  DollarSign, BarChart3, UserCheck, Mail, Heart, Layers, AlertCircle
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Formatting helpers. Monetary values are ALWAYS kept per currency: the
// backend returns INR/USD/EUR/... rows separately and no FX conversion is
// ever performed or invented here.
// ---------------------------------------------------------------------------
const CURRENCY_SYMBOLS = { INR: '₹', USD: '$', EUR: '€', GBP: '£', AUD: 'A$', CAD: 'C$' };

const formatAmount = (currency, value) => {
  const symbol = CURRENCY_SYMBOLS[currency] || `${currency} `;
  return `${symbol}${Number(value ?? 0).toLocaleString('en-IN')}`;
};

const formatMonth = (yearMonth) => {
  const [year, month] = String(yearMonth).split('-');
  const date = new Date(Number(year), Number(month) - 1, 1);
  return date.toLocaleString('en-US', { month: 'short', year: '2-digit' });
};

// Human-readable labels for enum-style initiative types (e.g. EDUCATION_BPL
// -> "Education BPL"). Only affects display; API values are left untouched.
const labelize = (value) =>
  String(value)
    .split('_')
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(' ');

const CHART_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899', '#84cc16'];
const DONATION_STATUS_META = [
  { key: 'SUCCESS', label: 'Success', color: '#10b981' },
  { key: 'PENDING', label: 'Pending', color: '#f59e0b' },
  { key: 'FAILED', label: 'Failed', color: '#ef4444' },
  { key: 'REFUNDED', label: 'Refunded', color: '#6b7280' },
];
const GATEWAY_META = [
  { key: 'RAZORPAY', label: 'Razorpay', color: '#2563eb' },
  { key: 'PAYPAL', label: 'PayPal', color: '#0ea5e9' },
];

// Unwraps the backend ApiResponse envelope: axios `data` -> our `data`.
const payloadOf = (response) => response?.data?.data ?? null;

/**
 * Card wrapper for a single analytics section. Renders exactly one of
 * loading / error (with retry) / honest empty state / children — never
 * fabricated numbers and never a misleading empty axis set.
 */
function ChartCard({ icon: Icon = BarChart3, title, subtitle, loading, error, onRetry, empty, emptyMessage, children }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border">
      <h3 className="font-bold text-lg text-[#0d2c54] mb-4 flex items-center gap-2">
        <Icon size={20} /> {title}
      </h3>
      {subtitle && <p className="text-xs text-gray-400 -mt-2 mb-3">{subtitle}</p>}
      {loading ? (
        <div className="animate-pulse">
          <div className="h-[280px] bg-gray-100 rounded-xl"></div>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center text-center py-10">
          <AlertCircle size={32} className="mb-2 text-red-300" />
          <p className="text-sm font-medium text-red-600 mb-3">{error}</p>
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-[#0d2c54] text-white text-sm rounded-lg hover:bg-[#123a6e] transition"
          >
            Retry
          </button>
        </div>
      ) : empty ? (
        <div className="flex flex-col items-center justify-center text-center py-14 text-gray-400">
          <BarChart3 size={40} className="mb-3 text-gray-300" />
          <p className="text-sm font-medium">{emptyMessage}</p>
        </div>
      ) : (
        children
      )}
    </div>
  );
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [donationAnalytics, setDonationAnalytics] = useState(null);
  const [applicationAnalytics, setApplicationAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [donationsError, setDonationsError] = useState(null);
  const [applicationsError, setApplicationsError] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    setDonationsError(null);
    setApplicationsError(null);

    // Each endpoint is independent: a failure in one analytics call must not
    // make the rest of the dashboard unusable.
    const [dashboardResult, donationsResult, applicationsResult] = await Promise.allSettled([
      adminService.getDashboard(),
      adminService.getDonationAnalytics(),
      adminService.getApplicationAnalytics(),
    ]);

    if (dashboardResult.status === 'fulfilled') {
      setStats(payloadOf(dashboardResult.value));
    } else {
      console.error('[AdminDashboard] Failed to fetch dashboard stats:', dashboardResult.reason);
      setError(dashboardResult.reason?.response?.data?.message || 'Failed to load dashboard data');
    }

    if (donationsResult.status === 'fulfilled') {
      setDonationAnalytics(payloadOf(donationsResult.value));
    } else {
      console.error('[AdminDashboard] Failed to fetch donation analytics:', donationsResult.reason);
      setDonationsError(donationsResult.reason?.response?.data?.message || 'Failed to load donation analytics');
    }

    if (applicationsResult.status === 'fulfilled') {
      setApplicationAnalytics(payloadOf(applicationsResult.value));
    } else {
      console.error('[AdminDashboard] Failed to fetch application analytics:', applicationsResult.reason);
      setApplicationsError(applicationsResult.reason?.response?.data?.message || 'Failed to load application analytics');
    }

    setLoading(false);
  };

  // Safe extraction of analytics sections (always arrays, never undefined)
  const byMonth = Array.isArray(donationAnalytics?.byMonth) ? donationAnalytics.byMonth : [];
  const byCurrency = Array.isArray(donationAnalytics?.byCurrency) ? donationAnalytics.byCurrency : [];
  const byInitiative = Array.isArray(donationAnalytics?.byInitiative) ? donationAnalytics.byInitiative : [];
  const donationStatusCounts = donationAnalytics?.countByStatus || null;
  const gatewayCounts = donationAnalytics?.countByGateway || null;
  const appStatusCounts = applicationAnalytics?.countByStatus || null;
  const appByInitiativeType = Array.isArray(applicationAnalytics?.byInitiativeType) ? applicationAnalytics.byInitiativeType : [];

  const currenciesInData = [...new Set(byMonth.map((row) => row.currency))];

  // Keep the selector on a currency that actually exists in the data
  useEffect(() => {
    if (currenciesInData.length > 0 && !currenciesInData.includes(selectedCurrency)) {
      setSelectedCurrency(currenciesInData.includes('INR') ? 'INR' : currenciesInData[0]);
    }
  }, [currenciesInData.length]); // eslint-disable-line react-hooks/exhaustive-deps

  const activeCurrency = currenciesInData.includes(selectedCurrency) ? selectedCurrency : currenciesInData[0] || null;

  // Monthly series for the selected currency only — amounts are never mixed
  const monthlyChartData = byMonth
    .filter((row) => row.currency === activeCurrency)
    .map((row) => ({ month: formatMonth(row.yearMonth), amount: Number(row.successAmount ?? 0), count: Number(row.count ?? 0) }));

  // Count-based only: the byInitiative response carries no per-currency breakdown,
  // so successAmount is intentionally never surfaced (no currency to label it with).
  const initiativeChartData = byInitiative.map((row) => ({
    initiative: row.initiative,
    count: Number(row.count ?? 0),
  }));

  const donationStatusData = DONATION_STATUS_META
    .map(({ key, label, color }) => ({ name: label, value: Number(donationStatusCounts?.[key] ?? 0), color }))
    .filter((entry) => entry.value > 0);

  const gatewayData = GATEWAY_META
    .map(({ key, label, color }) => ({ name: label, value: Number(gatewayCounts?.[key] ?? 0), color }))
    .filter((entry) => entry.value > 0);

  const applicationStatusData = [
    { name: 'Pending', value: Number(appStatusCounts?.PENDING ?? 0), color: '#f59e0b' },
    { name: 'Under Review', value: Number(appStatusCounts?.UNDER_REVIEW ?? 0), color: '#3b82f6' },
    { name: 'Approved', value: Number(appStatusCounts?.APPROVED ?? 0), color: '#10b981' },
    { name: 'Rejected', value: Number(appStatusCounts?.REJECTED ?? 0), color: '#ef4444' },
  ];
  const hasApplicationData = applicationStatusData.some((entry) => entry.value > 0) || appByInitiativeType.length > 0;

  const initiativeChartHeight = Math.max(220, initiativeChartData.length * 44 + 40);

  // Widget configuration using backend DTO field names.
  // NOTE: totalDonations is a SUCCESS-only count in the backend DTO, so it is
  // labelled "Successful Donations", never "Total Donations".
  const widgets = [
    { icon: Users, label: 'Total Users', value: stats?.totalUsers, color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50' },
    { icon: DollarSign, label: 'Successful Donations', value: stats?.totalDonations, color: 'from-green-500 to-emerald-500', bg: 'bg-green-50' },
    { icon: Clock, label: 'Pending Donations', value: donationStatusCounts?.PENDING, color: 'from-amber-500 to-yellow-500', bg: 'bg-amber-50' },
    { icon: Clock, label: 'Under Review Applications', value: stats?.underReviewApplications, color: 'from-sky-500 to-blue-500', bg: 'bg-sky-50' },
    { icon: FileText, label: 'Pending Applications', value: stats?.pendingApplications, color: 'from-yellow-500 to-orange-500', bg: 'bg-yellow-50' },
    { icon: CheckCircle, label: 'Approved Applications', value: stats?.approvedApplications, color: 'from-green-500 to-teal-500', bg: 'bg-green-50' },
    { icon: XCircle, label: 'Rejected Applications', value: stats?.rejectedApplications, color: 'from-red-500 to-pink-500', bg: 'bg-red-50' },
    { icon: UserCheck, label: 'Volunteers', value: stats?.totalVolunteers, color: 'from-purple-500 to-violet-500', bg: 'bg-purple-50' },
    { icon: Mail, label: 'Contacts', value: stats?.totalContacts, color: 'from-indigo-500 to-blue-500', bg: 'bg-indigo-50' },
    { icon: FolderOpen, label: 'Projects', value: stats?.totalProjects, color: 'from-rose-500 to-orange-500', bg: 'bg-rose-50' },
  ];

  // Loading skeleton (no fake numbers flashed while the API is in flight)
  if (loading) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0d2c54]">Admin Dashboard</h1>
          <p className="text-gray-500">Loading dashboard data...</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {[...Array(10)].map((_, i) => (
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
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border p-6 animate-pulse">
              <div className="h-5 w-40 bg-gray-200 rounded mb-4"></div>
              <div className="h-[280px] bg-gray-100 rounded-xl"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Fatal state: the primary dashboard endpoint failed, so the cards cannot be
  // shown. Analytics sections below still load independently via retry.
  const showStatsError = error && !stats;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0d2c54]">Admin Dashboard</h1>
        <p className="text-gray-500">Welcome back! Here's what's happening today.</p>
      </div>

      {showStatsError ? (
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
      ) : (
        /* Stat Cards — values from GET /api/admin/dashboard */
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {widgets.map(({ icon: Icon, label, value, color, bg }, index) => (
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
                  <p className="text-2xl font-bold text-[#0d2c54] mt-1">
                    {Number(value ?? 0).toLocaleString()}
                  </p>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center`}>
                  <Icon size={22} className="text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {error && stats && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-8 flex items-center justify-between gap-4">
          <p className="text-sm text-red-700">Could not refresh summary stats. {error}</p>
          <button onClick={fetchDashboardData} className="shrink-0 px-3 py-1.5 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition">
            Retry
          </button>
        </div>
      )}

      {/* Donation Analytics — GET /api/admin/analytics/donations */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <ChartCard
          title="Monthly Successful Donations"
          subtitle="Amounts shown per selected currency only — currencies are never combined or converted."
          loading={false}
          error={donationsError}
          onRetry={fetchDashboardData}
          empty={byMonth.length === 0}
          emptyMessage="No donation data available yet."
        >
          {currenciesInData.length > 1 && (
            <div className="mb-4">
              <label htmlFor="donation-currency-selector" className="block text-sm font-semibold text-gray-600 mr-2">
                Currency
              </label>
              <select
                id="donation-currency-selector"
                aria-label="Select donation currency for monthly chart"
                value={activeCurrency || ''}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                className="mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              >
                {currenciesInData.map((currency) => (
                  <option key={currency} value={currency}>{currency}</option>
                ))}
              </select>
            </div>
          )}
          <div className="w-full" role="img" aria-label={`Line chart of monthly successful donation amounts in ${activeCurrency || 'selected currency'}`}>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={monthlyChartData} margin={{ top: 5, right: 16, bottom: 5, left: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} width={80} />
                <Tooltip
                  formatter={(value, name) =>
                    name === 'Amount' ? [formatAmount(activeCurrency, value), name] : [value, name]
                  }
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="amount"
                  name={`Amount (${activeCurrency || ''})`}
                  stroke="#f97316"
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard
          title="Donation Status"
          subtitle="Successful payment status is shown here; amounts are intentionally excluded (multi-currency)."
          icon={CreditCard}
          loading={false}
          error={donationsError}
          onRetry={fetchDashboardData}
          empty={donationStatusData.length === 0}
          emptyMessage="No donation data available yet."
        >
          <div className="w-full" role="img" aria-label="Pie chart of donation counts by payment status">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={donationStatusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={2}
                >
                  {donationStatusData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value} donation${value === 1 ? '' : 's'}`, name]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {gatewayData.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 mt-2 text-sm text-gray-600">
              {gatewayData.map((entry) => (
                <span key={entry.name} className="px-3 py-1 rounded-full bg-gray-50 border">
                  {entry.name}: <strong>{entry.value.toLocaleString()}</strong>
                </span>
              ))}
            </div>
          )}
        </ChartCard>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <ChartCard
          title="Successful Donations by Currency"
          icon={Layers}
          subtitle="Each currency is kept separate. No grand total is shown because currencies must not be added together."
          loading={false}
          error={donationsError}
          onRetry={fetchDashboardData}
          empty={byCurrency.length === 0}
          emptyMessage="No donation data available yet."
        >
          <div className="overflow-x-auto -mx-2">
            <table className="w-full text-sm min-w-[420px]">
              <caption className="sr-only">Successful donation count and amount for each currency</caption>
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th scope="col" className="py-2 px-2 font-semibold">Currency</th>
                  <th scope="col" className="py-2 px-2 font-semibold text-right">Successful Donations</th>
                  <th scope="col" className="py-2 px-2 font-semibold text-right">Successful Amount</th>
                </tr>
              </thead>
              <tbody>
                {byCurrency.map((row) => (
                  <tr key={row.currency} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="py-2.5 px-2 font-semibold text-[#0d2c54]">{row.currency}</td>
                    <td className="py-2.5 px-2 text-right">{Number(row.successCount ?? 0).toLocaleString()}</td>
                    <td className="py-2.5 px-2 text-right font-medium text-green-600">
                      {formatAmount(row.currency, row.successAmount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ChartCard>

        <ChartCard
          title="Donation Distribution by Initiative"
          icon={Heart}
          subtitle="Successful donation counts grouped by the initiative label donors selected (count-only; the API provides no per-currency breakdown here)."
          loading={false}
          error={donationsError}
          onRetry={fetchDashboardData}
          empty={initiativeChartData.length === 0}
          emptyMessage="No donation data available yet."
        >
          <div className="w-full" role="img" aria-label="Bar chart of successful donation counts by initiative">
            <ResponsiveContainer width="100%" height={initiativeChartHeight}>
              <BarChart data={initiativeChartData} layout="vertical" margin={{ top: 5, right: 24, bottom: 5, left: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 12 }} allowDecimals={false} />
                <YAxis
                  type="category"
                  dataKey="initiative"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  width={130}
                />
                <Tooltip formatter={(value) => [Number(value).toLocaleString(), 'Successful Donations']} />
                <Legend />
                <Bar dataKey="count" name="Donations" fill="#f97316" radius={[0, 6, 6, 0]} barSize={18} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Application Analytics — GET /api/admin/analytics/applications */}
      <ChartCard
        title="Initiative Applications"
        subtitle="Status counts and distribution by initiative type (enum values shown with readable labels)."
        icon={FileText}
        loading={false}
        error={applicationsError}
        onRetry={fetchDashboardData}
        empty={!hasApplicationData}
        emptyMessage="No application data available yet."
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {applicationStatusData.map((entry) => (
            <div key={entry.name} className="text-center p-4 bg-gray-50 rounded-xl border">
              <p className="text-2xl font-bold" style={{ color: entry.color }}>{entry.value.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-1">{entry.name}</p>
            </div>
          ))}
        </div>
        {appByInitiativeType.length > 0 ? (
          <div className="w-full" role="img" aria-label="Bar chart of initiative application counts by initiative type">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={appByInitiativeType.map((row) => ({ label: labelize(row.type), count: Number(row.count ?? 0) }))} margin={{ top: 5, right: 16, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="label" tick={{ fontSize: 11 }} tickLine={false} interval={0} />
                <YAxis tick={{ fontSize: 12 }} allowDecimals={false} tickLine={false} axisLine={false} />
                <Tooltip formatter={(value) => [value, 'Applications']} />
                <Bar dataKey="count" name="Applications" radius={[6, 6, 0, 0]} barSize={40}>
                  {appByInitiativeType.map((row, index) => (
                    <Cell key={row.type} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-sm text-gray-400 text-center py-4">No application data available yet.</p>
        )}
      </ChartCard>

      {/* Quick Stats Summary (dashboard endpoint values only) */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border mt-8">
        <h3 className="font-bold text-lg text-[#0d2c54] mb-4 flex items-center gap-2">
          <Heart size={20} className="text-orange-500" /> Platform Summary
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <p className="text-3xl font-bold text-[#0d2c54]">{Number(stats?.totalUsers ?? 0).toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-1">Registered Users</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-xl">
            <p className="text-3xl font-bold text-green-600">{Number(stats?.totalDonations ?? 0).toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-1">Successful Donations</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-xl">
            <p className="text-3xl font-bold text-purple-600">
              {Number(
                (appStatusCounts?.PENDING ?? stats?.pendingApplications ?? 0) +
                (appStatusCounts?.UNDER_REVIEW ?? stats?.underReviewApplications ?? 0) +
                (appStatusCounts?.APPROVED ?? stats?.approvedApplications ?? 0) +
                (appStatusCounts?.REJECTED ?? stats?.rejectedApplications ?? 0)
              ).toLocaleString()}
            </p>
            <p className="text-sm text-gray-500 mt-1">Total Applications</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-xl">
            <p className="text-3xl font-bold text-orange-600">{Number(stats?.totalVolunteers ?? 0).toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-1">Active Volunteers</p>
          </div>
        </div>
      </div>
    </div>
  );
}
