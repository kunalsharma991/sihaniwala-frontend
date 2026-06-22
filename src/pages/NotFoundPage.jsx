import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Heart, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0d2c54] via-[#0f3460] to-[#1a4a8a] py-12 px-6 relative overflow-hidden">
      <div className="absolute top-20 left-20 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-lg relative">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}>
          <h1 className="text-[10rem] font-extrabold text-white/10 leading-none select-none">404</h1>
        </motion.div>
        <h2 className="text-4xl font-extrabold text-white -mt-16">Page Not Found</h2>
        <p className="text-gray-300 mt-4 text-lg">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>
        <div className="flex gap-4 justify-center mt-10">
          <Link to="/" className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-3.5 rounded-full font-bold hover:shadow-xl hover:shadow-orange-500/25 transition-all">
            <Home size={18} /> Go Home
          </Link>
          <Link to="/donate" className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-3.5 rounded-full font-bold hover:bg-white/20 transition-all">
            <Heart size={18} /> Donate
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
