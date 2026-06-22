import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Wallet, Send, Upload } from 'lucide-react';
import { toast } from 'react-toastify';
import { initiativeService } from '../../services';

export default function FinancialHelpPage() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await initiativeService.submitFinancial(data);
      toast.success('Financial help application submitted successfully!');
      reset();
    } catch {
      toast.error('Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-orange-500 to-amber-500 py-20 text-white text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto px-6">
          <Wallet size={48} className="mx-auto mb-4" />
          <h1 className="text-5xl md:text-6xl font-bold">Financial Help</h1>
          <p className="text-orange-100 mt-4 text-lg">Direct financial assistance for families facing extreme hardship</p>
        </motion.div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-[#0d2c54] mb-6">Financial Assistance Application</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
                  <input type="text" {...register('fullName', { required: 'Required' })} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none" />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Phone *</label>
                  <input type="tel" {...register('phone', { required: 'Required' })} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none" />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                  <input type="email" {...register('email')} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Required Amount (INR) *</label>
                  <input type="number" {...register('requiredAmount', { required: 'Required' })} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Amount needed" />
                  {errors.requiredAmount && <p className="text-red-500 text-xs mt-1">{errors.requiredAmount.message}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Annual Family Income</label>
                <input type="number" {...register('annualIncome')} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Annual income in INR" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Justification / Reason *</label>
                <textarea rows="5" {...register('justification', { required: 'Required' })} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Explain why you need financial assistance..." />
                {errors.justification && <p className="text-red-500 text-xs mt-1">{errors.justification.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Bank Account Details</label>
                <input type="text" {...register('bankDetails')} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Bank name, Account number, IFSC" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Justification Letter</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-orange-500 transition">
                    <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                    <input type="file" {...register('justificationLetter')} className="w-full text-sm" accept=".pdf,.jpg,.png" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Bank Statement</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-orange-500 transition">
                    <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                    <input type="file" {...register('bankStatement')} className="w-full text-sm" accept=".pdf,.jpg,.png" />
                  </div>
                </div>
              </div>
              <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                <Send size={18} /> {loading ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
