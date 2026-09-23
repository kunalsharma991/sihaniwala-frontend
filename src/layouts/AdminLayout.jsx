import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import AdminSidebar from '../components/admin/AdminSidebar';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close the off-canvas sidebar with Escape and lock background scroll while open.
  useEffect(() => {
    if (!sidebarOpen) return undefined;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSidebarOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Mobile / tablet top bar with menu toggle */}
      <header className="lg:hidden sticky top-0 z-30 flex items-center gap-3 bg-[#0d2c54] text-white px-4 py-3 shadow">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={sidebarOpen}
          aria-controls="admin-sidebar"
          className="p-2 rounded-lg hover:bg-white/10 transition"
        >
          <Menu size={22} />
        </button>
        <span className="font-bold text-lg">Admin Panel</span>
      </header>

      <main className="lg:ml-64 p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}
