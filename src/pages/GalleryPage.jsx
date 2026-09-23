import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Camera } from 'lucide-react';
import { galleryService } from '../services';
import { galleryCategories, getGalleryCategoryLabel, normalizeGalleryRecords, normalizeGalleryCategory } from '../utils/gallery';
import hospitalImg from '../assets/images/hospital.jpg';
import marriageImg from '../assets/images/marriage.jpg';
import waterImg from '../assets/images/water.jpg';
import educationImg from '../assets/images/education.jpg';
import financialImg from '../assets/images/financial.jpg';
import schoolImg from '../assets/images/school.jpg';
import heroBgImg from '../assets/images/hero-bg.jpg';
import founderImg from '../assets/images/founder.jpg.jpeg';

const fadeInUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

const galleryImages = [
  { id: 1, src: hospitalImg, title: 'Healthcare Assistance', category: 'healthcare_assistance', tall: true },
  { id: 2, src: marriageImg, title: 'Marriage Support', category: 'marriage_support' },
  { id: 3, src: waterImg, title: 'Water & Community Support', category: 'water_community_support' },
  { id: 4, src: educationImg, title: 'Education & Support', category: 'education_support', tall: true },
  { id: 5, src: financialImg, title: 'Community Outreach', category: 'community_outreach' },
  { id: 6, src: schoolImg, title: 'Education Activity', category: 'education_support' },
  { id: 7, src: heroBgImg, title: 'Community Outreach Event', category: 'community_outreach' },
  { id: 8, src: founderImg, title: 'Foundation Community Event', category: 'other', tall: true },
];

const categories = galleryCategories.map((category) => category.value);

export default function GalleryPage() {
  const [gallery, setGallery] = useState(galleryImages);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await galleryService.getGallery();
        const records = normalizeGalleryRecords(res.data?.data || res.data);
        if (records.length > 0) setGallery(records);
      } catch {
        // Keep the bundled gallery visible when the API is unavailable.
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const availableCategories = ['All', ...categories];
  const filtered = filter === 'All' ? gallery : gallery.filter((img) => normalizeGalleryCategory(img.category) === filter);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-[#0d2c54] py-24 text-white text-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-72 h-72 bg-orange-500/8 rounded-full blur-[100px]" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-400/6 rounded-full blur-[120px]" />
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto px-6 relative z-10">
          <Camera size={48} className="mx-auto text-orange-400 mb-4" />
          <h1 className="text-5xl md:text-6xl font-extrabold">Gallery</h1>
          <p className="text-gray-300/80 mt-4 text-lg max-w-xl mx-auto">Capturing moments of compassion, service and impact</p>
        </motion.div>
      </section>

      {/* Gallery */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {availableCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  filter === cat
                    ? 'bg-gradient-to-r from-[#0d2c54] to-blue-700 text-white shadow-lg shadow-blue-500/20'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat === 'All' ? 'All' : getGalleryCategoryLabel(cat)}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0d2c54]" />
            </div>
          ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
          >
            {filtered.map((img) => (
              <motion.div
                key={img.id}
                variants={fadeInUp}
                onClick={() => setSelected(img)}
                className="relative group cursor-pointer rounded-2xl overflow-hidden break-inside-avoid bg-white shadow-md hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className={`w-full object-cover group-hover:scale-105 transition-transform duration-700 ${img.tall ? 'h-72' : 'h-48'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
                  <p className="text-white font-bold text-sm">{img.title}</p>
                  <p className="text-orange-400 text-xs mt-0.5">{img.categoryLabel || getGalleryCategoryLabel(img.category)}</p>
                  {img.description && <p className="text-white/80 text-xs mt-1 line-clamp-2">{img.description}</p>}
                </div>
                <div className="absolute top-3 right-3 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg">
                  <ZoomIn size={16} className="text-[#0d2c54]" />
                </div>
              </motion.div>
            ))}
          </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-6 cursor-pointer"
          >
            <button onClick={() => setSelected(null)} className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition">
              <X size={24} />
            </button>
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selected.src}
                alt={selected.title}
                className="max-w-full max-h-[80vh] rounded-2xl shadow-2xl"
              />
              <div className="mt-4 text-center">
                <p className="text-white text-lg font-bold">{selected.title}</p>
                <p className="text-orange-400 text-sm">{selected.categoryLabel || getGalleryCategoryLabel(selected.category)}</p>
                {selected.description && <p className="text-white/80 text-sm mt-1">{selected.description}</p>}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
