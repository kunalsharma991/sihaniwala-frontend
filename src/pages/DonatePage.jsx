import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Heart, IndianRupee, DollarSign, Euro, CheckCircle, Utensils, BookOpen, Stethoscope, Users, Shield, Lock, Globe, CreditCard } from 'lucide-react';
import { toast } from 'react-toastify';
import { donationService } from '../services';

const presetAmounts = [500, 1000, 2000, 5000, 10000, 25000];
const initiatives = [
  'General Fund', 'Hospital Assistance', 'Marriage Support', 'Water Spray Truck',
  'Education For BPL', 'Financial Help', 'School Adoption'
];

const donationCategories = [
  { icon: Utensils, title: 'Support Meals', desc: '₹500 feeds a family for a week', impact: '1000+ meals served monthly', color: 'from-orange-500 to-amber-500' },
  { icon: BookOpen, title: 'Support Education', desc: '₹2000 sponsors a child\'s monthly education', impact: '200+ students enrolled', color: 'from-blue-500 to-indigo-500' },
  { icon: Stethoscope, title: 'Sponsor Healthcare', desc: '₹5000 funds a medical camp visit', impact: '500+ patients treated monthly', color: 'from-green-500 to-emerald-500' },
  { icon: Users, title: 'Community Welfare', desc: '₹10000 supports a family\'s livelihood', impact: '300+ families empowered', color: 'from-purple-500 to-violet-500' },
];

const paypalCurrencies = ['USD', 'EUR', 'GBP', 'AUD', 'CAD'];

