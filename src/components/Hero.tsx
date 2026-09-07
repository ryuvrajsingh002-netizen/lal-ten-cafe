import React from 'react';
import { useCafe } from '../context/CafeContext';
import { CAFE_INFO } from '../data/cafeData';
import { Coffee, ArrowRight, Calendar, Sparkles, ChevronDown, Award, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

export const Hero: React.FC = () => {
  const { setIsCartOpen, setIsReservationOpen, setSelectedCategory } = useCafe();

  const handleExploreMenu = () => {
    setSelectedCategory('All');
    const el = document.getElementById('menu');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOrderNow = () => {
    const el = document.getElementById('menu');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#120b08]"
    >
      {/* Cinematic Background with Slow Parallax Zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          initial={{ scale: 1.05 }}
          animate={{ scale: 1.15 }}
          transition={{ duration: 25, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="w-full h-full"
        >
          <img
            src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=85&w=2000&auto=format&fit=crop"
            alt="Lal Ten Cafe warm atmosphere and fresh coffee"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-[0.42] contrast-[1.08]"
          />
        </motion.div>

        {/* Ambient Dark Brown Coffee Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#120b08] via-[#120b08]/70 to-[#120b08]/40" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#160e0a]/50 to-[#120b08]/90" />
        
        {/* Soft Golden Warm Lighting Effect */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#c6894c]/15 rounded-full blur-[140px] pointer-events-none" />
      </div>

      {/* Floating Animated Coffee Steam Effect */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 pointer-events-none z-10 flex gap-4 opacity-50">
        <div className="w-1.5 h-16 bg-gradient-to-t from-[#f5ece3] to-transparent rounded-full animate-steam-1 blur-[1px]"></div>
        <div className="w-2 h-20 bg-gradient-to-t from-[#f5ece3] to-transparent rounded-full animate-steam-2 blur-[1.5px]"></div>
        <div className="w-1.5 h-14 bg-gradient-to-t from-[#f5ece3] to-transparent rounded-full animate-steam-3 blur-[1px]"></div>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        
        {/* Welcome Eyebrow Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full coffee-glass border border-[#c6894c]/40 text-[#f5ba73] text-xs sm:text-sm font-medium mb-6 shadow-lg shadow-black/40"
        >
          <span className="text-base">🏮</span>
          <span>Welcome to {CAFE_INFO.name}</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-[#c6894c]/20 text-[#e5ab6b]">
            {CAFE_INFO.hindiName}
          </span>
        </motion.div>

        {/* Main Editorial Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="text-4xl sm:text-6xl md:text-7xl font-display font-bold text-[#faf6f0] tracking-tight leading-[1.12] max-w-4xl"
        >
          Fresh Coffee.{' '}
          <span className="italic font-normal text-[#e5ab6b] font-display">
            Good Mood.
          </span>{' '}
          <br className="hidden sm:inline" />
          Great Moments.
        </motion.h1>

        {/* Supporting Slogan & Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 text-base sm:text-lg md:text-xl text-[#d5c3b2] max-w-2xl font-light leading-relaxed"
        >
          Experience freshly brewed coffee, delicious food, and unforgettable moments at{' '}
          <span className="text-[#f5ba73] font-medium">Lal Ten Cafe</span>.
          <span className="block mt-1 text-sm text-[#c6894c] font-normal">
            "सुकून का दूसरा नाम • लाल टेन कैफे" — Opposite GVT College, Merta City
          </span>
        </motion.p>

        {/* CTAs Group */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-5"
        >
          {/* Primary CTA */}
          <button
            onClick={handleOrderNow}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-[#c6894c] via-[#d49757] to-[#e5ab6b] text-[#120b08] text-sm sm:text-base font-bold tracking-wider uppercase hover:shadow-xl hover:shadow-[#c6894c]/30 hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center gap-2.5 group cursor-pointer"
            id="hero-order-now-btn"
          >
            <Coffee className="w-5 h-5 text-[#120b08]" />
            <span>ORDER NOW</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Secondary CTA */}
          <button
            onClick={handleExploreMenu}
            className="px-7 py-4 rounded-full coffee-glass border border-[#c6894c]/40 text-[#f5ece3] text-sm sm:text-base font-semibold hover:bg-[#c6894c]/20 hover:border-[#c6894c] transition-all flex items-center gap-2 cursor-pointer"
            id="hero-explore-menu-btn"
          >
            <span>EXPLORE MENU</span>
            <span className="text-[#e5ab6b]">↗</span>
          </button>

          {/* Additional Small CTA */}
          <button
            onClick={() => setIsReservationOpen(true)}
            className="px-5 py-3.5 rounded-full bg-[#1e130d]/80 border border-white/10 text-[#d49757] text-xs sm:text-sm font-medium hover:text-[#f5ece3] hover:border-[#c6894c]/50 transition-all flex items-center gap-2 cursor-pointer"
            id="hero-book-table-btn"
          >
            <Calendar className="w-4 h-4" />
            <span>BOOK A TABLE</span>
          </button>
        </motion.div>

        {/* Feature Highlights Pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl w-full text-left"
        >
          <div className="coffee-glass-subtle rounded-2xl p-3 sm:p-3.5 border border-white/5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#c6894c]/20 flex items-center justify-center text-[#e5ab6b] shrink-0">
              ☕
            </div>
            <div>
              <div className="text-xs font-semibold text-[#f5ece3]">100% Fresh</div>
              <div className="text-[11px] text-[#a89080]">Artisanal Roasts</div>
            </div>
          </div>

          <div className="coffee-glass-subtle rounded-2xl p-3 sm:p-3.5 border border-white/5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#c6894c]/20 flex items-center justify-center text-[#e5ab6b] shrink-0">
              🏮
            </div>
            <div>
              <div className="text-xs font-semibold text-[#f5ece3]">Cozy Lounge</div>
              <div className="text-[11px] text-[#a89080]">Warm Vibe & Lights</div>
            </div>
          </div>

          <div className="coffee-glass-subtle rounded-2xl p-3 sm:p-3.5 border border-white/5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#c6894c]/20 flex items-center justify-center text-[#e5ab6b] shrink-0">
              ⚡
            </div>
            <div>
              <div className="text-xs font-semibold text-[#f5ece3]">Fast Delivery</div>
              <div className="text-[11px] text-[#a89080]">Across Merta City</div>
            </div>
          </div>

          <div className="coffee-glass-subtle rounded-2xl p-3 sm:p-3.5 border border-white/5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#c6894c]/20 flex items-center justify-center text-[#e5ab6b] shrink-0">
              ⭐
            </div>
            <div>
              <div className="text-xs font-semibold text-[#f5ece3]">4.9 / 5 Rating</div>
              <div className="text-[11px] text-[#a89080]">850+ Happy Guests</div>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <a 
          href="#special-coffee" 
          className="mt-12 text-[#a89080] hover:text-[#e5ab6b] flex flex-col items-center gap-1.5 transition-colors group text-xs tracking-widest uppercase font-medium"
        >
          <span>Scroll to Explore</span>
          <ChevronDown className="w-4 h-4 animate-bounce group-hover:text-[#e5ab6b]" />
        </a>

      </div>
    </section>
  );
};
