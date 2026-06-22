import { CreditCard, Calendar, Search, Globe, IndianRupee } from 'lucide-react';
import { useState, useEffect } from 'react';
import { adminService } from '../../services';

export default function AdminDonationsPage() {
  const [search, setSearch] = useState('');
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const { data } = await adminService.getDonations();
      setDonations(data.data || []);
    } catch (err) {
      console.error('Failed to fetch donations:', err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = donations.filter(d =>
    (d.donorName || '').toLowerCase().includes(search.toLowerCase()) ||
    (d.initiative || '').toLowerCase().includes(search.toLowerCase()) ||
    (d.donorEmail || '').toLowerCase().includes(search.toLowerCase())
  );

  const currencySymbol = (c) => {
    const map = { INR: '₹', USD: '$', EUR: '€', GBP: '£', AUD: 'A$', CAD: 'C$' };
    return map[c] || c + ' ';
  };

  const statusColor = (s) => {
    switch (s) {
      case 'SUCCESS': return 'bg-green-100 text-green-700';
      case 'FAILED': return 'bg-red-100 text-red-700';
      case 'PENDING': return 'bg-amber-100 text-amber-700';
      case 'REFUNDED': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0d2c54]">Donations</h1>
        <p className="text-gray-500">View and manage all donation records</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Donations', value: donations.length, icon: CreditCard, color: 'from-blue-500 to-indigo-500' },
          { label: 'Successful', value: donations.filter(d => d.status === 'SUCCESS').length, icon: Calendar, color: 'from-green-500 to-emerald-500' },
          { label: 'Razorpay', value: donations.filter(d => d.paymentGateway === 'RAZORPAY').length, icon: IndianRupee, color: 'from-blue-600 to-blue-400' },
          { label: 'PayPal', value: donations.filter(d => d.paymentGateway === 'PAYPAL').length, icon: Globe, color: 'from-yellow-500 to-orange-400' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className={`w-10 h-10 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center mb-3`}>
              <Icon size={20} className="text-white" />
            </div>
            <p className="text-2xl font-bold text-[#0d2c54]">{loading ? '...' : value}</p>
            <p className="text-xs text-gray-500">{label}</p>
          </div>
        ))}
      </div>

      <div className="relative mb-6 max-w-md">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Search donations..." />
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0d2c54] text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Donor</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Initiative</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Gateway</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="px-6 py-12 text-center text-gray-400">Loading donations...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={7} className="px-6 py-12 text-center text-gray-400">No donations found</td></tr>
              ) : (
                filtered.map(d => (
                  <tr key={d.id} className="border-b hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium">#{d.id}</td>
                    <td className="px-6 py-4">
                      <p className="font-medium">{d.anonymous ? 'Anonymous' : (d.donorName || '-')}</p>
                      <p className="text-xs text-gray-500">{d.anonymous ? '-' : (d.donorEmail || '-')}</p>
                    </td>
                    <td className="px-6 py-4 font-semibold text-green-600">{currencySymbol(d.currency)}{d.amount?.toLocaleString()}</td>
                    <td className="px-6 py-4">{d.initiative || '-'}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${d.paymentGateway === 'RAZORPAY' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {d.paymentGateway === 'RAZORPAY' ? '🇮🇳 Razorpay' : '🌍 PayPal'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{d.createdAt ? new Date(d.createdAt).toLocaleDateString() : '-'}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColor(d.status)}`}>{d.status}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
