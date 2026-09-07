import React, { useState, useEffect } from 'react';
import { useCafe } from '../context/CafeContext';
import { SPECIAL_OFFERS } from '../data/cafeData';
import { Sparkles, Clock, ArrowRight, Tag, Check } from 'lucide-react';
import { motion } from 'motion/react';

export const SpecialOffers: React.FC = () => {
  const { applyCoupon, setIsCartOpen } = useCafe();

  // Dynamic countdown timer
  const [timeLeft, setTimeLeft] = useState({ hours: 7, minutes: 42, seconds: 19 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 12, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleClaim = (code: string) => {
    applyCoupon(code);
    setIsCartOpen(true);
  };

  return (
    <section id="offers" className="py-24 bg-[#120b08] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#c6894c]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c6894c]/20 text-[#e5ab6b] text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Limited Time Promos</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#faf6f0]">
              Exclusive Cafe Deals
            </h2>
            <p className="text-sm sm:text-base text-[#c4b1a1] mt-2 font-light">
              Special offers for Merta City coffee lovers & GVT College students.
            </p>
          </div>

          {/* Live Countdown Badge */}
          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#1c120c] border border-[#c6894c]/30 text-xs text-[#faf6f0]">
            <Clock className="w-4 h-4 text-[#e5ab6b] animate-spin" />
            <span className="text-[#a89080]">Deals refresh in:</span>
            <div className="flex gap-1 font-mono font-bold text-[#e5ab6b]">
              <span className="bg-[#120b08] px-2 py-0.5 rounded border border-white/5">
                {String(timeLeft.hours).padStart(2, '0')}h
              </span>
              :
              <span className="bg-[#120b08] px-2 py-0.5 rounded border border-white/5">
                {String(timeLeft.minutes).padStart(2, '0')}m
              </span>
              :
              <span className="bg-[#120b08] px-2 py-0.5 rounded border border-white/5 text-[#f5ba73]">
                {String(timeLeft.seconds).padStart(2, '0')}s
              </span>
            </div>
          </div>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SPECIAL_OFFERS.map((offer, idx) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="coffee-glass-card rounded-3xl overflow-hidden border border-[#c6894c]/20 hover:border-[#c6894c]/60 shadow-xl group flex flex-col justify-between transition-all duration-300"
            >
              {/* Image banner */}
              <div className="relative h-44 w-full overflow-hidden">
                <img
                  src={offer.image}
                  alt={offer.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#180f0b] via-transparent to-transparent" />

                {/* Discount Tag */}
                <div className="absolute top-3 right-3">
                  <span className="px-3 py-1 rounded-full bg-[#120b08]/85 backdrop-blur-md border border-[#c6894c]/40 text-[#e5ab6b] text-xs font-bold shadow-md">
                    {offer.discount}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-bold text-lg text-[#faf6f0] group-hover:text-[#e5ab6b] transition-colors">
                    {offer.title}
                  </h3>
                  <p className="text-xs text-[#c4b1a1] mt-2 font-light leading-relaxed">
                    {offer.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-white/10 space-y-3">
                  {/* Coupon Code Pill */}
                  <div className="flex items-center justify-between bg-[#120b08] p-2 rounded-xl border border-dashed border-[#c6894c]/40">
                    <span className="text-[10px] uppercase tracking-wider text-[#887060]">Coupon Code:</span>
                    <span className="font-mono font-bold text-xs text-[#e5ab6b]">{offer.code}</span>
                  </div>

                  {/* Claim Button */}
                  <button
                    onClick={() => handleClaim(offer.code)}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#c6894c] to-[#e5ab6b] text-[#120b08] text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 shadow hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <span>Claim Offer</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
