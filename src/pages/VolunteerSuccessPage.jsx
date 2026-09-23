import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, User, Phone, Mail, MapPin, Heart, Home } from 'lucide-react';

export default function VolunteerSuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d2c54] to-[#1a4a7a] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8">

        {/* Success Icon */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-green-100 rounded-full p-4 mb-3">
            <CheckCircle size={48} className="text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-[#0d2c54] text-center">Application Submitted!</h1>
          <p className="text-gray-500 text-center text-sm mt-1">Thank you for joining Sihaniwala Foundation</p>
        </div>

        {/* Receipt Card */}
        <div className="bg-gray-50 rounded-xl p-5 mb-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Heart size={18} className="text-orange-500" />
            <h2 className="font-bold text-[#0d2c54]">Volunteer Receipt</h2>
          </div>
          <div className="space-y-3">
            {data.name && (
              <div className="flex items-center gap-3">
                <User size={16} className="text-gray-400 shrink-0" />
                <div>
                  <p className="text-xs text-gray-400">Full Name</p>
                  <p className="font-semibold text-gray-700">{data.name}</p>
                </div>
              </div>
            )}
            {data.email && (
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-gray-400 shrink-0" />
                <div>
                  <p className="text-xs text-gray-400">Email</p>
                  <p className="font-semibold text-gray-700">{data.email}</p>
                </div>
              </div>
            )}
            {data.phone && (
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-gray-400 shrink-0" />
                <div>
                  <p className="text-xs text-gray-400">Phone</p>
                  <p className="font-semibold text-gray-700">{data.phone}</p>
                </div>
              </div>
            )}
            {data.city && (
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-gray-400 shrink-0" />
                <div>
                  <p className="text-xs text-gray-400">City</p>
                  <p className="font-semibold text-gray-700">{data.city}</p>
                </div>
              </div>
            )}
            {data.skills && (
              <div className="flex items-start gap-3">
                <CheckCircle size={16} className="text-gray-400 shrink-0 mt-1" />
                <div>
                  <p className="text-xs text-gray-400">Skills / Interests</p>
                  <p className="font-semibold text-gray-700">{data.skills}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
          <p className="text-sm text-orange-700 text-center">
            📞 Our team will contact you at <strong>{data.phone || 'your number'}</strong> within <strong>2-3 working days</strong>.
          </p>
        </div>

        {/* NGO Details */}
        <div className="text-center text-xs text-gray-400 mb-6">
          <p className="font-semibold text-[#0d2c54]">Sihaniwala Foundation Charitable Trust</p>
          <p>informsfct@gmail.com | +91-8750970075</p>
          <p>sihaniwalafoundation.org</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => window.print()}
            className="flex-1 border-2 border-[#0d2c54] text-[#0d2c54] py-2 rounded-xl font-semibold hover:bg-[#0d2c54] hover:text-white transition"
          >
            🖨️ Print Receipt
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex-1 bg-[#0d2c54] text-white py-2 rounded-xl font-semibold hover:bg-[#1a4a7a] transition flex items-center justify-center gap-2"
          >
            <Home size={16} /> Home
          </button>
        </div>
      </div>
    </div>
  );
}
