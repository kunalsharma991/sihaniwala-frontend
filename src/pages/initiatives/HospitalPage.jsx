import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Hospital, Send, AlertTriangle } from 'lucide-react';
import { toast } from 'react-toastify';
import { initiativeService } from '../../services';

export default function HospitalPage() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await initiativeService.submitHospital(data);
      toast.success('Hospital assistance request submitted successfully!');
      reset();
    } catch {
      toast.error('Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-blue-600 to-cyan-600 py-20 text-white text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto px-6">
          <Hospital size={48} className="mx-auto mb-4" />
          <h1 className="text-5xl md:text-6xl font-bold">Hospital Assistance</h1>
          <p className="text-blue-100 mt-4 text-lg">Providing quality healthcare support to those who need it most</p>
        </motion.div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-[#0d2c54] mb-6">Patient Intake Form</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Patient Name *</label>
                  <input type="text" {...register('patientName', { required: 'Required' })} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Full name" />
                  {errors.patientName && <p className="text-red-500 text-xs mt-1">{errors.patientName.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Age *</label>
                  <input type="number" {...register('age', { required: 'Required' })} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Age" />
                  {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age.message}</p>}
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Phone *</label>
                  <input type="tel" {...register('phone', { required: 'Required' })} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Contact number" />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                  <input type="email" {...register('email')} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Email address" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Hospital Name</label>
                <input type="text" {...register('hospitalName')} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Hospital name" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Medical Issue Details *</label>
                <textarea rows="4" {...register('medicalIssue', { required: 'Required' })} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Describe the medical condition in detail..." />
                {errors.medicalIssue && <p className="text-red-500 text-xs mt-1">{errors.medicalIssue.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Emergency Priority Level *</label>
                <select {...register('priority', { required: 'Required' })} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none">
                  <option value="">Select Priority</option>
                  <option value="LOW">Low - Routine Checkup</option>
                  <option value="MEDIUM">Medium - Requires Attention</option>
                  <option value="HIGH">High - Urgent Care Needed</option>
                  <option value="EMERGENCY">Emergency - Critical Condition</option>
                </select>
                {errors.priority && <p className="text-red-500 text-xs mt-1">{errors.priority.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Estimated Cost Required</label>
                <input type="number" {...register('estimatedCost')} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Amount in INR" />
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3">
                <AlertTriangle size={20} className="text-yellow-600 shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-700">All applications are reviewed by our medical team. Emergency cases are prioritized. You will be contacted within 24-48 hours.</p>
              </div>
              <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                <Send size={18} /> {loading ? 'Submitting...' : 'Submit Request'}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
