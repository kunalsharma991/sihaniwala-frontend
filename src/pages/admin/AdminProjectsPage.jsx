import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Save } from 'lucide-react';
import { adminService } from '../../services';
import { toast } from 'react-toastify';

const emptyForm = { title: '', description: '', location: '', status: 'ACTIVE', beneficiaries: '' };

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchProjects(); }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await adminService.getAdminProjects();
      setProjects(res.data?.data || res.data || []);
    } catch (err) {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const openAdd = () => { setForm(emptyForm); setEditingId(null); setShowForm(true); };
  const openEdit = (p) => { setForm({ title: p.title, description: p.description, location: p.location, status: p.status, beneficiaries: p.beneficiaries }); setEditingId(p.id); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditingId(null); setForm(emptyForm); };

  const handleSave = async () => {
    if (!form.title.trim()) { toast.error('Title is required'); return; }
    setSaving(true);
    try {
      if (editingId) {
        await adminService.updateAdminProject(editingId, form);
        toast.success('Project updated');
      } else {
        await adminService.createAdminProject(form);
        toast.success('Project created');
      }
      closeForm();
      fetchProjects();
    } catch (err) {
      toast.error('Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      await adminService.deleteAdminProject(id);
      toast.success('Project deleted');
      fetchProjects();
    } catch (err) {
      toast.error('Failed to delete project');
    }
  };

  if (loading) return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0d2c54]"></div></div>;

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
        <h1 className="text-2xl font-bold text-[#0d2c54]">Projects</h1>
        <button onClick={openAdd} className="flex items-center gap-2 bg-[#0d2c54] text-white px-4 py-2 rounded-lg hover:bg-[#1a4a7a] transition">
          <Plus size={18} /> Add Project
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-[#0d2c54]">{editingId ? 'Edit Project' : 'Add Project'}</h2>
              <button type="button" onClick={closeForm} aria-label="Close project form" className="p-1 text-gray-500 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
            </div>
            <div className="space-y-3">
              <input className="w-full border rounded-lg px-3 py-2" placeholder="Title *" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
              <textarea className="w-full border rounded-lg px-3 py-2 h-24 resize-none" placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
              <input className="w-full border rounded-lg px-3 py-2" placeholder="Location" value={form.location} onChange={e => setForm({...form, location: e.target.value})} />
              <input className="w-full border rounded-lg px-3 py-2" placeholder="Beneficiaries" value={form.beneficiaries} onChange={e => setForm({...form, beneficiaries: e.target.value})} />
              <select className="w-full border rounded-lg px-3 py-2" value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
                <option value="ACTIVE">Active</option>
                <option value="COMPLETED">Completed</option>
                <option value="PENDING">Pending</option>
              </select>
            </div>
            <div className="flex gap-3 mt-5 justify-end">
                <button type="button" onClick={closeForm} className="px-4 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
                <button type="button" onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-[#0d2c54] text-white px-4 py-2 rounded-lg hover:bg-[#1a4a7a] disabled:opacity-50">
                <Save size={16} /> {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {projects.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No projects yet. Add your first project!</div>
      ) : (
        <div className="grid gap-4">
          {projects.map(p => (
            <div key={p.id} className="bg-white rounded-xl p-5 shadow flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-semibold text-[#0d2c54]">{p.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : p.status === 'COMPLETED' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>{p.status}</span>
                </div>
                {p.description && <p className="text-sm text-gray-600 mb-1">{p.description}</p>}
                <div className="text-xs text-gray-400 flex gap-4">
                  {p.location && <span>📍 {p.location}</span>}
                  {p.beneficiaries && <span>👥 {p.beneficiaries} beneficiaries</span>}
                </div>
              </div>
              <div className="flex gap-2 ml-4 shrink-0">
                <button type="button" onClick={() => openEdit(p)} aria-label={`Edit ${p.title}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"><Edit size={16} /></button>
                <button type="button" onClick={() => handleDelete(p.id)} aria-label={`Delete ${p.title}`} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
