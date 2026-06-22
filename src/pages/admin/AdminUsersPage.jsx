import { Users, Shield, Mail, Calendar, Search } from 'lucide-react';
import { useState } from 'react';

const users = [
  { id: 1, name: 'Amit Sharma', email: 'amit@email.com', role: 'USER', joined: '2026-01-15', status: 'Active' },
  { id: 2, name: 'Admin User', email: 'admin@sihaniwala.org', role: 'ADMIN', joined: '2025-01-01', status: 'Active' },
  { id: 3, name: 'Priya Singh', email: 'priya@email.com', role: 'USER', joined: '2026-03-20', status: 'Active' },
  { id: 4, name: 'Rajesh Gupta', email: 'rajesh@email.com', role: 'USER', joined: '2026-04-10', status: 'Active' },
];

export default function AdminUsersPage() {
  const [search, setSearch] = useState('');
  const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0d2c54]">Users</h1>
        <p className="text-gray-500">Manage registered users</p>
      </div>

      <div className="relative mb-6 max-w-md">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Search users..." />
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0d2c54] text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">User</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Role</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Joined</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u.id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#0d2c54] flex items-center justify-center text-white font-bold">{u.name.charAt(0)}</div>
                    {u.name}
                  </td>
                  <td className="px-6 py-4">{u.email}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${u.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                      {u.role === 'ADMIN' ? <Shield size={12} className="inline mr-1" /> : <Users size={12} className="inline mr-1" />}
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">{u.joined}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700">{u.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
