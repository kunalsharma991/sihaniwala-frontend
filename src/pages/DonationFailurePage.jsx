import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { XCircle, Home, ArrowRight, RefreshCw } from 'lucide-react';

export default function DonationFailurePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 py-12 px-6">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-lg text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }} className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle size={48} className="text-white" />
        </motion.div>
        <h1 className="text-4xl font-bold text-[#0d2c54]">Payment Failed</h1>
        <p className="text-xl text-red-600 font-semibold mt-2">Donation Unsuccessful</p>
        <p className="text-gray-600 mt-4">
          We couldn't process your donation. This could be due to insufficient funds,
          incorrect card details, or a network issue. Please try again.
        </p>
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
          <p className="text-gray-700 font-medium">Need help?</p>
          <p className="text-gray-500 text-sm mt-1">Contact us at sihaniwalafoundation@gmail.com</p>
        </div>
        <div className="flex gap-4 justify-center mt-8">
          <Link to="/" className="flex items-center gap-2 bg-[#0d2c54] text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition">
            <Home size={18} /> Home
          </Link>
          <Link to="/donate" className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition">
            <RefreshCw size={18} /> Try Again
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
