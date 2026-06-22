import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, XCircle, Clock, Search, Filter } from 'lucide-react';
import { adminService } from '../../services';
import { toast } from 'react-toastify';
import { getStatusColor } from '../../utils/helpers';

const mockApplications = [
  { id: 1, type: 'Hospital', applicant: 'Ravi Kumar', date: '2026-05-28', status: 'PENDING' },
  { id: 2, type: 'Education', applicant: 'Sunita Devi', date: '2026-05-27', status: 'APPROVED' },
  { id: 3, type: 'Marriage', applicant: 'Ram Prasad', date: '2026-05-26', status: 'PENDING' },
  { id: 4, type: 'Financial', applicant: 'Meena Kumari', date: '2026-05-25', status: 'REJECTED' },
  { id: 5, type: 'Hospital', applicant: 'Anil Singh', date: '2026-05-24', status: 'PENDING' },
  { id: 6, type: 'Education', applicant: 'Priya Sharma', date: '2026-05-23', status: 'APPROVED' },
];

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState(mockApplications);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');

  const handleStatusUpdate = async (id, status) => {
    try {
      await adminService.updateApplicationStatus(id, status);
      setApplications(apps => apps.map(a => a.id === id ? { ...a, status } : a));
      toast.success(`Application ${status.toLowerCase()} successfully`);
    } catch {
      toast.error('Failed to update status');
    }
  };

  const filtered = applications
    .filter(a => filterStatus === 'ALL' || a.status === filterStatus)
    .filter(a => a.applicant.toLowerCase().includes(search.toLowerCase()) || a.type.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0d2c54]">Applications</h1>
        <p className="text-gray-500">Manage all initiative applications</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Search applications..." />
        </div>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="border px-6 py-3 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none">
          <option value="ALL">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0d2c54] text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Applicant</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(a => (
                <tr key={a.id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium">#{a.id}</td>
                  <td className="px-6 py-4">{a.type}</td>
                  <td className="px-6 py-4">{a.applicant}</td>
                  <td className="px-6 py-4">{a.date}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(a.status)}`}>{a.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    {a.status === 'PENDING' && (
                      <div className="flex gap-2">
                        <button onClick={() => handleStatusUpdate(a.id, 'APPROVED')} className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm hover:bg-green-200 transition flex items-center gap-1">
                          <CheckCircle size={14} /> Approve
                        </button>
                        <button onClick={() => handleStatusUpdate(a.id, 'REJECTED')} className="bg-red-100 text-red-700 px-3 py-1 rounded-lg text-sm hover:bg-red-200 transition flex items-center gap-1">
                          <XCircle size={14} /> Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
