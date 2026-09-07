import React from 'react';
import { CAFE_INFO } from '../data/cafeData';
import { Award, Heart, Sparkles, MapPin, Coffee, Phone } from 'lucide-react';
import { motion } from 'motion/react';

export const OurStory: React.FC = () => {
  return (
    <section id="our-story" className="py-24 bg-[#120b08] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#c6894c]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#3d2417]/25 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section 1: Reference Design Editorial Story Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Lifestyle Coffee Image (Hands holding Latte Art like reference image) */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Rounded image container with border glow */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#c6894c]/30 aspect-[4/5] max-w-md mx-auto">
                <img
                  src="https://images.unsplash.com/photo-1541167760496-1628856ab772?q=85&w=1200&auto=format&fit=crop"
                  alt="Barista pouring artisanal latte art at Lal Ten Cafe"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter brightness-[0.9] hover:scale-105 transition-transform duration-700"
                />
                
                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#120b08]/80 via-transparent to-transparent" />

                {/* Floating Badge */}
                <div className="absolute bottom-6 left-6 right-6 coffee-glass p-4 rounded-2xl border border-[#c6894c]/30">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#c6894c] flex items-center justify-center text-[#120b08] font-bold text-lg">
                      🏮
                    </div>
                    <div>
                      <div className="text-xs text-[#d49757] font-semibold uppercase tracking-wider">
                        Pure Coffee Craft
                      </div>
                      <div className="text-sm font-bold text-[#faf6f0]">
                        "Chai ki Chuski, Dil ki Khushi"
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Milk Splash Graphic at the bottom (matching reference image style) */}
              <div className="absolute -bottom-6 -left-6 -right-6 h-14 bg-gradient-to-t from-[#f5ece3]/10 to-transparent blur-sm rounded-full pointer-events-none" />
            </motion.div>
          </div>

          {/* Right Column: Glassmorphic Story Card directly inspired by reference design */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="coffee-glass-card rounded-3xl p-8 sm:p-12 relative border border-[#c6894c]/30"
            >
              {/* Header pill exactly matching reference image */}
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="text-xs sm:text-sm font-semibold tracking-widest text-[#e5ab6b] uppercase">
                  Our Story:
                </span>
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#c6894c]/40 text-xs text-[#faf6f0] bg-[#120b08]/50">
                  <span>Our Story</span>
                  <span className="text-xs">↗</span>
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#faf6f0] leading-tight">
                Our Coffee Story
              </h2>

              <p className="mt-6 text-base sm:text-lg text-[#d5c3b2] font-light leading-relaxed">
                At <strong className="text-[#faf6f0] font-semibold">{CAFE_INFO.name}</strong>, every cup is crafted with passion, using only premium beans to ensure the freshest, richest taste in every single sip. From ethically sourced beans to carefully brewed coffee, we bring you a flavor profile that awakens your senses and inspires your mornings.
              </p>

              <p className="mt-4 text-sm sm:text-base text-[#a89080] font-light leading-relaxed">
                Founded by <strong className="text-[#e5ab6b] font-medium">{CAFE_INFO.owner}</strong> in Merta City, Lal Ten Cafe has become the beloved destination known as <em className="text-[#f5ece3] not-italic font-medium">"सुकून का दूसरा नाम"</em> — a sanctuary where friends gather, conversations flow, and memories are made under warm glowing lanterns.
              </p>

              {/* Animated Statistics Row matching Reference Design */}
              <div className="mt-10 grid grid-cols-3 gap-4 pt-8 border-t border-white/10">
                <div>
                  <div className="text-3xl sm:text-4xl font-display font-bold text-[#faf6f0]">
                    100%
                  </div>
                  <div className="text-xs sm:text-sm text-[#c4b1a1] mt-1">
                    Organic Fresh
                  </div>
                </div>

                <div>
                  <div className="text-3xl sm:text-4xl font-display font-bold text-[#e5ab6b]">
                    24/7
                  </div>
                  <div className="text-xs sm:text-sm text-[#c4b1a1] mt-1">
                    Good Vibes
                  </div>
                </div>

                <div>
                  <div className="text-3xl sm:text-4xl font-display font-bold text-[#faf6f0]">
                    50+
                  </div>
                  <div className="text-xs sm:text-sm text-[#c4b1a1] mt-1">
                    Menu Varieties
                  </div>
                </div>
              </div>

            </motion.div>
          </div>

        </div>

        {/* Section 2: Authentic Lal Ten Cafe Storefront Spotlight (The User's Real Cafe Image) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 bg-gradient-to-r from-[#241710] via-[#2a1b13] to-[#1e130d] rounded-3xl p-6 sm:p-10 border border-[#c6894c]/30 shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Real Storefront Photography */}
            <div className="lg:col-span-7 relative group">
              <div className="rounded-2xl overflow-hidden border-2 border-[#c6894c]/40 shadow-xl relative aspect-[4/3] bg-[#160e0a]">
                <img
                  src="./cafe_storefront.jpg"
                  alt="Lal Ten Cafe storefront with warm wooden lantern sign in Merta City"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                />
                
                {/* Soft warm glow around the wooden sign */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                
                {/* Overlay Badge */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-[#faf6f0]">
                  <span className="bg-[#120b08]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#c6894c]/40 text-[#e5ab6b] font-semibold">
                    📍 Opp. GVT College, Merta City
                  </span>
                  <span className="bg-[#120b08]/80 backdrop-blur-md px-3 py-1.5 rounded-full text-white/80 font-medium">
                    Storefront & Chill Spot
                  </span>
                </div>
              </div>
            </div>

            {/* Story & Welcome from Sumit Soni */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c6894c]/20 text-[#e5ab6b] text-xs font-semibold self-start">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Original Ambience</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#faf6f0]">
                Experience Sukun at Lal Ten Cafe
              </h3>

              <p className="text-sm sm:text-base text-[#d5c3b2] font-light leading-relaxed">
                Step up to our iconic illuminated wooden lantern entrance, take in the rustic bamboo finish, fairy lights, and breathe in the aroma of freshly crushed ginger chai and dark roast coffee.
              </p>

              <div className="space-y-2.5 pt-2 text-sm text-[#e8d8c8]">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#c6894c]/20 text-[#e5ab6b] flex items-center justify-center text-xs">
                    ✓
                  </div>
                  <span>Chai ki Chuski, Dil ki Khushi (Kulhad Chai)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#c6894c]/20 text-[#e5ab6b] flex items-center justify-center text-xs">
                    ✓
                  </div>
                  <span>Cozy seating, student-friendly rates & study corners</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#c6894c]/20 text-[#e5ab6b] flex items-center justify-center text-xs">
                    ✓
                  </div>
                  <span>Host: <strong>Sumit Soni</strong> & warm hospitality</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <a
                  href={`tel:${CAFE_INFO.phone}`}
                  className="px-5 py-2.5 rounded-full bg-[#c6894c] hover:bg-[#e5ab6b] text-[#120b08] text-xs font-bold flex items-center gap-2 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {CAFE_INFO.phoneFormatted}</span>
                </a>
                <a
                  href="#contact"
                  className="px-5 py-2.5 rounded-full border border-white/20 hover:border-[#c6894c] text-xs font-semibold text-[#faf6f0] transition-colors"
                >
                  View Location & Map
                </a>
              </div>

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
