import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart, Phone, Mail } from 'lucide-react';
import logoImg from '../assets/images/logo.jpg.jpeg';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Our Work', path: '/our-work' },
  { name: 'Projects', path: '/projects' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Volunteer', path: '/volunteer' },
  { name: 'Contact', path: '/contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Info Bar */}
      <div className="bg-[#081d3a] text-white/80 py-2 px-6 text-xs tracking-wide hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="mailto:sihaniwalafoundation@gmail.com" className="flex items-center gap-2 hover:text-orange-400 transition-colors">
              <Mail size={13} /> sihaniwalafoundation@gmail.com
            </a>
            <a href="tel:8750970075" className="flex items-center gap-2 hover:text-orange-400 transition-colors">
              <Phone size={13} /> +91 8750970075
            </a>
          </div>
          <div className="flex items-center gap-3 text-white/60">
            <span className="hover:text-orange-400 cursor-pointer transition-colors">Facebook</span>
            <span className="text-white/30">|</span>
            <span className="hover:text-orange-400 cursor-pointer transition-colors">Instagram</span>
            <span className="text-white/30">|</span>
            <span className="hover:text-orange-400 cursor-pointer transition-colors">Twitter</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/98 backdrop-blur-lg shadow-[0_4px_30px_rgba(0,0,0,0.08)]'
            : 'bg-white shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img
                src={logoImg}
                alt="Sihaniwala Foundation"
                className="h-12 w-12 rounded-full object-cover ring-2 ring-orange-500/20 group-hover:ring-orange-500/50 transition-all"
              />
            </div>
            <div>
              <h1 className="text-lg font-extrabold text-[#0d2c54] leading-none tracking-tight">
                SIHANIWALA
              </h1>
              <span className="text-[10px] text-orange-500 font-bold tracking-[0.2em] uppercase">Foundation</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex gap-1 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-[#0d2c54]/80 hover:text-[#0d2c54] font-medium text-sm px-4 py-2 rounded-lg hover:bg-[#0d2c54]/5 transition-all relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-orange-500 rounded-full transition-all duration-300 group-hover:w-6" />
              </Link>
            ))}
          </nav>

          {/* Right Actions - Donate Button Only */}
          <div className="flex items-center gap-3">
            <Link
              to="/donate"
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:shadow-lg hover:shadow-orange-500/30 hover:scale-[1.03] active:scale-[0.98] transition-all"
            >
              <Heart size={16} className="fill-current" />
              Donate Now
            </Link>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition text-[#0d2c54]"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden border-t bg-white"
            >
              <nav className="px-4 py-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 px-4 text-gray-700 hover:text-[#0d2c54] hover:bg-[#0d2c54]/5 font-medium rounded-xl transition"
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  to="/donate"
                  onClick={() => setMobileOpen(false)}
                  className="block py-3.5 text-center bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold mt-2 shadow-lg shadow-orange-500/20"
                >
                  Donate Now
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
