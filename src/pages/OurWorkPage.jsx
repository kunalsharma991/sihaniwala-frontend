import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Hospital, Heart, Truck, BookOpen, Wallet, School, ArrowRight, CheckCircle } from "lucide-react";

const fadeInUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };

const workItems = [
  { icon: Hospital, title: 'Hospital Assistance', desc: 'Providing medical aid, hospitalization support, and emergency healthcare services to underprivileged patients.', stats: '100+ Patients Helped', color: 'from-blue-500 to-cyan-500', path: '/initiatives/hospital' },
  { icon: Heart, title: 'Marriage Support', desc: 'Financially supporting families who cannot afford their daughters\' wedding expenses.', stats: '50+ Families Supported', color: 'from-pink-500 to-rose-500', path: '/initiatives/marriage-support' },
  { icon: Truck, title: 'Water Spray Truck', desc: 'Operating water spray trucks to clean streets and provide water to drought-affected areas.', stats: '20+ Routes Covered', color: 'from-green-500 to-emerald-500', path: '/initiatives/water-spray' },
  { icon: BookOpen, title: 'Education For BPL', desc: 'Sponsoring education for children from below-poverty-line families including fees, books, and uniforms.', stats: '200+ Students Enrolled', color: 'from-purple-500 to-violet-500', path: '/initiatives/education-bpl' },
  { icon: Wallet, title: 'Financial Help', desc: 'Providing direct financial assistance to families facing extreme economic hardship.', stats: '150+ Families Aided', color: 'from-orange-500 to-amber-500', path: '/initiatives/financial-help' },
  { icon: School, title: 'School Adoption', desc: 'Adopting government schools to improve infrastructure, teaching quality, and learning environment.', stats: '5+ Schools Adopted', color: 'from-teal-500 to-cyan-500', path: '/initiatives/school-adoption' },
];

export default function OurWorkPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#0d2c54] via-[#0f3460] to-[#1a4a8a] py-24 text-white text-center overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative max-w-4xl mx-auto px-6">
          <span className="inline-block bg-orange-500/20 text-orange-300 text-xs font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-full border border-orange-500/30 mb-6">
            See Our Impact
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Work</span>
          </h1>
          <p className="text-gray-300 mt-5 text-lg max-w-2xl mx-auto">
            Creating lasting change through dedicated service and action across communities.
          </p>
        </motion.div>
      </section>

      {/* Work Items */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-30" />
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-6xl mx-auto space-y-10 relative">
          {workItems.map(({ icon: Icon, title, desc, stats, color, path }, idx) => (
            <motion.div key={title} variants={fadeInUp}
              className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 md:p-10 border border-gray-100 group`}>
              <div className="md:w-1/3 flex justify-center">
                <div className={`w-36 h-36 bg-gradient-to-br ${color} rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform duration-300`}>
                  <Icon size={60} className="text-white" />
                </div>
              </div>
              <div className="md:w-2/3 text-center md:text-left">
                <h3 className="text-2xl font-extrabold text-[#0d2c54]">{title}</h3>
                <p className="text-gray-600 mt-3 leading-relaxed">{desc}</p>
                <div className="inline-flex items-center gap-2 mt-4 text-green-600 font-bold bg-green-50 px-4 py-2 rounded-full text-sm">
                  <CheckCircle size={16} /> {stats}
                </div>
                <div className="mt-4">
                  <Link to={path}
                    className="inline-flex items-center gap-2 text-orange-500 font-bold hover:gap-3 transition-all group/link">
                    Learn More <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
