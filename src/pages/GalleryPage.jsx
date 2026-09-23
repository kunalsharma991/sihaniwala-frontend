import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Camera, AlertCircle, RefreshCw, ImageOff } from 'lucide-react';
import { galleryService } from '../services';
import { galleryCategories, getGalleryCategoryLabel, normalizeGalleryRecords, normalizeGalleryCategory } from '../utils/gallery';

const fadeInUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

const categories = galleryCategories.map((category) => category.value);

export default function GalleryPage() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('All');

  const fetchGallery = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await galleryService.getGallery();
      setGallery(normalizeGalleryRecords(res.data?.data || res.data));
    } catch {
      setGallery([]);
      setError('Unable to load the gallery right now. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(fetchGallery, 0);
    return () => window.clearTimeout(timeoutId);
  }, []);

  // Lightbox behaviour: close on Escape and lock background scrolling while open.
  useEffect(() => {
    if (!selected) return undefined;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelected(null);
    };
    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [selected]);

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
            <div className="flex justify-center items-center h-64" role="status" aria-live="polite">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0d2c54]" />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center text-center py-16">
              <AlertCircle size={40} className="text-red-400 mb-3" />
              <p className="text-gray-600 font-medium">{error}</p>
              <button onClick={fetchGallery} className="mt-4 inline-flex items-center gap-2 bg-[#0d2c54] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-[#1a4a7a] transition">
                <RefreshCw size={16} /> Retry
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-16 text-gray-500">
              <ImageOff size={40} className="text-gray-300 mb-3" />
              <p className="font-medium">{gallery.length === 0 ? 'The gallery is empty right now.' : 'No images in this category yet.'}</p>
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
                role="button"
                tabIndex={0}
                aria-label={`View image: ${img.title || 'gallery image'}`}
                onClick={() => setSelected(img)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelected(img);
                  }
                }}
                className="relative group cursor-pointer rounded-2xl overflow-hidden break-inside-avoid bg-white shadow-md hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={img.src}
                  alt={img.title}
                  loading="lazy"
                  decoding="async"
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
            role="dialog"
            aria-modal="true"
            aria-label={selected.title ? `Image viewer: ${selected.title}` : 'Image viewer'}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 cursor-pointer"
          >
            <button type="button" onClick={() => setSelected(null)} aria-label="Close image viewer" className="absolute top-5 right-5 sm:top-6 sm:right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition">
              <X size={24} />
            </button>
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selected.src}
                alt={selected.title}
                className="max-w-full max-h-[70vh] sm:max-h-[80vh] mx-auto rounded-2xl shadow-2xl"
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
