import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Camera } from 'lucide-react';
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
  { id: 1, src: hospitalImg, title: 'Hospital Assistance', category: 'Healthcare', tall: true },
  { id: 2, src: marriageImg, title: 'Marriage Support', category: 'Support' },
  { id: 3, src: waterImg, title: 'Water Spray Truck', category: 'Community' },
  { id: 4, src: educationImg, title: 'Education Program', category: 'Education', tall: true },
  { id: 5, src: financialImg, title: 'Financial Help', category: 'Support' },
  { id: 6, src: schoolImg, title: 'School Adoption', category: 'Education' },
  { id: 7, src: heroBgImg, title: 'Community Event', category: 'Events' },
  { id: 8, src: founderImg, title: 'Foundation Day', category: 'Events', tall: true },
];

const categories = ['All', 'Healthcare', 'Education', 'Support', 'Community', 'Events'];

export default function GalleryPage() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? galleryImages : galleryImages.filter((img) => img.category === filter);

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
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  filter === cat
                    ? 'bg-gradient-to-r from-[#0d2c54] to-blue-700 text-white shadow-lg shadow-blue-500/20'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
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
                  <p className="text-orange-400 text-xs mt-0.5">{img.category}</p>
                </div>
                <div className="absolute top-3 right-3 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg">
                  <ZoomIn size={16} className="text-[#0d2c54]" />
                </div>
              </motion.div>
            ))}
          </motion.div>
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
                <p className="text-orange-400 text-sm">{selected.category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
