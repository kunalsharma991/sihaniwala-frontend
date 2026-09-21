import { useState, useEffect } from 'react';
import { Users, Trash2, Phone, Mail, Calendar, MapPin } from 'lucide-react';
import { adminService } from '../../services';
import { toast } from 'react-toastify';

export default function AdminVolunteersPage() {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVolunteers = async () => {
    try {
      setLoading(true);
      const res = await adminService.getVolunteers();
      const data = res.data?.data || res.data || [];
      setVolunteers(Array.isArray(data) ? data : []);
    } catch {
      toast.error('Failed to load volunteers');
      setVolunteers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadVolunteers = async () => { await fetchVolunteers(); };
    loadVolunteers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this volunteer?')) return;
    try {
      await adminService.deleteVolunteer(id);
      toast.success('Volunteer removed');
      fetchVolunteers();
    } catch {
      toast.error('Failed to remove volunteer');
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0d2c54]"></div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#0d2c54]">Volunteers</h1>
          <p className="text-gray-500">Manage registered volunteers ({volunteers.length} total)</p>
        </div>
        <button onClick={fetchVolunteers} className="px-4 py-2 bg-[#0d2c54] text-white rounded-xl hover:bg-[#1a4a7a] transition text-sm">
          Refresh
        </button>
      </div>
      {volunteers.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <Users size={48} className="mx-auto mb-4 opacity-30" />
          <p className="text-lg">No volunteers yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {volunteers.map(v => (
            <div key={v.id} className="bg-white rounded-xl p-5 shadow hover:shadow-md transition">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0d2c54] flex items-center justify-center text-white font-bold text-lg">
                    {(v.name || 'V')[0].toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0d2c54]">{v.name || 'N/A'}</h3>
                    {v.skills && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{v.skills}</span>}
                  </div>
                </div>
                <button onClick={() => handleDelete(v.id)} className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition">
                  <Trash2 size={15} />
                </button>
              </div>
              <div className="space-y-1.5 text-sm text-gray-600">
                {v.email && <div className="flex items-center gap-2"><Mail size={13} className="text-gray-400" />{v.email}</div>}
                {v.phone && <div className="flex items-center gap-2"><Phone size={13} className="text-gray-400" />{v.phone}</div>}
                {v.city && <div className="flex items-center gap-2"><MapPin size={13} className="text-gray-400" />{v.city}</div>}
                {v.createdAt && <div className="flex items-center gap-2"><Calendar size={13} className="text-gray-400" />Joined {new Date(v.createdAt).toLocaleDateString('en-IN')}</div>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
