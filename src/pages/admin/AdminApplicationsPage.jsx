import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, XCircle, Search, X } from 'lucide-react';
import { adminService } from '../../services';
import { toast } from 'react-toastify';

const formatLabel = (key) => key
  .replace(/([A-Z])/g, ' $1')
  .replace(/^./, character => character.toUpperCase());

const formatValue = (value) => {
  if (value === null || value === undefined || value === '') return 'Not provided';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (typeof value === 'object') return JSON.stringify(value, null, 2);
  return String(value);
};

const parseFormData = (rawFormData) => {
  if (rawFormData === null || rawFormData === undefined || rawFormData === '') {
    return { details: null, error: false };
  }

  if (typeof rawFormData === 'object') {
    return { details: rawFormData, error: false };
  }

  if (typeof rawFormData !== 'string') {
    return { details: null, error: true };
  }

  try {
    return { details: JSON.parse(rawFormData), error: false };
  } catch {
    return { details: null, error: true };
  }
};

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [updating, setUpdating] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await adminService.getApplications();
      const data = res.data?.data || res.data || [];
      setApplications(Array.isArray(data) ? data : []);
    } catch {
      toast.error('Failed to load applications');
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    setUpdating(id + status);
    try {
      await adminService.updateApplicationStatus(id, status);
      setApplications(apps => apps.map(a => a.id === id ? { ...a, status } : a));
      setSelectedApplication(selected => selected?.application.id === id
        ? { ...selected, application: { ...selected.application, status } }
        : selected);
      toast.success(`Application ${status.toLowerCase()} successfully`);
    } catch {
      toast.error('Failed to update status');
    } finally {
      setUpdating(null);
    }
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(fetchApplications, 0);
    return () => window.clearTimeout(timeoutId);
  }, []);

  const openApplicationDetails = (application) => {
    const { details: formDetails, error: formDataError } = parseFormData(application.formData);
    setSelectedApplication({ application, formDetails, formDataError });
  };

  const filtered = applications
    .filter(a => filterStatus === 'ALL' || a.status === filterStatus)
    .filter(a => {
      const q = search.toLowerCase();
      return (
        (a.applicantName || a.applicant || '').toLowerCase().includes(q) ||
        (a.initiativeType || a.type || '').toLowerCase().includes(q)
      );
    });

  const getStatusColor = (status) => {
    switch (status) {
      case 'APPROVED': return 'bg-green-100 text-green-700';
      case 'REJECTED': return 'bg-red-100 text-red-700';
      case 'UNDER_REVIEW': return 'bg-blue-100 text-blue-700';
      default: return 'bg-yellow-100 text-yellow-700';
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0d2c54]"></div>
    </div>
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0d2c54]">Applications</h1>
        <p className="text-gray-500">Manage all initiative applications ({applications.length} total)</p>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
            placeholder="Search by name or type..."
          />
        </div>
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="border px-6 py-3 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
        >
          <option value="ALL">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="UNDER_REVIEW">Under Review</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>
        <button
          onClick={fetchApplications}
          className="px-4 py-3 bg-[#0d2c54] text-white rounded-xl hover:bg-[#1a4a7a] transition"
        >
          Refresh
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <FileText size={48} className="mx-auto mb-4 opacity-30" />
          <p className="text-lg">No applications found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map(app => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-5 shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1 flex-wrap">
                  <span className="font-semibold text-[#0d2c54]">
                    {app.applicantName || app.applicant || `Application #${app.id}`}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusColor(app.status)}`}>
                    {app.status}
                  </span>
                </div>
                <div className="text-sm text-gray-500 flex flex-wrap gap-3">
                  <span>📋 {app.initiativeType || app.type || 'N/A'}</span>
                  {app.phone && <span>📞 {app.phone}</span>}
                  {app.email && <span>✉️ {app.email}</span>}
                  <span>🕐 {app.createdAt ? new Date(app.createdAt).toLocaleDateString('en-IN') : app.date || 'N/A'}</span>
                </div>
                {app.adminNotes && (
                  <p className="text-xs text-gray-400 mt-1">Note: {app.adminNotes}</p>
                )}
              </div>
              <div className="flex gap-2 shrink-0">
                {app.status !== 'APPROVED' && (
                  <button
                    onClick={() => handleStatusUpdate(app.id, 'APPROVED')}
                    disabled={updating === app.id + 'APPROVED'}
                    className="flex items-center gap-1 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 text-sm transition"
                  >
                    <CheckCircle size={15} />
                    {updating === app.id + 'APPROVED' ? '...' : 'Approve'}
                  </button>
                )}
                {app.status !== 'REJECTED' && (
                  <button
                    onClick={() => handleStatusUpdate(app.id, 'REJECTED')}
                    disabled={updating === app.id + 'REJECTED'}
                    className="flex items-center gap-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 text-sm transition"
                  >
                    <XCircle size={15} />
                    {updating === app.id + 'REJECTED' ? '...' : 'Reject'}
                  </button>
                )}
                {app.status === 'PENDING' && (
                  <button
                    onClick={() => openApplicationDetails(app)}
                    className="flex items-center gap-1 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 text-sm transition"
                  >
                    <FileText size={15} />
                    Review
                  </button>
                )}
                {app.status !== 'PENDING' && (
                  <button
                    onClick={() => openApplicationDetails(app)}
                    className="flex items-center gap-1 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm transition"
                  >
                    <FileText size={15} />
                    Details
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {selectedApplication && (() => {
        const { application, formDetails, formDataError } = selectedApplication;
        const detailEntries = formDetails && typeof formDetails === 'object' && !Array.isArray(formDetails)
          ? Object.entries(formDetails)
          : [];

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="presentation" onClick={() => setSelectedApplication(null)}>
            <div
              className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-labelledby="application-details-title"
              onClick={event => event.stopPropagation()}
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <h2 id="application-details-title" className="text-2xl font-bold text-[#0d2c54]">Application Details</h2>
                  <p className="mt-1 text-sm text-gray-500">Application #{application.id}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedApplication(null)}
                  className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  aria-label="Close application details"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="grid gap-4 rounded-xl border bg-gray-50 p-4 sm:grid-cols-2">
                <div><dt className="text-xs font-semibold uppercase text-gray-500">Application ID</dt><dd className="mt-1 break-words text-gray-800">{application.id}</dd></div>
                <div><dt className="text-xs font-semibold uppercase text-gray-500">Initiative Type</dt><dd className="mt-1 break-words text-gray-800">{application.initiativeType || 'Not provided'}</dd></div>
                <div><dt className="text-xs font-semibold uppercase text-gray-500">Status</dt><dd className="mt-1 break-words text-gray-800">{application.status || 'Not provided'}</dd></div>
                <div><dt className="text-xs font-semibold uppercase text-gray-500">Created At</dt><dd className="mt-1 break-words text-gray-800">{application.createdAt ? new Date(application.createdAt).toLocaleString('en-IN') : 'Not provided'}</dd></div>
                <div><dt className="text-xs font-semibold uppercase text-gray-500">Updated At</dt><dd className="mt-1 break-words text-gray-800">{application.updatedAt ? new Date(application.updatedAt).toLocaleString('en-IN') : 'Not provided'}</dd></div>
              </div>

              <div className="mt-6">
                <h3 className="mb-3 text-lg font-semibold text-[#0d2c54]">Submitted Information</h3>
                {formDataError ? (
                  <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">The submitted form information could not be read.</p>
                ) : detailEntries.length === 0 ? (
                  <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">Detailed form information was not stored for this application.</p>
                ) : (
                  <dl className="divide-y rounded-xl border">
                    {detailEntries.map(([key, value]) => (
                      <div key={key} className="grid gap-1 p-4 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] sm:gap-4">
                        <dt className="font-semibold text-gray-600">{formatLabel(key)}</dt>
                        <dd className="break-words text-gray-800">{formatValue(value)}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>

              <div className="mt-6 flex flex-wrap justify-end gap-2">
                {application.status !== 'APPROVED' && (
                  <button
                    type="button"
                    onClick={() => handleStatusUpdate(application.id, 'APPROVED')}
                    disabled={updating === application.id + 'APPROVED'}
                    className="flex items-center gap-1 rounded-lg bg-green-500 px-3 py-2 text-sm text-white hover:bg-green-600 disabled:opacity-50"
                  >
                    <CheckCircle size={15} />
                    {updating === application.id + 'APPROVED' ? '...' : 'Approve'}
                  </button>
                )}
                {application.status !== 'REJECTED' && (
                  <button
                    type="button"
                    onClick={() => handleStatusUpdate(application.id, 'REJECTED')}
                    disabled={updating === application.id + 'REJECTED'}
                    className="flex items-center gap-1 rounded-lg bg-red-500 px-3 py-2 text-sm text-white hover:bg-red-600 disabled:opacity-50"
                  >
                    <XCircle size={15} />
                    {updating === application.id + 'REJECTED' ? '...' : 'Reject'}
                  </button>
                )}
                <button type="button" onClick={() => setSelectedApplication(null)} className="rounded-lg border px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">Close</button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
