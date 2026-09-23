import { Users, Shield, Search, Trash2, Power } from 'lucide-react';
import { useEffect, useState } from 'react';
import { adminService } from '../../services';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

export default function AdminUsersPage() {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user: currentUser } = useAuth();

  useEffect(() => {
    let active = true;
    const loadUsers = async () => {
      try {
        setLoading(true);
        const response = await adminService.getUsers();
        const data = response.data?.data || response.data || [];
        if (active) setUsers(Array.isArray(data) ? data : []);
      } catch (error) {
        if (active) {
          toast.error(error.response?.data?.message || 'Failed to load users');
          setUsers([]);
        }
      } finally {
        if (active) setLoading(false);
      }
    };
    loadUsers();
    return () => { active = false; };
  }, []);

  const handleToggle = async (id) => {
    try {
      const response = await adminService.toggleUserStatus(id);
      const updatedUser = response.data?.data;
      setUsers(prev => prev.map(item => item.id === id ? (updatedUser || { ...item, enabled: !item.enabled }) : item));
      toast.success('User status updated');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update user status');
    }
  };

  const handleDelete = async (targetUser) => {
    if (!window.confirm(`Delete ${targetUser.name || 'this user'}? This cannot be undone.`)) return;
    try {
      await adminService.deleteUser(targetUser.id);
      setUsers(prev => prev.filter(item => item.id !== targetUser.id));
      toast.success('User deleted');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete user');
    }
  };

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
                <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-400">Loading users...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-400">No users found</td></tr>
              ) : filtered.map(u => {
                const isCurrentUser = currentUser?.email?.toLowerCase() === u.email?.toLowerCase();
                return (
                <tr key={u.id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#0d2c54] flex items-center justify-center text-white font-bold">{(u.name || 'U').charAt(0)}</div>
                    {u.name}
                  </td>
                  <td className="px-6 py-4">{u.email}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${u.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                      {u.role === 'ADMIN' ? <Shield size={12} className="inline mr-1" /> : <Users size={12} className="inline mr-1" />}
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">{u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-IN') : '-'}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${u.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{u.enabled ? 'Active' : 'Disabled'}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {!isCurrentUser && <button onClick={() => handleToggle(u.id)} aria-label={u.enabled ? `Disable ${u.name}` : `Enable ${u.name}`} className="p-2 text-[#0d2c54] hover:bg-blue-50 rounded-lg" title={u.enabled ? 'Disable user' : 'Enable user'}><Power size={16} /></button>}
                      {!isCurrentUser && <button onClick={() => handleDelete(u)} aria-label={`Delete ${u.name}`} className="p-2 text-red-500 hover:bg-red-50 rounded-lg" title="Delete user"><Trash2 size={16} /></button>}
                      {isCurrentUser && <span className="text-xs text-gray-400">Current admin</span>}
                    </div>
                  </td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
