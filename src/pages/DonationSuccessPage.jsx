import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Heart, Home, ArrowRight, Loader, AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { donationService } from '../services';

export default function DonationSuccessPage() {
  const [processing, setProcessing] = useState(false);
  const [captured, setCaptured] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Handle PayPal return — capture the order
    const paypalOrderId = sessionStorage.getItem('paypalOrderId');
    if (paypalOrderId && !captured) {
      setProcessing(true);
      donationService.capturePaypalOrder(paypalOrderId)
        .then(({ data }) => {
          if (data.data?.status === 'SUCCESS') {
            setCaptured(true);
            toast.success('Donation successful! Thank you for your generosity.');
          } else {
            setError(true);
            toast.error('Payment could not be completed. Please contact support.');
          }
        })
        .catch((err) => {
          console.error('PayPal capture failed:', err);
          setError(true);
          toast.error(err.response?.data?.message || 'Payment capture failed. Please contact support.');
        })
        .finally(() => {
          sessionStorage.removeItem('paypalOrderId');
          setProcessing(false);
        });
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50 py-12 px-6">
      {processing ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <Loader size={48} className="animate-spin text-orange-500 mx-auto mb-4" />
          <p className="text-lg font-semibold text-[#0d2c54]">Confirming your payment...</p>
          <p className="text-gray-500 text-sm mt-1">Please wait, this may take a moment.</p>
        </motion.div>
      ) : error ? (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-lg text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }} className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle size={48} className="text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold text-[#0d2c54]">Payment Issue</h1>
          <p className="text-xl text-red-600 font-semibold mt-2">Could Not Confirm Payment</p>
          <p className="text-gray-600 mt-4">
            There was an issue confirming your payment. Please contact our support team with your order details.
          </p>
          <div className="flex gap-4 justify-center mt-8">
            <Link to="/" className="flex items-center gap-2 bg-[#0d2c54] text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition">
              <Home size={18} /> Home
            </Link>
            <Link to="/contact" className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition">
              Contact Support <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-lg text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }} className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} className="text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold text-[#0d2c54]">Thank You!</h1>
          <p className="text-xl text-green-600 font-semibold mt-2">Donation Successful</p>
          <p className="text-gray-600 mt-4">
            Your generous donation has been received. A confirmation receipt has been sent to your email.
            Together, we're making a difference!
          </p>
          <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
            <Heart size={32} className="mx-auto text-orange-500 mb-3" />
            <p className="text-gray-700 font-medium">"No one has ever become poor by giving."</p>
            <p className="text-gray-500 text-sm mt-1">- Anne Frank</p>
          </div>
          <div className="flex gap-4 justify-center mt-8">
            <Link to="/" className="flex items-center gap-2 bg-[#0d2c54] text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition">
              <Home size={18} /> Home
            </Link>
            <Link to="/donate" className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition">
              Donate Again <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}
