import React, { useState } from 'react';
import { CAFE_INFO } from '../data/cafeData';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Mail, 
  Instagram, 
  MessageCircle, 
  Heart, 
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { useCafe } from '../context/CafeContext';

export const Footer: React.FC = () => {
  const { setIsAdminOpen } = useCafe();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#0e0705] border-t border-[#c6894c]/20 text-[#f5ece3] relative overflow-hidden">
      {/* Soft warm bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-48 bg-[#c6894c]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-white/10">
          
          {/* Brand Info (Col 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c6894c] to-[#3d2417] p-0.5 shadow-lg shadow-[#c6894c]/20">
                <div className="w-full h-full rounded-full bg-[#1c120c] flex items-center justify-center text-[#f5ba73]">
                  🏮
                </div>
              </div>

              <div>
                <span className="font-brand font-bold text-2xl tracking-wider text-[#faf6f0]">
                  {CAFE_INFO.name}
                </span>
                <span className="block text-xs font-semibold text-[#c6894c]">
                  {CAFE_INFO.hindiName} • {CAFE_INFO.tagline}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#c4b1a1] font-light leading-relaxed">
              Merta City's favorite sanctuary for freshly ground coffee, authentic kulhad chai, hearty sandwiches, and delightful conversations under warm lanterns.
            </p>

            <div className="pt-2 text-xs text-[#a89080] space-y-1">
              <div>📍 {CAFE_INFO.shortAddress}</div>
              <div>👤 Proprietor: <strong className="text-[#e8d8c8]">{CAFE_INFO.owner}</strong></div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={CAFE_INFO.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#1e130d] border border-white/10 flex items-center justify-center text-[#d5c3b2] hover:text-[#e5ab6b] hover:border-[#c6894c] transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={`https://wa.me/91${CAFE_INFO.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#1e130d] border border-white/10 flex items-center justify-center text-[#d5c3b2] hover:text-emerald-400 hover:border-emerald-500 transition-all"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <a
                href={`tel:${CAFE_INFO.phone}`}
                className="w-9 h-9 rounded-full bg-[#1e130d] border border-white/10 flex items-center justify-center text-[#d5c3b2] hover:text-[#e5ab6b] hover:border-[#c6894c] transition-all"
                aria-label="Phone"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links (Col 5-7) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#c6894c]">
              Explore
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#c4b1a1]">
              <li><a href="#hero" className="hover:text-[#e5ab6b] transition-colors">Home</a></li>
              <li><a href="#special-coffee" className="hover:text-[#e5ab6b] transition-colors">Special Coffee</a></li>
              <li><a href="#menu" className="hover:text-[#e5ab6b] transition-colors">Full Digital Menu</a></li>
              <li><a href="#our-story" className="hover:text-[#e5ab6b] transition-colors">Our Story</a></li>
              <li><a href="#categories" className="hover:text-[#e5ab6b] transition-colors">Categories</a></li>
              <li><a href="#offers" className="hover:text-[#e5ab6b] transition-colors">Deals & Coupons</a></li>
              <li><a href="#book-table" className="hover:text-[#e5ab6b] transition-colors">Book a Table</a></li>
              <li><a href="#gallery" className="hover:text-[#e5ab6b] transition-colors">Cafe Gallery</a></li>
            </ul>
          </div>

          {/* Categories Menu (Col 8-9) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#c6894c]">
              Menu Delights
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#c4b1a1]">
              <li><a href="#menu" className="hover:text-[#e5ab6b] transition-colors">Artisanal Coffee</a></li>
              <li><a href="#menu" className="hover:text-[#e5ab6b] transition-colors">Kulhad Chai & Teas</a></li>
              <li><a href="#menu" className="hover:text-[#e5ab6b] transition-colors">Iced & Cold Drinks</a></li>
              <li><a href="#menu" className="hover:text-[#e5ab6b] transition-colors">Grilled Sandwiches</a></li>
              <li><a href="#menu" className="hover:text-[#e5ab6b] transition-colors">Crispy Pizzas</a></li>
              <li><a href="#menu" className="hover:text-[#e5ab6b] transition-colors">Chocolate Brownies</a></li>
              <li><a href="#menu" className="hover:text-[#e5ab6b] transition-colors">Waffles & Pancakes</a></li>
            </ul>
          </div>

          {/* Coffee Club & Newsletter (Col 10-12) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#c6894c]">
              Join Lal Ten Coffee Club
            </h4>
            <p className="text-xs text-[#c4b1a1] leading-relaxed">
              Subscribe to get secret weekend discount codes, invitation to tasting events, and new roast releases!
            </p>

            {subscribed ? (
              <div className="p-3 rounded-2xl bg-[#c6894c]/20 border border-[#c6894c]/40 text-xs text-[#e5ab6b] flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>You're subscribed! Use coupon <strong>LALTEN20</strong> for 20% off.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#887060]" />
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full bg-[#180f0b] border border-white/10 rounded-2xl py-2.5 pl-10 pr-3 text-xs text-[#faf6f0] placeholder-[#887060] focus:outline-none focus:border-[#c6894c]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-[#c6894c] to-[#e5ab6b] text-[#120b08] text-xs font-bold uppercase tracking-wider shadow hover:scale-[1.01] transition-all cursor-pointer"
                >
                  Join Club & Get 20% Off
                </button>
              </form>
            )}

            <div className="pt-2 text-[11px] text-[#887060] flex items-center justify-between">
              <span>Delivery available in Merta City</span>
              <button 
                onClick={() => setIsAdminOpen(true)}
                className="hover:text-[#e5ab6b] underline flex items-center gap-1"
              >
                <ShieldCheck className="w-3 h-3" />
                <span>Owner Portal</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Micro Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#887060]">
          <div>
            © {new Date().getFullYear()} {CAFE_INFO.name} ({CAFE_INFO.hindiName}). All Rights Reserved.
          </div>

          <div className="flex items-center gap-1 text-[#a89080]">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
            <span>for Merta City, Rajasthan</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
