import { motion } from 'framer-motion';
import { Truck, MapPin, Calendar, Clock, User } from 'lucide-react';

const routes = [
  { id: 1, route: 'Raj Nagar → Indirapuram', driver: 'Ramesh Kumar', date: '2026-05-29', time: '06:00 AM', status: 'Completed' },
  { id: 2, route: 'Mohan Nagar → Vaishali', driver: 'Suresh Singh', date: '2026-05-30', time: '07:00 AM', status: 'Scheduled' },
  { id: 3, route: 'Vasundhara → Kavi Nagar', driver: 'Vijay Pal', date: '2026-05-31', time: '06:30 AM', status: 'Scheduled' },
  { id: 4, route: 'Govindpuram → Raj Nagar', driver: 'Amit Sharma', date: '2026-06-01', time: '06:00 AM', status: 'Scheduled' },
  { id: 5, route: 'Crossing Republik → Noida', driver: 'Ramesh Kumar', date: '2026-06-02', time: '07:30 AM', status: 'Scheduled' },
];

const statusColors = { Completed: 'bg-green-100 text-green-700', Scheduled: 'bg-blue-100 text-blue-700' };

export default function WaterSprayPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-green-500 to-emerald-600 py-20 text-white text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto px-6">
          <Truck size={48} className="mx-auto mb-4" />
          <h1 className="text-5xl md:text-6xl font-bold">Water Spray Truck</h1>
          <p className="text-green-100 mt-4 text-lg">Clean water delivery and street cleaning services for communities</p>
        </motion.div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-[#0d2c54] mb-8">Route Schedule & Logs</h2>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {[
                { label: 'Total Routes', value: '20+', color: 'bg-blue-50 text-blue-700' },
                { label: 'Completed', value: '15', color: 'bg-green-50 text-green-700' },
                { label: 'Scheduled', value: '5', color: 'bg-yellow-50 text-yellow-700' },
                { label: 'Drivers', value: '4', color: 'bg-purple-50 text-purple-700' },
              ].map((s) => (
                <div key={s.label} className={`${s.color} rounded-2xl p-6 text-center`}>
                  <p className="text-3xl font-bold">{s.value}</p>
                  <p className="text-sm mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Route Table */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#0d2c54] text-white">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Route</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Driver</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Time</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {routes.map((r) => (
                      <tr key={r.id} className="border-b hover:bg-gray-50 transition">
                        <td className="px-6 py-4 flex items-center gap-2"><MapPin size={16} className="text-green-500" /> {r.route}</td>
                        <td className="px-6 py-4 flex items-center gap-2"><User size={16} className="text-blue-500" /> {r.driver}</td>
                        <td className="px-6 py-4 flex items-center gap-2"><Calendar size={16} className="text-gray-400" /> {r.date}</td>
                        <td className="px-6 py-4 flex items-center gap-2"><Clock size={16} className="text-gray-400" /> {r.time}</td>
                        <td className="px-6 py-4">
                          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColors[r.status]}`}>{r.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
