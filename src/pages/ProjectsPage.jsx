import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, CheckCircle, Clock, AlertCircle, RefreshCw } from 'lucide-react';
import { projectService } from '../services';

const fadeInUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

// Status styling keyed on the values the admin project form actually stores
// (ACTIVE / COMPLETED / PENDING), with a neutral fallback for any legacy value.
const statusConfig = {
  ACTIVE: { label: 'Active', color: 'bg-green-100 text-green-700 border-green-200', icon: CheckCircle },
  COMPLETED: { label: 'Completed', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: CheckCircle },
  PENDING: { label: 'Pending', color: 'bg-amber-100 text-amber-700 border-amber-200', icon: Clock },
};
const fallbackStatus = { label: 'Update', color: 'bg-gray-100 text-gray-700 border-gray-200', icon: Clock };

const formatStatus = (status) => {
  const key = String(status || '').trim().toUpperCase();
  return statusConfig[key] || fallbackStatus;
};

const formatDate = (value) => {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await projectService.getProjects();
      setProjects(Array.isArray(res.data?.data) ? res.data.data : []);
    } catch {
      setError('Unable to load projects. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(fetchProjects, 0);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-[#0d2c54] py-24 text-white text-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-72 h-72 bg-orange-500/8 rounded-full blur-[100px]" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-400/6 rounded-full blur-[120px]" />
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto px-6 relative z-10">
          <span className="inline-block text-orange-400 font-bold text-xs tracking-[0.2em] uppercase bg-orange-500/10 px-4 py-1.5 rounded-full border border-orange-500/20">Browse Our Work</span>
          <h1 className="text-5xl md:text-6xl font-extrabold mt-4">Projects</h1>
          <p className="text-gray-300/80 mt-4 text-lg max-w-xl mx-auto">Discover our completed and ongoing projects making real impact</p>
        </motion.div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center h-64" role="status" aria-live="polite">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0d2c54]" />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center text-center py-16">
              <AlertCircle size={40} className="text-red-400 mb-3" />
              <p className="text-gray-600 font-medium">{error}</p>
              <button onClick={fetchProjects} className="mt-4 inline-flex items-center gap-2 bg-[#0d2c54] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-[#1a4a7a] transition">
                <RefreshCw size={16} /> Retry
              </button>
            </div>
          ) : projects.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-16 text-gray-500">
              <Users size={40} className="text-gray-300 mb-3" />
              <p className="font-medium">There are no projects to show right now.</p>
              <p className="text-sm mt-1">Please check back soon.</p>
            </div>
          ) : (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((p) => {
                const config = formatStatus(p.status);
                const StatusIcon = config.icon;
                const date = formatDate(p.createdAt || p.updatedAt);
                return (
                  <motion.div key={p.id} variants={fadeInUp} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
                    {/* Card Header */}
                    <div className="bg-gradient-to-br from-[#0d2c54] to-blue-800 p-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                      <div className="flex justify-between items-start relative z-10">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${config.color}`}>
                          <StatusIcon size={12} /> {config.label}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white mt-4 relative z-10">{p.title}</h3>
                    </div>

                    {/* Card Body */}
                    <div className="p-6">
                      {p.description && <p className="text-gray-600 text-sm leading-relaxed">{p.description}</p>}

                      <div className="mt-5 space-y-2 text-sm text-gray-500">
                        {p.location && <div className="flex items-center gap-2"><MapPin size={14} className="text-orange-500" /> {p.location}</div>}
                        {date && <div className="flex items-center gap-2"><Calendar size={14} className="text-orange-500" /> {date}</div>}
                        {p.beneficiaries && <div className="flex items-center gap-2"><Users size={14} className="text-orange-500" /> {p.beneficiaries} Beneficiaries</div>}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
