import React, { useState } from 'react';
import { CAFE_INFO } from '../data/cafeData';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Mail, 
  User, 
  MessageCircle, 
  Navigation, 
  Send,
  Sparkles,
  Check
} from 'lucide-react';
import { motion } from 'motion/react';

export const LocationContact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.message.trim()) return;

    // Direct to WhatsApp
    const text = `Hi Sumit (Lal Ten Cafe), message from website:\n` +
      `👤 Name: ${formState.name}\n` +
      `📞 Phone: ${formState.phone}\n` +
      `💬 Message: ${formState.message}`;
    const url = `https://wa.me/918209389020?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');

    setSent(true);
    setFormState({ name: '', phone: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 bg-[#160e0a] relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#c6894c]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#c6894c]/20 text-[#e5ab6b] text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Visit Us in Merta City</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#faf6f0]">
            Find Your Way to Sukun
          </h2>
          <p className="text-sm sm:text-base text-[#c4b1a1] mt-2 font-light">
            Conveniently located opposite GVT College at Bhta Choraya. Drop in for fresh coffee or get it delivered to your home!
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Info & Action Buttons */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Main Info Card */}
            <div className="coffee-glass-card rounded-3xl p-7 sm:p-8 border border-[#c6894c]/30 space-y-6">
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#241710] border border-[#c6894c]/40 text-[#e5ab6b] flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#c6894c] font-semibold">Address</div>
                  <h3 className="text-base sm:text-lg font-bold text-[#faf6f0] mt-0.5">
                    {CAFE_INFO.address.street}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#d5c3b2] mt-1 font-light">
                    {CAFE_INFO.address.area}, {CAFE_INFO.address.city}, {CAFE_INFO.address.state} — {CAFE_INFO.address.pincode}
                  </p>
                  <span className="inline-block mt-2 text-[11px] px-2.5 py-0.5 rounded-full bg-[#c6894c]/20 text-[#e5ab6b] font-medium">
                    Opposite GVT College
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-white/10">
                <div className="w-12 h-12 rounded-2xl bg-[#241710] border border-[#c6894c]/40 text-[#e5ab6b] flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#c6894c] font-semibold">Phone & WhatsApp</div>
                  <a 
                    href={`tel:${CAFE_INFO.phone}`}
                    className="text-lg font-bold text-[#faf6f0] hover:text-[#e5ab6b] transition-colors block mt-0.5"
                  >
                    +91 {CAFE_INFO.phone}
                  </a>
                  <p className="text-xs text-[#a89080] mt-0.5">
                    Proprietor: <strong className="text-[#e8d8c8]">{CAFE_INFO.owner}</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-white/10">
                <div className="w-12 h-12 rounded-2xl bg-[#241710] border border-[#c6894c]/40 text-[#e5ab6b] flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#c6894c] font-semibold">Opening Hours</div>
                  <h4 className="text-base font-bold text-[#faf6f0] mt-0.5">
                    {CAFE_INFO.hours.days}: {CAFE_INFO.hours.time}
                  </h4>
                  <p className="text-xs text-[#a89080] mt-0.5">
                    Fresh coffee, kulhad chai & snacks served all day!
                  </p>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="pt-4 flex flex-wrap gap-3">
                <a
                  href={`tel:${CAFE_INFO.phone}`}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#c6894c] to-[#e5ab6b] text-[#120b08] text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Now</span>
                </a>

                <a
                  href={`https://wa.me/918209389020?text=Hi%20Sumit,%20I%20would%20like%20to%20know%20more%20about%20Lal%20Ten%20Cafe%20Merta%20City`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-colors shadow"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href="https://maps.google.com/?q=GVT+College+Merta+City+Rajasthan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto py-3 px-5 rounded-xl border border-white/15 hover:border-[#c6894c] text-[#faf6f0] text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Navigation className="w-4 h-4 text-[#e5ab6b]" />
                  <span>Get Directions</span>
                </a>
              </div>

            </div>

            {/* Quick Inquiry Form */}
            <div className="coffee-glass-card rounded-3xl p-6 sm:p-7 border border-[#c6894c]/20">
              <h4 className="font-display font-bold text-lg text-[#faf6f0]">
                Send a Message to Sumit Soni
              </h4>
              <p className="text-xs text-[#a89080] mt-1">
                Have an event inquiry, special request, or bulk catering need?
              </p>

              <form onSubmit={handleSendMessage} className="mt-4 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Your Name"
                    className="w-full bg-[#120b08] border border-white/10 rounded-xl py-2.5 px-3.5 text-xs text-[#faf6f0] placeholder-[#887060] focus:outline-none focus:border-[#c6894c]"
                  />
                  <input
                    type="tel"
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    placeholder="Mobile Number"
                    className="w-full bg-[#120b08] border border-white/10 rounded-xl py-2.5 px-3.5 text-xs text-[#faf6f0] placeholder-[#887060] focus:outline-none focus:border-[#c6894c]"
                  />
                </div>

                <textarea
                  required
                  rows={2}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="How can we help you?"
                  className="w-full bg-[#120b08] border border-white/10 rounded-xl p-3 text-xs text-[#faf6f0] placeholder-[#887060] focus:outline-none focus:border-[#c6894c]"
                />

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#2a1b13] hover:bg-[#c6894c] hover:text-[#120b08] text-xs font-bold text-[#e8d8c8] border border-white/10 flex items-center justify-center gap-2 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send via WhatsApp</span>
                </button>
              </form>
            </div>

          </div>

          {/* Right Column: Google Maps Embed with Stylized Frame */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden border-2 border-[#c6894c]/30 shadow-2xl bg-[#1c120c] h-[520px] relative">
              <iframe
                title="Lal Ten Cafe Location Map - Opp GVT College Merta City"
                src="https://maps.google.com/maps?q=Government+College+Merta+City+Rajasthan+341510&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'contrast(1.05) brightness(0.9)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Floating Map Pin Info Overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#120b08]/90 backdrop-blur-md border border-[#c6894c]/40 flex items-center justify-between shadow-2xl">
                <div>
                  <div className="text-xs font-bold text-[#faf6f0] flex items-center gap-1.5">
                    <span>🏮</span>
                    <span>LAL TEN CAFE (लाल टेन कैफे)</span>
                  </div>
                  <div className="text-[11px] text-[#c6894c] mt-0.5">
                    Opp. GVT College, Bhta Choraya, Merta City
                  </div>
                </div>

                <a
                  href="https://maps.google.com/?q=GVT+College+Merta+City+Rajasthan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-xl bg-[#c6894c] hover:bg-[#e5ab6b] text-[#120b08] text-xs font-bold flex items-center gap-1 shadow transition-colors"
                >
                  <span>Open Maps</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
