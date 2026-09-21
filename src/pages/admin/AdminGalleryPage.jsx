import { useEffect, useState } from 'react';
import { Edit, Upload, Trash2 } from 'lucide-react';
import { adminService } from '../../services';
import { galleryCategories, getGalleryCategoryLabel, normalizeGalleryRecords } from '../../utils/gallery';
import { toast } from 'react-toastify';
import hospitalImg from '../../assets/images/hospital.jpg';
import marriageImg from '../../assets/images/marriage.jpg';
import waterImg from '../../assets/images/water.jpg';
import educationImg from '../../assets/images/education.jpg';
import financialImg from '../../assets/images/financial.jpg';
import schoolImg from '../../assets/images/school.jpg';

const mockGallery = [
  { id: 1, src: hospitalImg, title: 'Healthcare Assistance', category: 'healthcare_assistance' },
  { id: 2, src: marriageImg, title: 'Marriage Support', category: 'marriage_support' },
  { id: 3, src: waterImg, title: 'Water & Community Support', category: 'water_community_support' },
  { id: 4, src: educationImg, title: 'Education & Support', category: 'education_support' },
  { id: 5, src: financialImg, title: 'Community Outreach', category: 'community_outreach' },
  { id: 6, src: schoolImg, title: 'Education Activity', category: 'education_support' },
];

export default function AdminGalleryPage() {
  const [gallery, setGallery] = useState(mockGallery);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({ file: null, title: '', category: '', description: '' });
  const [editing, setEditing] = useState(null);
  const [savingEdit, setSavingEdit] = useState(false);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await adminService.getGallery();
      const records = normalizeGalleryRecords(res.data?.data || res.data);
      setGallery(records.length > 0 ? records : mockGallery);
    } catch {
      setGallery(mockGallery);
      toast.error('Failed to load gallery');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(fetchGallery, 0);
    return () => window.clearTimeout(timeoutId);
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    const { file, title, category, description } = form;
    if (!file) {
      toast.error('Please choose an image');
      return;
    }
    if (!title.trim()) {
      toast.error('Title is required');
      return;
    }
    if (!category) {
      toast.error('Activity category is required');
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', title.trim());
      formData.append('category', category);
      if (description.trim()) formData.append('description', description.trim());
      await adminService.uploadGallery(formData);
      await fetchGallery();
      setForm({ file: null, title: '', category: '', description: '' });
      e.target.reset();
      toast.success('Image uploaded successfully');
    } catch {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await adminService.deleteGalleryItem(id);
      await fetchGallery();
      toast.success('Image deleted');
    } catch {
      toast.error('Delete failed');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editing.title.trim() || !editing.category) {
      toast.error('Title and activity category are required');
      return;
    }
    setSavingEdit(true);
    try {
      const formData = new FormData();
      formData.append('title', editing.title.trim());
      formData.append('category', editing.category);
      if (editing.description.trim()) formData.append('description', editing.description.trim());
      await adminService.updateGallery(editing.id, formData);
      setEditing(null);
      await fetchGallery();
      toast.success('Gallery metadata updated');
    } catch {
      toast.error('Update failed');
    } finally {
      setSavingEdit(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#0d2c54]">Gallery</h1>
          <p className="text-gray-500">Manage gallery images</p>
        </div>
      </div>

      <form onSubmit={handleUpload} className="bg-white rounded-xl p-5 mb-8 shadow-sm space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm font-medium text-gray-700">
            Image *
            <input type="file" className="mt-1 w-full border rounded-lg px-3 py-2" accept="image/*" onChange={(e) => setForm({ ...form, file: e.target.files[0] || null })} disabled={uploading} />
          </label>
          <label className="text-sm font-medium text-gray-700">
            Title *
            <input className="mt-1 w-full border rounded-lg px-3 py-2" placeholder="Blood Donation Camp - Meerut" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} disabled={uploading} />
          </label>
          <label className="text-sm font-medium text-gray-700">
            Activity / Category *
            <select className="mt-1 w-full border rounded-lg px-3 py-2" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} disabled={uploading}>
              <option value="">Select an activity</option>
              {galleryCategories.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
          </label>
          <label className="text-sm font-medium text-gray-700">
            Description
            <textarea className="mt-1 w-full border rounded-lg px-3 py-2" placeholder="Optional description" rows="2" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} disabled={uploading} />
          </label>
        </div>
        <button type="submit" className={`flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition ${uploading ? 'opacity-50' : ''}`} disabled={uploading}>
          <Upload size={18} /> {uploading ? 'Uploading...' : 'Upload Image'}
        </button>
      </form>

      {editing && (
        <form onSubmit={handleUpdate} className="bg-orange-50 rounded-xl p-5 mb-8 shadow-sm space-y-4">
          <h2 className="font-semibold text-[#0d2c54]">Edit gallery metadata</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <input className="border rounded-lg px-3 py-2" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} placeholder="Title *" disabled={savingEdit} />
            <select className="border rounded-lg px-3 py-2" value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} disabled={savingEdit}>
              <option value="">Select an activity</option>
              {galleryCategories.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
            <input className="border rounded-lg px-3 py-2" value={editing.description || ''} onChange={(e) => setEditing({ ...editing, description: e.target.value })} placeholder="Description" disabled={savingEdit} />
          </div>
          <div className="flex gap-3">
            <button type="submit" className="bg-[#0d2c54] text-white px-4 py-2 rounded-lg" disabled={savingEdit}>{savingEdit ? 'Saving...' : 'Save changes'}</button>
            <button type="button" className="border px-4 py-2 rounded-lg" onClick={() => setEditing(null)} disabled={savingEdit}>Cancel</button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0d2c54]" />
        </div>
      ) : (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {gallery.map(item => (
          <div key={item.id} className="relative group rounded-xl overflow-hidden bg-gray-100">
            <div className="aspect-square">
            <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
              <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition">
                <Trash2 size={18} />
              </button>
              <button onClick={() => setEditing({ id: item.id, title: item.title || '', category: item.category || '', description: item.description || '' })} className="bg-white text-[#0d2c54] p-3 rounded-full hover:bg-gray-100 transition">
                <Edit size={18} />
              </button>
            </div>
            </div>
            <div className="p-3 bg-white">
              <p className="text-[#0d2c54] text-sm font-semibold">{item.title}</p>
              <p className="text-orange-600 text-xs mt-1">{item.categoryLabel || getGalleryCategoryLabel(item.category)}</p>
              {item.description && <p className="text-gray-500 text-xs mt-1 line-clamp-2">{item.description}</p>}
              {item.createdAt && <p className="text-gray-400 text-xs mt-1">{new Date(item.createdAt).toLocaleDateString('en-IN')}</p>}
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
}
