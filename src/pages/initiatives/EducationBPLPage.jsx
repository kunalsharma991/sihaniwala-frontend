import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { BookOpen, Send, Upload, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { initiativeService } from '../../services';

export default function EducationBPLPage() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await initiativeService.submitEducation(data);
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
      <section className="bg-gradient-to-br from-purple-500 to-violet-600 py-20 text-white text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto px-6">
          <BookOpen size={48} className="mx-auto mb-4" />
          <h1 className="text-5xl md:text-6xl font-bold">Education For BPL</h1>
          <p className="text-purple-100 mt-4 text-lg">Sponsoring education for children from below-poverty-line families</p>
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
              <p className="text-gray-500 mt-2">Your education support application has been submitted successfully. Our team will review it and get in touch with you soon.</p>
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                <button type="button" onClick={() => setSubmitted(false)} className="bg-gradient-to-r from-purple-500 to-violet-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg transition">Submit another application</button>
                <Link to="/" className="border-2 border-[#0d2c54] text-[#0d2c54] px-6 py-2.5 rounded-xl font-semibold hover:bg-[#0d2c54] hover:text-white transition">Go to Home</Link>
              </div>
            </div>
          ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-[#0d2c54] mb-6">Student Registration Form</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <h3 className="font-bold text-lg text-[#0d2c54] border-b pb-2">Student Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Student Name *</label>
                  <input type="text" {...register('studentName', { required: 'Required' })} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none" />
                  {errors.studentName && <p className="text-red-500 text-xs mt-1">{errors.studentName.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Date of Birth *</label>
                  <input type="date" {...register('dob', { required: 'Required' })} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none" />
                  {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob.message}</p>}
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Class/Grade *</label>
                  <input type="text" {...register('grade', { required: 'Required' })} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none" placeholder="e.g., Class 8" />
                  {errors.grade && <p className="text-red-500 text-xs mt-1">{errors.grade.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Category *</label>
                  <select {...register('category', { required: 'Required' })} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none">
                    <option value="">Select Category</option>
                    <option>SC</option>
                    <option>ST</option>
                    <option>OBC</option>
                    <option>General (BPL)</option>
                    <option>Other</option>
                  </select>
                  {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
                </div>
              </div>

              <h3 className="font-bold text-lg text-[#0d2c54] border-b pb-2 mt-6">School Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">School Name *</label>
                  <input type="text" {...register('schoolName', { required: 'Required' })} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none" />
                  {errors.schoolName && <p className="text-red-500 text-xs mt-1">{errors.schoolName.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">School Address</label>
                  <input type="text" {...register('schoolAddress')} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Guardian Name *</label>
                  <input type="text" {...register('guardianName', { required: 'Required' })} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none" />
                  {errors.guardianName && <p className="text-red-500 text-xs mt-1">{errors.guardianName.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Phone *</label>
                  <input type="tel" {...register('phone', { required: 'Required' })} className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none" />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>
              </div>

              <h3 className="font-bold text-lg text-[#0d2c54] border-b pb-2 mt-6">Document Upload</h3>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">BPL Certificate *</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-purple-500 transition">
                  <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                  <input type="file" {...register('bplCertificate')} className="w-full text-sm" accept=".pdf,.jpg,.png" />
                  <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG (max 5MB)</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Previous Marksheet</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-purple-500 transition">
                  <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                  <input type="file" {...register('marksheet')} className="w-full text-sm" accept=".pdf,.jpg,.png" />
                  <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG (max 5MB)</p>
                </div>
              </div>

              <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-purple-500 to-violet-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                <Send size={18} /> {loading ? 'Submitting...' : 'Apply for Education Support'}
              </button>
            </form>
          </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
