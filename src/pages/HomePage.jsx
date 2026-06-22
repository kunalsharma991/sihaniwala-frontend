import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ArrowRight, Users, HandHeart, GraduationCap, Hospital, Truck, BookOpen, Wallet, School, Star, Sparkles, Shield } from "lucide-react";
import { useScrollAnimation, useCountUp } from "../hooks/useScrollAnimation";
import founderImg from "../assets/images/founder.jpg.jpeg";
import heroBgImg from "../assets/images/hero-bg.jpg";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const initiatives = [
  { name: "Hospital Assistance", desc: "Providing healthcare support, medicines, treatment assistance, and emergency medical help to underprivileged families.", icon: Hospital, color: "from-blue-500 to-cyan-500", path: "/initiatives/hospital" },
  { name: "Marriage Support", desc: "Supporting daughters from economically weaker families with marriage assistance and social welfare programs.", icon: Heart, color: "from-pink-500 to-rose-500", path: "/initiatives/marriage-support" },
  { name: "Water Supply Initiative", desc: "Providing clean drinking water and water distribution support in rural and needy communities.", icon: Truck, color: "from-green-500 to-emerald-500", path: "/initiatives/water-spray" },
  { name: "Education Support", desc: "Educational assistance, books, uniforms, scholarships, and learning opportunities for children from BPL families.", icon: BookOpen, color: "from-purple-500 to-violet-500", path: "/initiatives/education-bpl" },
  { name: "Financial Assistance", desc: "Emergency financial support for families facing severe economic hardship and crisis situations.", icon: Wallet, color: "from-orange-500 to-amber-500", path: "/initiatives/financial-help" },
  { name: "School Adoption Program", desc: "Improving school infrastructure, educational facilities, and student development programs.", icon: School, color: "from-teal-500 to-cyan-500", path: "/initiatives/school-adoption" },
];

const coreValues = [
  { icon: Heart, title: "Compassion", desc: "We serve with love, empathy and respect for every individual." },
  { icon: Shield, title: "Transparency", desc: "Accountable and honest in all our operations and governance." },
  { icon: HandHeart, title: "Service", desc: "Dedicated selfless service to communities in need." },
  { icon: Users, title: "Equality", desc: "Equal opportunities and dignity for all regardless of background." },
  { icon: Sparkles, title: "Community Development", desc: "Building stronger, self-reliant communities together." },
];

function StatCard({ value, label, suffix = "+" }) {
  const { ref, count } = useCountUp(value);
  return (
    <div ref={ref} className="text-center group">
      <div className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
        {count}{suffix}
      </div>
      <p className="text-blue-200/80 mt-2 text-sm font-medium tracking-wide">{label}</p>
    </div>
  );
}

