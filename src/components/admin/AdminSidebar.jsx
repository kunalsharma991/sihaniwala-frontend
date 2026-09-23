import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, FileText, Image, MessageSquare,
  UserCheck, CreditCard, Settings, LogOut, Shield, Lock, X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const sidebarLinks = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { name: 'Applications', path: '/admin/applications', icon: FileText },
  { name: 'Donations', path: '/admin/donations', icon: CreditCard },
  { name: 'Volunteers', path: '/admin/volunteers', icon: UserCheck },
  { name: 'Gallery', path: '/admin/gallery', icon: Image },
  { name: 'Contacts', path: '/admin/contacts', icon: MessageSquare },
  { name: 'Users', path: '/admin/users', icon: Users },
  { name: 'Projects', path: '/admin/projects', icon: Settings },
];

export default function AdminSidebar({ open = false, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Close the off-canvas sidebar after navigating on mobile/tablet.
  const handleNavClick = () => {
    if (onClose) onClose();
  };

  const linkClass = (isActive) => `flex items-center gap-3 px-6 py-3 mx-2 rounded-lg transition-all ${
    isActive ? 'bg-orange-500 text-white' : 'text-gray-300 hover:bg-white/10 hover:text-white'
  }`;

  return (
    <>
      {/* Backdrop (mobile / tablet only) */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        id="admin-sidebar"
        aria-label="Admin navigation"
        className={`fixed left-0 top-0 h-screen w-64 bg-[#0d2c54] text-white flex flex-col z-50 transform transition-transform duration-300 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <Shield size={28} className="text-orange-400" />
            <div>
              <h2 className="font-bold text-lg">Admin Panel</h2>
              <p className="text-xs text-gray-400">Sihaniwala Foundation</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="lg:hidden p-2 -mr-2 rounded-lg hover:bg-white/10 transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={handleNavClick}
                aria-current={isActive ? 'page' : undefined}
                className={linkClass(isActive)}
              >
                <Icon size={20} />
                <span className="font-medium">{link.name}</span>
              </Link>
            );
          })}
          <Link
            to="/change-password"
            onClick={handleNavClick}
            aria-current={location.pathname === '/change-password' ? 'page' : undefined}
            className={linkClass(location.pathname === '/change-password')}
          >
            <Lock size={20} />
            <span className="font-medium">Change Password</span>
          </Link>
        </nav>

        {/* User */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center font-bold">
              {user?.name?.charAt(0)?.toUpperCase() || 'A'}
            </div>
            <div className="min-w-0">
              <p className="font-medium text-sm truncate">{user?.name}</p>
              <p className="text-xs text-gray-400 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>
    </>
  );
}
