import { UserCheck, Mail, Phone, Calendar } from 'lucide-react';

const volunteers = [
  { id: 1, name: 'Priya Sharma', email: 'priya@email.com', phone: '9876543210', city: 'Ghaziabad', interest: 'Education', date: '2026-05-28' },
  { id: 2, name: 'Amit Kumar', email: 'amit@email.com', phone: '9876543211', city: 'Noida', interest: 'Healthcare', date: '2026-05-27' },
  { id: 3, name: 'Ravi Singh', email: 'ravi@email.com', phone: '9876543212', city: 'Delhi', interest: 'Community Service', date: '2026-05-26' },
  { id: 4, name: 'Sneha Gupta', email: 'sneha@email.com', phone: '9876543213', city: 'Ghaziabad', interest: 'Fundraising', date: '2026-05-25' },
];

export default function AdminVolunteersPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0d2c54]">Volunteers</h1>
        <p className="text-gray-500">Manage registered volunteers</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {volunteers.map(v => (
          <div key={v.id} className="bg-white rounded-2xl shadow-lg p-6 border hover:shadow-xl transition">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold text-lg">
                {v.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-[#0d2c54]">{v.name}</h3>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{v.interest}</span>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p className="flex items-center gap-2"><Mail size={14} /> {v.email}</p>
              <p className="flex items-center gap-2"><Phone size={14} /> {v.phone}</p>
              <p className="flex items-center gap-2"><Calendar size={14} /> Joined {v.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