export default function HomePage() {
  const { ref: initRef, isVisible: initVisible } = useScrollAnimation();

  return (
    <div>
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#0d2c54]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img src={heroBgImg} alt="" className="w-full h-full object-cover opacity-10" />
        </div>
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-80 h-80 bg-orange-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-blue-400/8 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-orange-500/5 rounded-full blur-[80px]" />
        </div>
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 items-center gap-16 py-20 relative z-10">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-orange-500/15 backdrop-blur-sm border border-orange-500/20 rounded-full px-5 py-2 mb-6"
            >
              <Star size={14} className="text-orange-400" />
              <span className="text-orange-400 font-semibold text-sm tracking-wide">Welcome to Sihaniwala Foundation</span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1]">
              BUILDING A{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                BETTER
              </span>{" "}
              TOMORROW
            </h1>
            <h2 className="text-3xl md:text-4xl font-extrabold text-orange-400 mt-2">
              FOR HUMANITY
            </h2>
            <p className="mt-6 text-gray-300/90 text-lg leading-relaxed max-w-lg">
              Sihaniwala Foundation Charitable Trust is committed to transforming lives through
              compassion, service and equality. Join us in making a difference.
            </p>

            {/* Hindi Quote */}
            <div className="mt-6 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 max-w-md">
              <p className="text-orange-300 italic text-lg font-medium">
                &ldquo;सेवा ही धर्म है, करुणा ही जीवन है&rdquo;
              </p>
              <p className="text-gray-400 text-sm mt-1">— Service is duty, compassion is life</p>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                to="/donate"
                className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full font-bold hover:shadow-2xl hover:shadow-orange-500/30 hover:scale-[1.03] active:scale-[0.98] transition-all text-sm"
              >
                <Heart size={18} className="fill-current" /> Donate Now
              </Link>
              <Link
                to="/volunteer"
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/25 text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-all text-sm"
              >
                Become Volunteer <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>

          {/* Right - Founder Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex justify-center"
          >
            <div className="relative">
              {/* Decorative rings */}
              <div className="absolute -inset-6 bg-gradient-to-br from-orange-500/10 to-blue-500/10 rounded-[2rem] blur-2xl" />
              <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-orange-500/20 rounded-2xl" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border-2 border-blue-500/20 rounded-2xl" />

              <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/15 shadow-2xl">
                <img
                  src={founderImg}
                  alt="Sihaniwala Foundation Founder"
                  className="w-80 h-96 object-cover rounded-2xl shadow-xl"
                />
                <div className="mt-5 text-center">
                  <h3 className="text-white font-bold text-xl">Sihaniwala Foundation</h3>
                  <p className="text-orange-400 text-sm mt-1 font-medium">Serving Humanity Since Establishment</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== IMPACT STATS ===== */}
      <section className="relative bg-gradient-to-r from-[#0d2c54] via-[#0f3460] to-[#1a4a8a] py-16 -mt-1 overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
          <StatCard value={500} label="Families Supported" />
          <StatCard value={1000} label="Meals Distributed" />
          <StatCard value={200} label="Volunteers Joined" />
          <StatCard value={50} label="Social Projects" />
        </div>
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <section className="py-24 px-6 bg-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-14">
            <span className="inline-block text-orange-500 font-bold text-xs tracking-[0.2em] uppercase bg-orange-50 px-4 py-1.5 rounded-full">Who We Are</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0d2c54] mt-4">About Sihaniwala Foundation</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mt-4 rounded-full" />
          </motion.div>

          <motion.p variants={fadeInUp} className="text-lg text-gray-600 text-center max-w-3xl mx-auto leading-relaxed mb-6">
            Sihaniwala Foundation is a charitable trust dedicated to supporting underprivileged communities through
            healthcare, education, food distribution, social welfare, emergency relief, and community development initiatives.
          </motion.p>

          <motion.div variants={fadeInUp} className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="bg-gradient-to-br from-[#0d2c54] to-blue-800 text-white p-8 rounded-2xl shadow-xl">
              <div className="w-14 h-14 bg-orange-500/20 rounded-xl flex items-center justify-center mb-4">
                <HandHeart size={28} className="text-orange-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Our Mission</h3>
              <p className="text-blue-100/80 leading-relaxed">
                To create a compassionate and self-reliant society where every individual has access to dignity, opportunity, healthcare, and education.
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-8 rounded-2xl shadow-xl">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <Sparkles size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Our Vision</h3>
              <p className="text-white/85 leading-relaxed">
                To become a leading charitable organization committed to sustainable social impact and human welfare.
              </p>
            </div>
          </motion.div>

          {/* Core Values */}
          <motion.div variants={fadeInUp} className="mt-16">
            <h3 className="text-2xl font-bold text-[#0d2c54] text-center mb-10">Core Values</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {coreValues.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#0d2c54] to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 group-hover:shadow-lg transition-all">
                    <Icon size={26} className="text-white" />
                  </div>
                  <h4 className="font-bold text-[#0d2c54] text-sm">{title}</h4>
                  <p className="text-gray-500 text-xs mt-1 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ===== INITIATIVES SECTION ===== */}
      <section className="py-24 bg-gray-50">
        <motion.div
          ref={initRef}
          initial="hidden"
          animate={initVisible ? "visible" : "hidden"}
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-6"
        >
          <motion.div variants={fadeInUp} className="text-center mb-14">
            <span className="inline-block text-orange-500 font-bold text-xs tracking-[0.2em] uppercase bg-orange-50 px-4 py-1.5 rounded-full">What We Do</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0d2c54] mt-4">Our Initiatives</h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
              We work for a better and stronger society through targeted initiatives that create lasting impact.
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {initiatives.map(({ name, desc, icon: Icon, color, path }) => (
              <motion.div key={name} variants={fadeInUp}>
                <Link to={path} className="group block h-full">
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-1 h-full flex flex-col">
                    <div className={`w-14 h-14 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:shadow-lg transition-all`}>
                      <Icon size={26} className="text-white" />
                    </div>
                    <h3 className="font-bold text-lg text-[#0d2c54] mb-2">{name}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed flex-1">{desc}</p>
                    <span className="inline-flex items-center gap-1.5 text-orange-500 font-bold text-sm mt-5 group-hover:gap-3 transition-all">
                      Learn More <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="relative py-28 bg-[#0d2c54] overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/8 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-400/8 rounded-full blur-[120px]" />
        </div>
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '25px 25px' }} />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto px-6 text-center relative z-10"
        >
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Make a Difference Today
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-gray-300/80 text-lg mt-5 max-w-2xl mx-auto leading-relaxed">
            Your small contribution can change someone&apos;s life forever. Join hands with us to build
            a brighter future for those in need.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4 mt-10">
            <Link
              to="/donate"
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-10 py-4 rounded-full font-bold hover:shadow-2xl hover:shadow-orange-500/30 hover:scale-[1.03] transition-all"
            >
              <Heart size={20} className="fill-current" /> Donate Now
            </Link>
            <Link
              to="/volunteer"
              className="flex items-center gap-2 bg-white text-[#0d2c54] px-10 py-4 rounded-full font-bold hover:shadow-xl hover:scale-[1.03] transition-all"
            >
              Become a Volunteer <ArrowRight size={20} />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
