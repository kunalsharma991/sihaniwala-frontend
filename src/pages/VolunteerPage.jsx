import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { UserCheck, Send, Heart, Users, Award, Clock, Shield, Sparkles } from 'lucide-react';
import { toast } from 'react-toastify';
import { volunteerService } from '../services';

const whyVolunteer = [
  { icon: Heart, title: 'Make a Difference', desc: 'Directly impact lives and bring hope to underprivileged communities through your service.' },
  { icon: Users, title: 'Join a Community', desc: 'Become part of a passionate team of 200+ changemakers working towards social good.' },
  { icon: Award, title: 'Grow Your Skills', desc: 'Develop leadership, teamwork, and professional skills while serving the community.' },
  { icon: Clock, title: 'Flexible Timing', desc: 'Volunteer at your own pace — weekends, events, or ongoing programs that suit your schedule.' },
  { icon: Shield, title: 'Verified Experience', desc: 'Receive certificates and recognition for your contribution to social welfare.' },
  { icon: Sparkles, title: 'Inspire Others', desc: 'Be a role model and inspire your community to come together for a greater cause.' },
];

export default function VolunteerPage() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await volunteerService.submit(data);
      toast.success('Volunteer application submitted! We will contact you soon.');
      reset();
    } catch {
      toast.error('Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#0d2c54] via-[#0f3460] to-[#1a4a8a] py-24 text-white text-center overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative max-w-4xl mx-auto px-6">
          <span className="inline-block bg-orange-500/20 text-orange-300 text-xs font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-full border border-orange-500/30 mb-6">
            Join Our Mission
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Become a <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Volunteer</span>
          </h1>
          <p className="text-gray-300 mt-5 text-lg max-w-2xl mx-auto">
            Join our team of changemakers and help create a better tomorrow for communities in need.
          </p>
        </motion.div>
      </section>

      {/* Why Volunteer With Us */}
      <section className="py-20 px-6 bg-gray-50 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-40" />
        <div className="max-w-6xl mx-auto relative">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="text-orange-500 font-bold text-xs tracking-[0.2em] uppercase">Why Join Us</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0d2c54] mt-3">Why Volunteer With Us</h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-orange-500 to-amber-400 mx-auto mt-4 rounded-full" />
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyVolunteer.map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg shadow-orange-500/20">
                  <Icon size={26} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#0d2c54] mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Form */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#0d2c54 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="max-w-3xl mx-auto relative">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/20">
                <UserCheck size={32} className="text-white" />
              </div>
              <h2 className="text-3xl font-extrabold text-[#0d2c54]">Volunteer Application</h2>
              <p className="text-gray-500 mt-2">Fill in your details and we'll get in touch</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name *</label>
                  <input type="text" {...register('name', { required: 'Required' })}
                    className="w-full border border-gray-200 p-3.5 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition bg-gray-50 focus:bg-white" placeholder="Your full name" />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email *</label>
                  <input type="email" {...register('email', { required: 'Required' })}
                    className="w-full border border-gray-200 p-3.5 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition bg-gray-50 focus:bg-white" placeholder="you@example.com" />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone *</label>
                  <input type="tel" {...register('phone', { required: 'Required' })}
                    className="w-full border border-gray-200 p-3.5 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition bg-gray-50 focus:bg-white" placeholder="Phone number" />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Address</label>
                  <input type="text" {...register('city')}
                    className="w-full border border-gray-200 p-3.5 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition bg-gray-50 focus:bg-white" placeholder="Your city / area" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Skills</label>
                  <input type="text" {...register('skills')}
                    className="w-full border border-gray-200 p-3.5 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition bg-gray-50 focus:bg-white" placeholder="e.g. Teaching, Medical, Design" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Availability</label>
                  <select {...register('interest')}
                    className="w-full border border-gray-200 p-3.5 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition bg-gray-50 focus:bg-white">
                    <option>Weekends Only</option>
                    <option>Weekdays Only</option>
                    <option>Flexible / Any Time</option>
                    <option>Event-Based</option>
                    <option>Part-Time Regular</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Message *</label>
                <textarea rows="5" {...register('message', { required: 'Required' })}
                  className="w-full border border-gray-200 p-3.5 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition bg-gray-50 focus:bg-white resize-none" placeholder="Tell us why you want to volunteer..." />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
              </div>

              <button type="submit" disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-xl font-bold hover:shadow-xl hover:shadow-orange-500/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-lg">
                <Send size={20} /> {loading ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
