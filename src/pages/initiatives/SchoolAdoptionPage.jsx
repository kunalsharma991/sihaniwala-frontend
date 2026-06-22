import { motion } from 'framer-motion';
import { School, CheckCircle, Calendar, Users, Building } from 'lucide-react';

const milestones = [
  { date: 'Jan 2026', title: 'School Identification', desc: 'Identified 3 government schools in Ghaziabad for adoption.', status: 'completed' },
  { date: 'Feb 2026', title: 'Infrastructure Assessment', desc: 'Detailed survey of existing facilities and requirements.', status: 'completed' },
  { date: 'Mar 2026', title: 'Classroom Renovation', desc: 'Renovated 12 classrooms with new furniture and paint.', status: 'completed' },
  { date: 'Apr 2026', title: 'Library Setup', desc: 'Established a library with 2000+ books and digital resources.', status: 'completed' },
  { date: 'May 2026', title: 'Computer Lab', desc: 'Setting up a computer lab with 20 new systems.', status: 'in-progress' },
  { date: 'Jun 2026', title: 'Playground Development', desc: 'Building a proper playground with sports equipment.', status: 'upcoming' },
  { date: 'Jul 2026', title: 'Smart Classrooms', desc: 'Installing smart boards and projectors in classrooms.', status: 'upcoming' },
];

const statusStyles = { completed: 'bg-green-500', 'in-progress': 'bg-blue-500', upcoming: 'bg-gray-300' };

export default function SchoolAdoptionPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-teal-500 to-cyan-600 py-20 text-white text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto px-6">
          <School size={48} className="mx-auto mb-4" />
          <h1 className="text-5xl md:text-6xl font-bold">School Adoption</h1>
          <p className="text-teal-100 mt-4 text-lg">Transforming government schools for better infrastructure and learning</p>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: School, label: 'Schools Adopted', value: '5' },
            { icon: Users, label: 'Students Benefited', value: '2000+' },
            { icon: Building, label: 'Classrooms Built', value: '30+' },
            { icon: CheckCircle, label: 'Milestones Done', value: '12' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <Icon size={28} className="mx-auto text-teal-500 mb-2" />
              <p className="text-3xl font-bold text-[#0d2c54]">{value}</p>
              <p className="text-sm text-gray-500">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0d2c54] mb-10 text-center">Development Milestones</h2>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 relative"
                >
                  <div className={`w-12 h-12 rounded-full ${statusStyles[m.status]} flex items-center justify-center z-10 shrink-0`}>
                    {m.status === 'completed' ? <CheckCircle size={20} className="text-white" /> : <Calendar size={20} className="text-white" />}
                  </div>
                  <div className="bg-white rounded-2xl shadow-lg p-6 flex-1 border">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-[#0d2c54] text-lg">{m.title}</h3>
                      <span className="text-xs text-gray-500">{m.date}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{m.desc}</p>
                    <span className={`inline-block mt-2 text-xs font-semibold px-3 py-1 rounded-full ${
                      m.status === 'completed' ? 'bg-green-100 text-green-700' : m.status === 'in-progress' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {m.status === 'completed' ? 'Completed' : m.status === 'in-progress' ? 'In Progress' : 'Upcoming'}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