export default function DonatePage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [amount, setAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState('');
  const [currency, setCurrency] = useState('INR');
  const [initiative, setInitiative] = useState('General Fund');
  const [anonymous, setAnonymous] = useState(false);
  const [recurring, setRecurring] = useState(false);
  const [step, setStep] = useState(1);
  const [donorData, setDonorData] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [loading, setLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  const finalAmount = customAmount ? parseInt(customAmount) : amount;

  // Load Razorpay script dynamically
  useEffect(() => {
    if (step === 2 && paymentMethod === 'razorpay' && !razorpayLoaded) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => setRazorpayLoaded(true);
      document.body.appendChild(script);
      return () => { /* script persists */ };
    }
  }, [step, paymentMethod]);

  const onStep1Submit = (data) => {
    if (!finalAmount || finalAmount < 1) {
      toast.error('Please enter a valid amount');
      return;
    }
    // Auto-select payment method based on currency
    if (currency === 'INR') {
      setPaymentMethod('razorpay');
    } else {
      setPaymentMethod('paypal');
    }
    setDonorData(data);
    setStep(2);
  };

  const handleRazorpayPayment = async () => {
    setLoading(true);
    try {
      const { data: orderData } = await donationService.createRazorpayOrder({
        amount: finalAmount,
        currency: 'INR',
        initiative,
        donorName: donorData.donorName,
        donorEmail: donorData.donorEmail,
        anonymous,
        recurring,
      });

      const options = {
        key: orderData.data?.keyId || import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.data?.amount,
        currency: orderData.data?.currency || 'INR',
        name: 'Sihaniwala Foundation',
        description: `Donation for ${initiative}`,
        order_id: orderData.data?.orderId,
        handler: async function (response) {
          try {
            const { data: verifyResult } = await donationService.verifyRazorpayPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            if (verifyResult.data?.status === 'SUCCESS') {
              toast.success('Donation successful! Thank you for your generosity.');
              window.location.href = '/donation-success';
            } else {
              toast.error('Payment verification failed.');
              window.location.href = '/donation-failure';
            }
          } catch (err) {
            toast.error('Payment verification failed.');
            window.location.href = '/donation-failure';
          }
        },
        prefill: {
          name: donorData.donorName || '',
          email: donorData.donorEmail || '',
        },
        theme: { color: '#f97316' },
        modal: {
          ondismiss: () => setLoading(false),
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        toast.error(response.error?.description || 'Payment failed');
        setLoading(false);
      });
      rzp.open();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to initiate payment');
    } finally {
      setLoading(false);
    }
  };

  const handlePaypalPayment = async () => {
    setLoading(true);
    try {
      const { data: orderData } = await donationService.createPaypalOrder({
        amount: finalAmount,
        currency,
        initiative,
        donorName: donorData.donorName,
        donorEmail: donorData.donorEmail,
        anonymous,
        recurring,
      });

      const approveLink = orderData.data?.approveLink;
      if (approveLink) {
        // Store order ID for capture after return
        sessionStorage.setItem('paypalOrderId', orderData.data?.orderId);
        window.location.href = approveLink;
      } else {
        toast.error('Failed to create PayPal order');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to initiate PayPal payment');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = () => {
    if (paymentMethod === 'razorpay') {
      handleRazorpayPayment();
    } else {
      handlePaypalPayment();
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#0d2c54] via-[#0f3460] to-[#1a4a8a] py-24 text-white text-center overflow-hidden">
        <div className="absolute top-10 right-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-red-400/10 rounded-full blur-3xl" />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative max-w-4xl mx-auto px-6">
          <span className="inline-block bg-orange-500/20 text-orange-300 text-xs font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-full border border-orange-500/30 mb-6">
            Make A Difference
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Donation</span> Matters
          </h1>
          <p className="text-gray-300 mt-5 text-lg max-w-2xl mx-auto">
            Every contribution brings hope to those in need. Together, we can transform lives.
          </p>
        </motion.div>
      </section>

      {/* Donation Categories */}
      <section className="py-20 px-6 bg-gray-50 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-40" />
        <div className="max-w-6xl mx-auto relative">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="text-orange-500 font-bold text-xs tracking-[0.2em] uppercase">Where Your Money Goes</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0d2c54] mt-3">Donation Categories</h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-orange-500 to-amber-400 mx-auto mt-4 rounded-full" />
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {donationCategories.map(({ icon: Icon, title, desc, impact, color }, i) => (
              <motion.div key={title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group cursor-pointer"
                onClick={() => { setInitiative(title === 'Support Meals' ? 'General Fund' : title === 'Support Education' ? 'Education For BPL' : title === 'Sponsor Healthcare' ? 'Hospital Assistance' : 'Financial Help'); }}>
                <div className={`w-14 h-14 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  <Icon size={26} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#0d2c54] mb-1">{title}</h3>
                <p className="text-gray-600 text-sm mb-3">{desc}</p>
                <div className="flex items-center gap-1.5 text-green-600 text-xs font-semibold bg-green-50 px-3 py-1.5 rounded-full w-fit">
                  <CheckCircle size={14} /> {impact}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#0d2c54 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="max-w-2xl mx-auto relative">
          {/* Steps */}
          <div className="flex items-center justify-center gap-4 mb-10">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-lg transition-all ${step >= s ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25' : 'bg-gray-200 text-gray-500'}`}>{s}</div>
                <span className={`text-sm font-semibold ${step >= s ? 'text-[#0d2c54]' : 'text-gray-400'}`}>
                  {s === 1 ? 'Details' : 'Payment'}
                </span>
                {s < 2 && <div className="w-20 h-0.5 bg-gray-200 mx-3 rounded" />}
              </div>
            ))}
          </div>

          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100">
              {/* Preset Amounts */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-3">Select Amount</label>
                <div className="grid grid-cols-3 gap-3">
                  {presetAmounts.map((a) => (
                    <button key={a} onClick={() => { setAmount(a); setCustomAmount(''); }}
                      className={`py-3.5 rounded-xl font-bold transition-all ${amount === a && !customAmount ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                      ₹{a.toLocaleString()}
                    </button>
                  ))}
                </div>
                <input type="number" value={customAmount} onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="Or enter custom amount"
                  className="w-full mt-3 border border-gray-200 p-3.5 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none bg-gray-50 focus:bg-white transition" />
              </div>

              {/* Currency */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">Currency</label>
                <div className="flex gap-3">
                  {[{ val: 'INR', icon: IndianRupee, label: 'INR' }, { val: 'USD', icon: DollarSign, label: 'USD' }, { val: 'EUR', icon: Euro, label: 'EUR' }].map(({ val, icon: Icon, label }) => (
                    <button key={val} onClick={() => setCurrency(val)}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${currency === val ? 'bg-[#0d2c54] text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                      <Icon size={18} /> {label}
                    </button>
                  ))}
                </div>
                {currency !== 'INR' && (
                  <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                    <Globe size={12} /> International donations are processed via PayPal
                  </p>
                )}
              </div>

              {/* Initiative */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">Direct to Initiative</label>
                <select value={initiative} onChange={(e) => setInitiative(e.target.value)}
                  className="w-full border border-gray-200 p-3.5 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none bg-gray-50 focus:bg-white transition">
                  {initiatives.map((i) => <option key={i}>{i}</option>)}
                </select>
              </div>

              {/* Donor Info */}
              <form onSubmit={handleSubmit(onStep1Submit)} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Your Name</label>
                    <input type="text" {...register('donorName', { required: 'Name required' })}
                      className="w-full border border-gray-200 p-3.5 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none bg-gray-50 focus:bg-white transition" placeholder="Full name" />
                    {errors.donorName && <p className="text-red-500 text-xs mt-1">{errors.donorName.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                    <input type="email" {...register('donorEmail', { required: 'Email required' })}
                      className="w-full border border-gray-200 p-3.5 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none bg-gray-50 focus:bg-white transition" placeholder="you@example.com" />
                    {errors.donorEmail && <p className="text-red-500 text-xs mt-1">{errors.donorEmail.message}</p>}
                  </div>
                </div>

                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} className="w-4 h-4 accent-orange-500 rounded" />
                    <span className="text-sm text-gray-700 font-medium">Donate Anonymously</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={recurring} onChange={(e) => setRecurring(e.target.checked)} className="w-4 h-4 accent-orange-500 rounded" />
                    <span className="text-sm text-gray-700 font-medium">Monthly Donation</span>
                  </label>
                </div>

                <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-xl font-bold hover:shadow-xl hover:shadow-orange-500/25 transition-all flex items-center justify-center gap-2 text-lg">
                  <Heart size={22} /> Proceed to Payment
                </button>
              </form>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100">
              {/* Summary */}
              <div className="bg-green-50 rounded-xl p-4 mb-6 flex items-center gap-3 border border-green-100">
                <CheckCircle size={24} className="text-green-600 shrink-0" />
                <div>
                  <p className="font-bold text-green-800">Donation Summary</p>
                  <p className="text-sm text-green-600">
                    {currency === 'INR' ? '₹' : currency === 'USD' ? '$' : '€'}{finalAmount?.toLocaleString()} — {initiative} {recurring ? '(Monthly)' : '(One-time)'}
                  </p>
                </div>
              </div>

              <button onClick={() => setStep(1)} className="text-sm text-orange-500 hover:underline font-medium mb-6">← Back to details</button>

              {/* Payment Method Selection */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-3">Select Payment Method</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setPaymentMethod('razorpay')}
                    disabled={currency !== 'INR'}
                    className={`relative p-5 rounded-2xl border-2 transition-all text-left ${
                      paymentMethod === 'razorpay' && currency === 'INR'
                        ? 'border-orange-500 bg-orange-50 shadow-lg shadow-orange-500/10'
                        : currency !== 'INR'
                          ? 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed'
                          : 'border-gray-200 hover:border-orange-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'razorpay' && currency === 'INR' ? 'border-orange-500' : 'border-gray-300'}`}>
                        {paymentMethod === 'razorpay' && currency === 'INR' && <div className="w-3 h-3 rounded-full bg-orange-500" />}
                      </div>
                      <span className="font-bold text-[#0d2c54]">Razorpay</span>
                    </div>
                    <p className="text-xs text-gray-500 ml-8">UPI, Cards, NetBanking, Wallets</p>
                    <span className="inline-block mt-2 ml-8 text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Indian Donors</span>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('paypal')}
                    className={`relative p-5 rounded-2xl border-2 transition-all text-left ${
                      paymentMethod === 'paypal'
                        ? 'border-orange-500 bg-orange-50 shadow-lg shadow-orange-500/10'
                        : 'border-gray-200 hover:border-orange-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'paypal' ? 'border-orange-500' : 'border-gray-300'}`}>
                        {paymentMethod === 'paypal' && <div className="w-3 h-3 rounded-full bg-orange-500" />}
                      </div>
                      <span className="font-bold text-[#0d2c54]">PayPal</span>
                    </div>
                    <p className="text-xs text-gray-500 ml-8">Cards, PayPal Balance, Bank</p>
                    <span className="inline-block mt-2 ml-8 text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">International</span>
                  </button>
                </div>
              </div>

              {/* Pay Button */}
              <button
                onClick={handlePayment}
                disabled={loading || (paymentMethod === 'razorpay' && currency !== 'INR')}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-xl font-bold hover:shadow-xl hover:shadow-orange-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                    Processing...
                  </>
                ) : paymentMethod === 'razorpay' ? (
                  <>
                    <CreditCard size={22} />
                    Pay ₹{finalAmount?.toLocaleString()} via Razorpay
                  </>
                ) : (
                  <>
                    <Globe size={22} />
                    Pay {currency === 'INR' ? '₹' : currency === 'USD' ? '$' : '€'}{finalAmount?.toLocaleString()} via PayPal
                  </>
                )}
              </button>

              {/* Security badges */}
              <div className="flex items-center justify-center gap-4 text-[11px] text-gray-400 pt-4">
                <span className="flex items-center gap-1"><Shield size={12} /> SSL Encrypted</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                <span className="flex items-center gap-1"><Lock size={12} /> {paymentMethod === 'razorpay' ? 'Secured by Razorpay' : 'Secured by PayPal'}</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                <span className="flex items-center gap-1"><CheckCircle size={12} /> PCI Compliant</span>
              </div>
            </motion.div>
          )}

          {/* Secure Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mt-8 bg-[#0d2c54] rounded-2xl p-6 flex items-center gap-4 text-white">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
              <Lock size={24} className="text-orange-400" />
            </div>
            <div>
              <p className="font-bold">Secure & Encrypted</p>
              <p className="text-gray-300 text-sm">All transactions are secured with 256-bit SSL encryption. Indian donors pay via Razorpay, international donors via PayPal.</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
