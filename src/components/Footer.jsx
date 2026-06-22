import { Link } from 'react-router-dom';
import { Heart, MapPin, Phone, Mail, ExternalLink, ArrowUp } from 'lucide-react';

const socialIcons = [
  { name: 'Facebook', svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg> },
  { name: 'Instagram', svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
  { name: 'Twitter', svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg> },
  { name: 'Youtube', svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.43z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#0d2c54"/></svg> },
];
import logoImg from '../assets/images/logo.jpg.jpeg';

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Our Work', path: '/our-work' },
  { name: 'Projects', path: '/projects' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Volunteer', path: '/volunteer' },
  { name: 'Contact', path: '/contact' },
  { name: 'Donate', path: '/donate' },
];

const initiatives = [
  { name: 'Hospital Assistance', path: '/initiatives/hospital' },
  { name: 'Marriage Support', path: '/initiatives/marriage-support' },
  { name: 'Water Spray Truck', path: '/initiatives/water-spray' },
  { name: 'Education For BPL', path: '/initiatives/education-bpl' },
  { name: 'Financial Help', path: '/initiatives/financial-help' },
  { name: 'School Adoption', path: '/initiatives/school-adoption' },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative">
      {/* Scroll to top */}
      <button
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full shadow-lg shadow-orange-500/30 flex items-center justify-center hover:scale-110 transition-transform z-10"
      >
        <ArrowUp size={20} />
      </button>

      {/* Main Footer */}
      <div className="bg-gradient-to-b from-[#0d2c54] to-[#081d3a] text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img src={logoImg} alt="Sihaniwala Foundation" className="h-14 w-14 rounded-full object-cover ring-2 ring-orange-500/30" />
              <div>
                <h3 className="text-lg font-extrabold tracking-tight">SIHANIWALA</h3>
                <span className="text-[10px] text-orange-400 font-bold tracking-[0.2em] uppercase">Foundation</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Sihaniwala Foundation Charitable Trust is committed to transforming lives through compassion, service
              and equality. Together we can create a better tomorrow for every individual.
            </p>
            <div className="flex gap-3">
              {socialIcons.map((s) => (
                <button key={s.name} className="w-9 h-9 bg-white/10 hover:bg-orange-500 rounded-lg flex items-center justify-center transition-all hover:scale-110">
                  {s.svg}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-base mb-5 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-orange-500 rounded-full" />
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-orange-400 hover:translate-x-1 transition-all text-sm inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-orange-500 rounded-full transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Initiatives */}
          <div>
            <h3 className="font-bold text-base mb-5 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-orange-500 rounded-full" />
              Initiatives
            </h3>
            <ul className="space-y-2.5">
              {initiatives.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-orange-400 hover:translate-x-1 transition-all text-sm inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-orange-500 rounded-full transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-base mb-5 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-orange-500 rounded-full" />
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin size={16} className="text-orange-400" />
                </div>
                <span>Raj Nagar Extension, Ghaziabad, Uttar Pradesh, India</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                  <Phone size={16} className="text-orange-400" />
                </div>
                +91 8750970075
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                  <Mail size={16} className="text-orange-400" />
                </div>
                sihaniwalafoundation@gmail.com
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#061429] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-gray-500 text-xs text-center md:text-left">
            &copy; {new Date().getFullYear()} Sihaniwala Foundation Charitable Trust. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs flex items-center gap-1.5">
            Made with <Heart size={12} className="text-red-500 fill-current" /> for Humanity
          </p>
        </div>
      </div>
    </footer>
  );
}
