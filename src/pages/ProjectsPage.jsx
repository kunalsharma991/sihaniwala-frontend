import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, ArrowRight, CheckCircle, Clock, ArrowUpCircle } from 'lucide-react';

const fadeInUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

const projects = [
  { title: 'Free Health Camp', location: 'Ghaziabad, UP', date: 'March 2026', beneficiaries: '200+', status: 'Completed', progress: 100, desc: 'Organized a free health checkup camp providing medical consultations and medicines to underprivileged families.' },
  { title: 'School Renovation Drive', location: 'Noida, UP', date: 'January 2026', beneficiaries: '500+', status: 'Completed', progress: 100, desc: 'Renovated a government school including new classrooms, furniture, and a library for students.' },
  { title: 'Winter Relief Campaign', location: 'Delhi NCR', date: 'December 2025', beneficiaries: '1000+', status: 'Completed', progress: 100, desc: 'Distributed blankets, warm clothes, and food packets to homeless individuals during winter.' },
  { title: 'Clean Water Initiative', location: 'Raj Nagar', date: 'Ongoing', beneficiaries: '300+', status: 'Ongoing', progress: 65, desc: 'Installing water purification systems in communities lacking access to clean drinking water.' },
  { title: 'Women Empowerment Workshop', location: 'Ghaziabad, UP', date: 'Upcoming', beneficiaries: '150+', status: 'Upcoming', progress: 20, desc: 'Skill development and self-defense workshops for women from underprivileged backgrounds.' },
  { title: 'Tree Plantation Drive', location: 'Delhi NCR', date: 'Upcoming', beneficiaries: 'All', status: 'Upcoming', progress: 10, desc: 'Planting 1000+ trees across Delhi NCR to contribute to environmental conservation.' },
];

const statusConfig = {
  Completed: { color: 'bg-green-100 text-green-700 border-green-200', icon: CheckCircle, barColor: 'bg-green-500' },
  Ongoing: { color: 'bg-blue-100 text-blue-700 border-blue-200', icon: Clock, barColor: 'bg-blue-500' },
  Upcoming: { color: 'bg-amber-100 text-amber-700 border-amber-200', icon: ArrowUpCircle, barColor: 'bg-amber-500' },
};

export default function ProjectsPage() {
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
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p) => {
            const config = statusConfig[p.status];
            const StatusIcon = config.icon;
            return (
              <motion.div key={p.title} variants={fadeInUp} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
                {/* Card Header */}
                <div className="bg-gradient-to-br from-[#0d2c54] to-blue-800 p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="flex justify-between items-start relative z-10">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${config.color}`}>
                      <StatusIcon size={12} /> {p.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mt-4 relative z-10">{p.title}</h3>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>

                  <div className="mt-5 space-y-2 text-sm text-gray-500">
                    <div className="flex items-center gap-2"><MapPin size={14} className="text-orange-500" /> {p.location}</div>
                    <div className="flex items-center gap-2"><Calendar size={14} className="text-orange-500" /> {p.date}</div>
                    <div className="flex items-center gap-2"><Users size={14} className="text-orange-500" /> {p.beneficiaries} Beneficiaries</div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-5">
                    <div className="flex justify-between text-xs font-semibold mb-1.5">
                      <span className="text-gray-500">Progress</span>
                      <span className="text-[#0d2c54]">{p.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${config.barColor} rounded-full transition-all duration-1000`} style={{ width: `${p.progress}%` }} />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>
    </div>
  );
}
