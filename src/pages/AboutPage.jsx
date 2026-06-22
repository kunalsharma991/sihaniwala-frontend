import { motion } from 'framer-motion';
import { Heart, Users, Target, Award, Eye, Shield, Sparkles, HandHeart } from 'lucide-react';
import founderImg from '../assets/images/founder.jpg.jpeg';

const fadeInUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

const coreValues = [
  { icon: Heart, title: 'Compassion', desc: 'Serving with love and empathy for all individuals regardless of background.' },
  { icon: Shield, title: 'Transparency', desc: 'Fully accountable and honest in all our operations and governance.' },
  { icon: HandHeart, title: 'Service', desc: 'Dedicated selfless service to communities in need.' },
  { icon: Users, title: 'Equality', desc: 'Equal opportunities and dignity for everyone.' },
  { icon: Sparkles, title: 'Community', desc: 'Building stronger, self-reliant communities together.' },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero Banner */}
      <section className="relative bg-[#0d2c54] py-24 text-white text-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-72 h-72 bg-orange-500/8 rounded-full blur-[100px]" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-400/6 rounded-full blur-[120px]" />
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto px-6 relative z-10">
          <span className="inline-block text-orange-400 font-bold text-xs tracking-[0.2em] uppercase bg-orange-500/10 px-4 py-1.5 rounded-full border border-orange-500/20">Know Our Story</span>
          <h1 className="text-5xl md:text-6xl font-extrabold mt-4 leading-tight">About Us</h1>
          <p className="text-gray-300/80 mt-4 text-lg max-w-xl mx-auto">Dedicated to serving humanity with compassion and dignity</p>
        </motion.div>
      </section>

      {/* About Content */}
      <section className="py-20 px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-4xl mx-auto text-center">
          <motion.div variants={fadeInUp}>
            <span className="inline-block text-orange-500 font-bold text-xs tracking-[0.2em] uppercase bg-orange-50 px-4 py-1.5 rounded-full">Who We Are</span>
            <h2 className="text-4xl font-extrabold text-[#0d2c54] mt-4">About Sihaniwala Foundation</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mt-4 rounded-full" />
          </motion.div>
          <motion.p variants={fadeInUp} className="text-gray-600 mt-8 text-lg leading-relaxed max-w-3xl mx-auto">
            Sihaniwala Foundation is a charitable trust dedicated to supporting underprivileged communities through
            healthcare, education, food distribution, social welfare, emergency relief, and community development initiatives.
            We believe in the power of collective compassion and work tirelessly to bring hope and dignity to those who need it most.
          </motion.p>
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50 px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
          <motion.div variants={fadeInUp} className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow">
            <div className="w-14 h-14 bg-gradient-to-br from-[#0d2c54] to-blue-700 rounded-xl flex items-center justify-center mb-5 shadow-lg shadow-blue-500/20">
              <Target size={28} className="text-white" />
            </div>
            <h2 className="text-3xl font-extrabold text-[#0d2c54] mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To create a compassionate and self-reliant society where every individual has access to dignity, opportunity, healthcare, and education.
              We strive to provide essential services including healthcare, education, financial assistance, and social welfare to underprivileged communities.
            </p>
          </motion.div>
          <motion.div variants={fadeInUp} className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-5 shadow-lg shadow-orange-500/20">
              <Eye size={28} className="text-white" />
            </div>
            <h2 className="text-3xl font-extrabold text-[#0d2c54] mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              To become a leading charitable organization committed to sustainable social impact and human welfare.
              We envision a world where compassion drives action and no one is left behind regardless of their socio-economic background.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-6xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-14">
            <span className="inline-block text-orange-500 font-bold text-xs tracking-[0.2em] uppercase bg-orange-50 px-4 py-1.5 rounded-full">What Drives Us</span>
            <h2 className="text-4xl font-extrabold text-[#0d2c54] mt-4">Our Core Values</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mt-4 rounded-full" />
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {coreValues.map(({ icon: Icon, title, desc }) => (
              <motion.div key={title} variants={fadeInUp} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-[#0d2c54] to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-500/20 transition-all">
                  <Icon size={26} className="text-white" />
                </div>
                <h3 className="font-bold text-[#0d2c54] text-sm">{title}</h3>
                <p className="text-gray-500 text-xs mt-1.5 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Founder Section */}
      <section className="py-24 bg-gray-50 px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-5xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <span className="inline-block text-orange-500 font-bold text-xs tracking-[0.2em] uppercase bg-orange-50 px-4 py-1.5 rounded-full">Leadership</span>
            <h2 className="text-4xl font-extrabold text-[#0d2c54] mt-4">Our Founder</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mt-4 rounded-full" />
          </motion.div>
          <motion.div variants={fadeInUp} className="flex flex-col md:flex-row items-center gap-12 bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
            <div className="shrink-0">
              <div className="relative">
                <div className="absolute -inset-3 bg-gradient-to-br from-orange-500/10 to-blue-500/10 rounded-3xl blur-xl" />
                <img src={founderImg} alt="Founder" className="relative w-48 h-48 rounded-2xl object-cover shadow-2xl ring-4 ring-orange-500/20" />
              </div>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-extrabold text-[#0d2c54]">Founder&apos;s Message</h3>
              <p className="text-orange-500 font-semibold mt-1">Sihaniwala Foundation Charitable Trust</p>
              <p className="text-gray-600 mt-5 leading-relaxed">
                The foundation was established with a vision to serve the most vulnerable sections
                of society. Our founder believed that true happiness comes from serving others and
                that every act of kindness, no matter how small, can create ripples of positive change
                across communities and generations.
              </p>
              <blockquote className="mt-5 p-4 bg-[#0d2c54]/5 rounded-xl border-l-4 border-orange-500 italic text-gray-600">
                &ldquo;सेवा ही धर्म है, करुणा ही जीवन है&rdquo; — Service is duty, compassion is life.
              </blockquote>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
