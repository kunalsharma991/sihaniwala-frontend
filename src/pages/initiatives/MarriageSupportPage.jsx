import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Heart, Send, Upload, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { initiativeService } from '../../services';

export default function MarriageSupportPage() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await initiativeService.submitMarriage(data);
      reset();
      setSubmitted(true);
    } catch {
      toast.error('Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-pink-500 to-rose-500 py-20 text-white text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto px-6">
          <Heart size={48} className="mx-auto mb-4" />
          <h1 className="text-5xl md:text-6xl font-bold">Marriage Support</h1>
          <p className="text-pink-100 mt-4 text-lg">Supporting families who cannot afford their daughters' wedding expenses</p>
        </motion.div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          {submitted ? (
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center" role="status" aria-live="polite">
              <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <CheckCircle size={34} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-[#0d2c54]">Application Received!</h2>
              <p className="text-gray-500 mt-2">Your marriage support application has been submitted successfully. Our team will review it and get in touch with you soon.</p>
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                <button type="button" onClick={() => setSubmitted(false)} className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg transition">Submit another application</button>
                <Link to="/" className="border-2 border-[#0d2c54] text-[#0d2c54] px-6 py-2.5 rounded-xl font-semibold hover:bg-[#0d2c54] hover:text-white transition">Go to Home</Link>
              </div>
            </div>
          ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-[#0d2c54] mb-6">Marriage Support Application</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <h3 className="font-bold text-lg text-[#0d2c54] border-b pb-2">Family Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Father/Guardian Name *</label>
                  <input type="text" {...register('guardianName', { required: 'Required' })} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none" />
                  {errors.guardianName && <p className="text-red-500 text-xs mt-1">{errors.guardianName.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Phone *</label>
                  <input type="tel" {...register('phone', { required: 'Required' })} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none" />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Annual Family Income *</label>
                  <input type="number" {...register('annualIncome', { required: 'Required' })} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none" placeholder="In INR" />
                  {errors.annualIncome && <p className="text-red-500 text-xs mt-1">{errors.annualIncome.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Address *</label>
                  <input type="text" {...register('address', { required: 'Required' })} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none" />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
                </div>
              </div>

              <h3 className="font-bold text-lg text-[#0d2c54] border-b pb-2 mt-6">Bride Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Bride's Name *</label>
                  <input type="text" {...register('brideName', { required: 'Required' })} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none" />
                  {errors.brideName && <p className="text-red-500 text-xs mt-1">{errors.brideName.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Bride's Age *</label>
                  <input type="number" {...register('brideAge', { required: 'Required', min: { value: 18, message: 'Must be 18+' } })} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none" />
                  {errors.brideAge && <p className="text-red-500 text-xs mt-1">{errors.brideAge.message}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Wedding Date</label>
                <input type="date" {...register('weddingDate')} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none" />
              </div>

              <h3 className="font-bold text-lg text-[#0d2c54] border-b pb-2 mt-6">Document Upload</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Income Certificate</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-pink-500 transition">
                    <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                    <input type="file" {...register('incomeCertificate')} className="w-full text-sm" accept=".pdf,.jpg,.png" />
                    <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG (max 5MB)</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Aadhaar / ID Proof</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-pink-500 transition">
                    <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                    <input type="file" {...register('idProof')} className="w-full text-sm" accept=".pdf,.jpg,.png" />
                    <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG (max 5MB)</p>
                  </div>
                </div>
              </div>

              <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                <Send size={18} /> {loading ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
