import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, FileText, CreditCard, User, Calendar, ArrowRight } from 'lucide-react';

export default function UserDashboard() {
  const { user } = useAuth();

  const quickActions = [
    { icon: Heart, title: 'Make a Donation', desc: 'Support our initiatives', path: '/donate', color: 'from-orange-500 to-red-500' },
    { icon: FileText, title: 'Apply for Support', desc: 'Submit an application', path: '/our-work', color: 'from-blue-500 to-cyan-500' },
    { icon: User, title: 'Become Volunteer', desc: 'Join our team', path: '/volunteer', color: 'from-green-500 to-emerald-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-[#0d2c54] to-[#1a4a8a] py-12 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold">Welcome, {user?.name || 'User'}!</h1>
            <p className="text-gray-300 mt-2">Here's your dashboard overview</p>
          </motion.div>
        </div>
      </section>

      <section className="py-10 px-6 -mt-8">
        <div className="max-w-6xl mx-auto">
          {/* Profile Card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white text-3xl font-bold">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#0d2c54]">{user?.name}</h2>
                <p className="text-gray-500">{user?.email}</p>
                <p className="text-sm text-gray-400 mt-1">Role: {user?.role || 'USER'}</p>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {quickActions.map(({ icon: Icon, title, desc, path, color }) => (
              <motion.div key={title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -4 }}>
                <Link to={path} className="block bg-white rounded-2xl shadow-lg p-6 border hover:shadow-xl transition">
                  <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-[#0d2c54]">{title}</h3>
                  <p className="text-gray-500 text-sm">{desc}</p>
                  <span className="inline-flex items-center gap-1 text-orange-500 font-semibold text-sm mt-3">
                    Go <ArrowRight size={14} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border">
            <h3 className="font-bold text-xl text-[#0d2c54] mb-4 flex items-center gap-2">
              <Calendar size={20} /> Recent Activity
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center"><Heart size={18} className="text-green-600" /></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">Account Created</p>
                  <p className="text-sm text-gray-500">Welcome to Sihaniwala Foundation!</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center"><FileText size={18} className="text-blue-600" /></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">Profile Verified</p>
                  <p className="text-sm text-gray-500">Your email has been verified</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
