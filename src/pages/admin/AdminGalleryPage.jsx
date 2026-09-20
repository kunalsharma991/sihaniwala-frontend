import { useEffect, useState } from 'react';
import { Upload, Trash2 } from 'lucide-react';
import { adminService } from '../../services';
import { normalizeGalleryRecords } from '../../utils/gallery';
import { toast } from 'react-toastify';
import hospitalImg from '../../assets/images/hospital.jpg';
import marriageImg from '../../assets/images/marriage.jpg';
import waterImg from '../../assets/images/water.jpg';
import educationImg from '../../assets/images/education.jpg';
import financialImg from '../../assets/images/financial.jpg';
import schoolImg from '../../assets/images/school.jpg';

const mockGallery = [
  { id: 1, src: hospitalImg, title: 'Hospital Initiative', category: 'Healthcare' },
  { id: 2, src: marriageImg, title: 'Marriage Support', category: 'Support' },
  { id: 3, src: waterImg, title: 'Water Spray', category: 'Community' },
  { id: 4, src: educationImg, title: 'Education', category: 'Education' },
  { id: 5, src: financialImg, title: 'Financial Help', category: 'Support' },
  { id: 6, src: schoolImg, title: 'School Adoption', category: 'Education' },
];

export default function AdminGalleryPage() {
  const [gallery, setGallery] = useState(mockGallery);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

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
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      await adminService.uploadGallery(formData);
      await fetchGallery();
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

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#0d2c54]">Gallery</h1>
          <p className="text-gray-500">Manage gallery images</p>
        </div>
        <label className={`flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-semibold cursor-pointer hover:shadow-lg transition ${uploading ? 'opacity-50' : ''}`}>
          <Upload size={18} /> {uploading ? 'Uploading...' : 'Upload Image'}
          <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={uploading} />
        </label>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0d2c54]" />
        </div>
      ) : (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {gallery.map(item => (
          <div key={item.id} className="relative group rounded-xl overflow-hidden aspect-square bg-gray-100">
            <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
              <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition">
                <Trash2 size={18} />
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
              <p className="text-white text-sm font-semibold">{item.title}</p>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
}
