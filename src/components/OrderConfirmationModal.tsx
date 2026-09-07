import React from 'react';
import { useCafe } from '../context/CafeContext';
import { CAFE_INFO } from '../data/cafeData';
import { CheckCircle2, Clock, MapPin, MessageCircle, ArrowRight, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const OrderConfirmationModal: React.FC = () => {
  const { 
    currentOrder, 
    setCurrentOrder, 
    setIsTrackingOpen,
    getWhatsAppOrderUrl
  } = useCafe();

  if (!currentOrder) return null;

  const handleTrackOrder = () => {
    setIsTrackingOpen(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-gradient-to-b from-[#241710] to-[#160e0a] border border-[#c6894c]/50 rounded-3xl p-6 sm:p-8 shadow-2xl text-center z-10 text-[#f5ece3]"
        >
          {/* Close / Dismiss */}
          <button
            onClick={() => setCurrentOrder(null)}
            className="absolute top-4 right-4 p-2 text-[#a89080] hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Success Icon */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#c6894c] to-[#e5ab6b] text-[#120b08] mx-auto flex items-center justify-center shadow-xl shadow-[#c6894c]/30 mb-5">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c6894c]/20 text-[#e5ab6b] text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kitchen Has Received Your Order</span>
          </div>

          <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#faf6f0]">
            Order Confirmed! ☕
          </h3>

          <p className="text-sm text-[#d5c3b2] mt-2 font-light">
            Thank you, <strong className="text-[#faf6f0]">{currentOrder.customer.name}</strong>! Your freshly brewed coffee and snacks are now being prepared.
          </p>

          {/* Order ID & Estimated Time Box */}
          <div className="mt-6 p-4 rounded-2xl bg-[#120b08] border border-white/10 flex items-center justify-between text-left">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-[#887060]">Order ID</div>
              <div className="text-base font-mono font-bold text-[#e5ab6b]">{currentOrder.id}</div>
            </div>

            <div className="text-right">
              <div className="text-[10px] uppercase tracking-wider text-[#887060]">Estimated Time</div>
              <div className="text-sm font-semibold text-[#faf6f0] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#c6894c]" />
                <span>{currentOrder.estimatedTime}</span>
              </div>
            </div>
          </div>

          {/* Items Summary list */}
          <div className="mt-4 p-4 rounded-2xl bg-[#180f0b] border border-white/5 text-left text-xs text-[#a89080] space-y-2 max-h-36 overflow-y-auto">
            <div className="text-[11px] font-bold uppercase text-[#c6894c]">Items in this order:</div>
            {currentOrder.items.map((it, idx) => (
              <div key={idx} className="flex justify-between text-[#e8d8c8]">
                <span>{it.quantity}x {it.item.name} ({it.customization.size})</span>
                <span className="font-semibold">₹{it.totalPrice}</span>
              </div>
            ))}
            <div className="pt-2 border-t border-white/10 flex justify-between font-bold text-sm text-[#faf6f0]">
              <span>Total Paid / Due</span>
              <span className="text-[#e5ab6b]">₹{currentOrder.total}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 space-y-2.5">
            <button
              onClick={handleTrackOrder}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#c6894c] to-[#e5ab6b] text-[#120b08] text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-[#c6894c]/20 hover:scale-[1.01] transition-all cursor-pointer"
            >
              <span>TRACK LIVE ORDER PROGRESS</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={getWhatsAppOrderUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 rounded-xl bg-emerald-700/80 hover:bg-emerald-600 text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>Notify WhatsApp</span>
              </a>

              <button
                onClick={() => setCurrentOrder(null)}
                className="py-2.5 rounded-xl border border-white/10 hover:border-white/20 text-xs font-semibold text-[#a89080] hover:text-white transition-colors"
              >
                Back to Cafe
              </button>
            </div>
          </div>

          <p className="text-[11px] text-[#887060] mt-4">
            Need help? Contact Sumit Soni at {CAFE_INFO.phoneFormatted}
          </p>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
