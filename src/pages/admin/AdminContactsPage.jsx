import { useState, useEffect } from 'react';
import { MessageSquare, Mail, Phone, Clock, Trash2, Eye } from 'lucide-react';
import { adminService } from '../../services';
import { toast } from 'react-toastify';

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await adminService.getContacts();
      const data = res.data?.data || res.data || [];
      setContacts(Array.isArray(data) ? data : []);
    } catch {
      toast.error('Failed to load contacts');
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadContacts = async () => { await fetchContacts(); };
    loadContacts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await adminService.deleteContact(id);
      toast.success('Contact deleted');
      if (selected?.id === id) setSelected(null);
      fetchContacts();
    } catch {
      toast.error('Failed to delete');
    }
  };

  const handleSelect = async (contact) => {
    setSelected(contact);
    if (!contact.read) {
      try {
        await adminService.markContactRead(contact.id);
        setContacts(prev => prev.map(c => c.id === contact.id ? { ...c, read: true } : c));
      } catch { return; }
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0d2c54]"></div>
    </div>
  );

  return (
    <div>
      <div className="mb-8 flex flex-wrap justify-between items-center gap-3">
        <div>
        <h1 className="text-3xl font-bold text-[#0d2c54]">Contact Messages</h1>
          <p className="text-gray-500">View and manage contact form submissions ({contacts.length} total)</p>
        </div>
        <button onClick={fetchContacts} className="px-4 py-2 bg-[#0d2c54] text-white rounded-xl hover:bg-[#1a4a7a] transition text-sm">
          Refresh
        </button>
      </div>
      {contacts.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <MessageSquare size={48} className="mx-auto mb-4 opacity-30" />
          <p className="text-lg">No contact messages yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            {contacts.map(c => (
              <div key={c.id} onClick={() => handleSelect(c)}
                className={`bg-white rounded-xl p-4 shadow cursor-pointer border-2 transition ${selected?.id === c.id ? 'border-orange-400' : 'border-transparent hover:border-gray-200'} ${!c.read ? 'border-l-4 border-l-orange-400' : ''}`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-[#0d2c54]">{c.name || 'Unknown'}</h3>
                      {!c.read && <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">New</span>}
                    </div>
                    <p className="text-sm text-gray-500">{c.subject || 'No subject'}</p>
                    <p className="text-sm text-gray-400 truncate mt-1">{c.message}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2 ml-3">
                    <span className="text-xs text-gray-400">{c.createdAt ? new Date(c.createdAt).toLocaleDateString('en-IN') : ''}</span>
                    <button onClick={e => { e.stopPropagation(); handleDelete(c.id); }} aria-label={`Delete message from ${c.name || 'contact'}`} className="p-1 text-red-400 hover:bg-red-50 rounded">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            {selected ? (
              <div>
                <h2 className="font-bold text-[#0d2c54] text-lg mb-4">{selected.subject || 'Message Details'}</h2>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm"><Eye size={14} className="text-gray-400" /><span className="font-medium">{selected.name}</span></div>
                  {selected.email && <div className="flex items-center gap-2 text-sm"><Mail size={14} className="text-gray-400" />{selected.email}</div>}
                  {selected.phone && <div className="flex items-center gap-2 text-sm"><Phone size={14} className="text-gray-400" />{selected.phone}</div>}
                  {selected.createdAt && <div className="flex items-center gap-2 text-sm text-gray-400"><Clock size={14} />{new Date(selected.createdAt).toLocaleString('en-IN')}</div>}
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-700 leading-relaxed">{selected.message}</p>
                </div>
                <div className="mt-4 flex gap-2">
                  {selected.email && (
                    <a href={`mailto:${selected.email}?subject=Re: ${selected.subject || ''}`} className="flex-1 text-center py-2 bg-[#0d2c54] text-white rounded-xl text-sm hover:bg-[#1a4a7a] transition">
                      Reply via Email
                    </a>
                  )}
                  <button onClick={() => handleDelete(selected.id)} className="px-4 py-2 border border-red-300 text-red-500 rounded-xl text-sm hover:bg-red-50 transition">
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-48 text-gray-400">
                <Eye size={32} className="mb-3 opacity-30" />
                <p>Select a message to view details</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
