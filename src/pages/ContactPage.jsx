import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock, Globe } from 'lucide-react';
import { toast } from 'react-toastify';
import { contactService } from '../services';
import { useState } from 'react';

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'sihaniwalafoundation@gmail.com', href: 'mailto:sihaniwalafoundation@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+91 8750970075', href: 'tel:+918750970075' },
  { icon: MapPin, label: 'Address', value: 'Raj Nagar Extension, Ghaziabad, Uttar Pradesh, India', href: null },
  { icon: Clock, label: 'Working Hours', value: 'Mon - Sat: 9:00 AM - 6:00 PM', href: null },
];

export default function ContactPage() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await contactService.submit(data);
      toast.success('Message sent successfully! We will get back to you soon.');
      reset();
    } catch {
      toast.error('Failed to send message. Please try again later.');
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
            Get In Touch
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Us</span>
          </h1>
          <p className="text-gray-300 mt-5 text-lg max-w-2xl mx-auto">
            We'd love to hear from you. Reach out for partnerships, volunteering, or any queries.
          </p>
        </motion.div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map(({ icon: Icon, label, value, href }, i) => (
              <motion.div key={label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-orange-500/20">
                  <Icon size={24} className="text-white" />
                </div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</p>
                {href ? (
                  <a href={href} className="text-[#0d2c54] font-semibold text-sm hover:text-orange-500 transition-colors">{value}</a>
                ) : (
                  <p className="text-[#0d2c54] font-semibold text-sm">{value}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map + Form */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#0d2c54 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 relative">
          {/* Map Placeholder */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="bg-[#0d2c54] rounded-3xl overflow-hidden shadow-2xl min-h-[500px] relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0d2c54] to-[#1a4a8a] flex flex-col items-center justify-center text-white p-8">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-6">
                <MapPin size={40} className="text-orange-400" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Find Us Here</h3>
              <p className="text-gray-300 text-center text-sm mb-6">Raj Nagar Extension, Ghaziabad<br />Uttar Pradesh, India</p>
              <a href="https://maps.google.com/?q=Raj+Nagar+Extension+Ghaziabad" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl">
                <Globe size={18} /> Open in Google Maps
              </a>
            </div>
            {/* Decorative elements */}
            <div className="absolute top-6 right-6 w-24 h-24 border-2 border-white/10 rounded-full" />
            <div className="absolute bottom-6 left-6 w-16 h-16 border-2 border-orange-500/20 rounded-full" />
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100">
              <div className="mb-8">
                <h2 className="text-3xl font-extrabold text-[#0d2c54]">Send a Message</h2>
                <p className="text-gray-500 mt-2">Fill the form below and we'll respond within 24 hours</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Name *</label>
                    <input type="text" {...register('name', { required: 'Required' })}
                      className="w-full border border-gray-200 p-3.5 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition bg-gray-50 focus:bg-white" placeholder="Your name" />
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
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone</label>
                    <input type="tel" {...register('phone')}
                      className="w-full border border-gray-200 p-3.5 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition bg-gray-50 focus:bg-white" placeholder="Phone number" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Subject *</label>
                    <input type="text" {...register('subject', { required: 'Required' })}
                      className="w-full border border-gray-200 p-3.5 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition bg-gray-50 focus:bg-white" placeholder="Message subject" />
                    {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Message *</label>
                  <textarea rows="5" {...register('message', { required: 'Required' })}
                    className="w-full border border-gray-200 p-3.5 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition bg-gray-50 focus:bg-white resize-none" placeholder="Your message..." />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                </div>

                <button type="submit" disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-xl font-bold hover:shadow-xl hover:shadow-orange-500/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-lg">
                  <Send size={20} /> {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
