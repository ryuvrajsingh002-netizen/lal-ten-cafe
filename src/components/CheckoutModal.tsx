import React, { useState } from 'react';
import { useCafe } from '../context/CafeContext';
import { CAFE_INFO } from '../data/cafeData';
import { 
  X, 
  Check, 
  CreditCard, 
  QrCode, 
  Banknote, 
  MapPin, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  ShieldCheck,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

export const CheckoutModal: React.FC = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    subtotal, 
    tax, 
    deliveryFee, 
    discount, 
    total,
    deliveryType,
    setDeliveryType,
    placeOrder,
    customerInfo,
    setCustomerInfo
  } = useCafe();

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod' | 'netbanking'>('upi');
  const [deliveryTiming, setDeliveryTiming] = useState<'asap' | 'schedule'>('asap');
  const [scheduledTime, setScheduledTime] = useState('30 minutes');
  const [showUPIQR, setShowUPIQR] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerInfo.name.trim() || !customerInfo.phone.trim()) {
      alert('Please provide your Name and Mobile Number for order updates.');
      return;
    }
    if (deliveryType === 'delivery' && !customerInfo.address.trim()) {
      alert('Please provide your delivery address in Merta City.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      // Trigger festive celebration confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#c6894c', '#e5ab6b', '#120b08', '#ffffff']
      });

      placeOrder({
        deliveryType,
        paymentMethod,
        timing: deliveryTiming === 'asap' ? 'ASAP (15-25 min)' : scheduledTime,
      });

      setIsSubmitting(false);
    }, 600);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCheckoutOpen(false)}
          className="fixed inset-0 bg-[#0a0604]/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
          className="relative w-full max-w-2xl bg-gradient-to-b from-[#241710] to-[#180f0b] border border-[#c6894c]/40 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 max-h-[92vh] flex flex-col text-[#f5ece3]"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-[#c6894c]/25 flex items-center justify-between bg-[#1e130d]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#c6894c]/20 text-[#e5ab6b] flex items-center justify-center font-bold text-lg">
                ☕
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-[#faf6f0]">
                  Checkout & Place Order
                </h3>
                <p className="text-xs text-[#a89080]">
                  {CAFE_INFO.name} • {CAFE_INFO.shortAddress}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="p-2 rounded-full text-[#a89080] hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handlePlaceOrder} className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Delivery Method Toggle */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#c6894c] block mb-2">
                1. Order Fulfillment
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDeliveryType('delivery')}
                  className={`p-3.5 rounded-2xl border flex items-center gap-3 transition-all ${
                    deliveryType === 'delivery'
                      ? 'bg-[#c6894c]/20 border-[#e5ab6b] ring-1 ring-[#e5ab6b] text-[#faf6f0]'
                      : 'bg-[#180f0b] border-white/5 text-[#a89080] hover:border-white/20'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-[#c6894c]/20 text-[#e5ab6b] flex items-center justify-center shrink-0">
                    🛵
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-[#faf6f0]">Home Delivery</div>
                    <div className="text-[11px] text-[#a89080]">Direct to your doorstep</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryType('pickup')}
                  className={`p-3.5 rounded-2xl border flex items-center gap-3 transition-all ${
                    deliveryType === 'pickup'
                      ? 'bg-[#c6894c]/20 border-[#e5ab6b] ring-1 ring-[#e5ab6b] text-[#faf6f0]'
                      : 'bg-[#180f0b] border-white/5 text-[#a89080] hover:border-white/20'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-[#c6894c]/20 text-[#e5ab6b] flex items-center justify-center shrink-0">
                    🏮
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-[#faf6f0]">Cafe Pickup</div>
                    <div className="text-[11px] text-[#a89080]">Opp. GVT College</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Timing */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#c6894c] block mb-2">
                2. Preparation & Time
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDeliveryTiming('asap')}
                  className={`py-2.5 px-4 rounded-xl border text-xs font-semibold text-center transition-all ${
                    deliveryTiming === 'asap'
                      ? 'bg-[#c6894c] text-[#120b08] font-bold'
                      : 'bg-[#180f0b] border-white/5 text-[#a89080]'
                  }`}
                >
                  ⚡ ASAP (Fresh Brew in 15-20 Min)
                </button>
                <button
                  type="button"
                  onClick={() => setDeliveryTiming('schedule')}
                  className={`py-2.5 px-4 rounded-xl border text-xs font-semibold text-center transition-all ${
                    deliveryTiming === 'schedule'
                      ? 'bg-[#c6894c] text-[#120b08] font-bold'
                      : 'bg-[#180f0b] border-white/5 text-[#a89080]'
                  }`}
                >
                  🕒 Schedule for Later
                </button>
              </div>
              {deliveryTiming === 'schedule' && (
                <div className="mt-2 flex gap-2">
                  {['In 30 min', 'In 45 min', 'In 1 hour', 'Tonight 8 PM'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setScheduledTime(t)}
                      className={`px-3 py-1.5 rounded-lg text-xs border ${
                        scheduledTime === t
                          ? 'bg-[#e5ab6b]/20 border-[#e5ab6b] text-[#faf6f0]'
                          : 'border-white/10 text-[#a89080]'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Customer Details */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#c6894c] block">
                3. Your Details (For SMS / WhatsApp Updates)
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#887060]" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={customerInfo.name}
                    onChange={handleInputChange}
                    placeholder="Full Name *"
                    className="w-full bg-[#180f0b] border border-white/10 rounded-xl py-2.5 pl-10 pr-3 text-xs text-[#faf6f0] placeholder-[#887060] focus:outline-none focus:border-[#c6894c]"
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#887060]" />
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    placeholder="Mobile Number (WhatsApp) *"
                    className="w-full bg-[#180f0b] border border-white/10 rounded-xl py-2.5 pl-10 pr-3 text-xs text-[#faf6f0] placeholder-[#887060] focus:outline-none focus:border-[#c6894c]"
                  />
                </div>
              </div>

              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#887060]" />
                <input
                  type="email"
                  name="email"
                  value={customerInfo.email}
                  onChange={handleInputChange}
                  placeholder="Email Address (For receipt)"
                  className="w-full bg-[#180f0b] border border-white/10 rounded-xl py-2.5 pl-10 pr-3 text-xs text-[#faf6f0] placeholder-[#887060] focus:outline-none focus:border-[#c6894c]"
                />
              </div>

              {deliveryType === 'delivery' && (
                <div className="space-y-2">
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-[#887060]" />
                    <textarea
                      name="address"
                      required
                      value={customerInfo.address}
                      onChange={handleInputChange}
                      placeholder="Delivery Address (House/Shop No, Street, Landmark in Merta City) *"
                      rows={2}
                      className="w-full bg-[#180f0b] border border-white/10 rounded-xl py-2.5 pl-10 pr-3 text-xs text-[#faf6f0] placeholder-[#887060] focus:outline-none focus:border-[#c6894c]"
                    />
                  </div>
                  <input
                    type="text"
                    name="landmark"
                    value={customerInfo.landmark}
                    onChange={handleInputChange}
                    placeholder="Nearby Landmark (e.g. Near GVT College / Bus Stand / Market)"
                    className="w-full bg-[#180f0b] border border-white/10 rounded-xl py-2.5 px-3.5 text-xs text-[#faf6f0] placeholder-[#887060] focus:outline-none focus:border-[#c6894c]"
                  />
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#c6894c] block mb-2">
                4. Select Payment Method
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'upi', label: 'UPI / QR Code', icon: <QrCode className="w-4 h-4" /> },
                  { id: 'card', label: 'Card (Debit/Credit)', icon: <CreditCard className="w-4 h-4" /> },
                  { id: 'netbanking', label: 'Net Banking', icon: <ShieldCheck className="w-4 h-4" /> },
                  { id: 'cod', label: deliveryType === 'delivery' ? 'Cash on Delivery' : 'Pay at Counter', icon: <Banknote className="w-4 h-4" /> },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id as any)}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 text-center transition-all ${
                      paymentMethod === m.id
                        ? 'bg-[#c6894c]/20 border-[#e5ab6b] text-[#faf6f0] ring-1 ring-[#e5ab6b]'
                        : 'bg-[#180f0b] border-white/5 text-[#a89080] hover:border-white/20'
                    }`}
                  >
                    <div className="text-[#e5ab6b]">{m.icon}</div>
                    <span className="text-[11px] font-semibold">{m.label}</span>
                  </button>
                ))}
              </div>

              {/* UPI Instant QR details */}
              {paymentMethod === 'upi' && (
                <div className="mt-4 p-4 rounded-2xl bg-[#120b08] border border-[#c6894c]/30 flex flex-col sm:flex-row items-center gap-4">
                  {/* Generated QR Code Graphic */}
                  <div className="w-28 h-28 bg-white p-2 rounded-xl shrink-0 flex flex-col items-center justify-center shadow-lg">
                    {/* Visual QR representation */}
                    <div className="w-full h-full bg-[#120b08] rounded flex flex-col items-center justify-center p-2 text-center">
                      <QrCode className="w-12 h-12 text-[#f5ba73]" />
                      <span className="text-[8px] text-white/80 font-mono mt-1">LAL TEN UPI</span>
                    </div>
                  </div>

                  <div className="text-center sm:text-left space-y-1">
                    <div className="text-xs font-bold text-[#faf6f0]">
                      Scan to Pay via Any UPI App
                    </div>
                    <div className="text-[11px] text-[#c6894c] font-mono">
                      UPI ID: {CAFE_INFO.phone}@paytm
                    </div>
                    <div className="text-[11px] text-[#a89080]">
                      Supported: Google Pay, PhonePe, Paytm, BHIM, Cred
                    </div>
                    <div className="text-[10px] text-emerald-400 font-medium">
                      ✓ Instant payment verification upon placement
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary Recap */}
            <div className="p-4 rounded-2xl bg-[#120b08] border border-white/5 space-y-1.5 text-xs text-[#a89080]">
              <div className="flex justify-between font-semibold text-[#faf6f0]">
                <span>{cart.length} Items Total</span>
                <span>₹{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#e5ab6b]">
                  <span>Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Taxes & Fees</span>
                <span>₹{tax + deliveryFee}</span>
              </div>
              <div className="flex justify-between text-base font-display font-bold text-[#faf6f0] pt-2 border-t border-white/10">
                <span>Final Payable Amount</span>
                <span className="text-[#e5ab6b]">₹{total}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#c6894c] via-[#d49757] to-[#e5ab6b] text-[#120b08] text-sm font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-xl shadow-[#c6894c]/25 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer"
              id="confirm-order-btn"
            >
              {isSubmitting ? (
                <span>Placing your order...</span>
              ) : (
                <>
                  <span>CONFIRM & PLACE ORDER (₹{total})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="text-[11px] text-center text-[#887060]">
              🔒 256-Bit Encrypted & Directly sent to Lal Ten Cafe Kitchen ({CAFE_INFO.phoneFormatted})
            </p>

          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
