import { Settings, Plus } from 'lucide-react';

const projects = [
  { id: 1, title: 'Free Health Camp', status: 'Completed', date: 'March 2026' },
  { id: 2, title: 'School Renovation Drive', status: 'Completed', date: 'January 2026' },
  { id: 3, title: 'Clean Water Initiative', status: 'Ongoing', date: 'Ongoing' },
  { id: 4, title: 'Women Empowerment Workshop', status: 'Upcoming', date: 'Upcoming' },
];

export default function AdminProjectsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#0d2c54]">Projects</h1>
          <p className="text-gray-500">Manage foundation projects</p>
        </div>
        <button className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition">
          <Plus size={18} /> Add Project
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map(p => (
          <div key={p.id} className="bg-white rounded-2xl shadow-lg p-6 border hover:shadow-xl transition">
            <div className="flex items-center justify-between mb-3">
              <Settings size={20} className="text-gray-400" />
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                p.status === 'Completed' ? 'bg-green-100 text-green-700' : p.status === 'Ongoing' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
              }`}>{p.status}</span>
            </div>
            <h3 className="font-bold text-lg text-[#0d2c54]">{p.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{p.date}</p>
            <div className="flex gap-3 mt-4">
              <button className="text-sm bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition">Edit</button>
              <button className="text-sm bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
