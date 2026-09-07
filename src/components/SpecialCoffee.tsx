import React, { useState } from 'react';
import { useCafe } from '../context/CafeContext';
import { SPECIAL_COFFEES, MENU_ITEMS } from '../data/cafeData';
import { ArrowRight, Star, Plus, Eye } from 'lucide-react';
import { motion } from 'motion/react';

export const SpecialCoffee: React.FC = () => {
  const { setSelectedProduct, addToCart, setSelectedCategory } = useCafe();
  const [activeIdx, setActiveIdx] = useState<number>(2); // Center card active by default

  const handleExploreMenu = () => {
    setSelectedCategory('Coffee');
    const el = document.getElementById('menu');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenProduct = (specialId: string) => {
    // Map to menu item
    let found = MENU_ITEMS.find(m => m.id === 'c-1');
    if (specialId === 'sp-1') found = MENU_ITEMS.find(m => m.id === 'c-1');
    if (specialId === 'sp-2') found = MENU_ITEMS.find(m => m.id === 'c-2');
    if (specialId === 'sp-3') found = MENU_ITEMS.find(m => m.id === 'c-3');
    if (specialId === 'sp-4') found = MENU_ITEMS.find(m => m.id === 'c-7');
    if (specialId === 'sp-5') found = MENU_ITEMS.find(m => m.id === 'c-5');
    if (found) {
      setSelectedProduct(found);
    }
  };

  return (
    <section id="special-coffee" className="py-24 bg-[#160e0a] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#c6894c]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#3d2417]/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Reference Design Glassmorphism Frame */}
        <div className="bg-gradient-to-b from-[#241710]/90 to-[#1c120c]/95 border border-[#c6894c]/30 rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl shadow-black/80 relative">
          
          {/* Header Row directly matching Reference Image */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
            <div>
              <div className="text-xs uppercase tracking-widest text-[#c6894c] font-semibold mb-1">
                Handcrafted With Love
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#faf6f0]">
                Our Special Coffee
              </h2>
              <p className="text-sm sm:text-base text-[#c4b1a1] mt-2 font-light">
                Crafted with passion. Served with warmth.
              </p>
            </div>

            {/* Pill "Explore Menu Button ↗" exactly like the reference design */}
            <button
              onClick={handleExploreMenu}
              className="self-start sm:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#c6894c]/50 bg-[#160e0a]/60 text-xs sm:text-sm font-medium text-[#f5ece3] hover:bg-[#c6894c] hover:text-[#120b08] hover:border-[#c6894c] transition-all group"
            >
              <span>Explore Menu Button</span>
              <span className="w-5 h-5 rounded-full bg-white/10 group-hover:bg-[#120b08]/20 flex items-center justify-center text-xs">
                ↗
              </span>
            </button>
          </div>

          {/* Overlapping Staggered Image Composition */}
          <div className="relative py-4">
            {/* Desktop Overlapping Layout */}
            <div className="hidden md:flex items-center justify-center gap-3 lg:gap-4 xl:gap-5 min-h-[460px]">
              {SPECIAL_COFFEES.map((item, idx) => {
                const isActive = activeIdx === idx;
                // Staggered heights to create dynamic rhythm
                const heights = [
                  'h-[340px] w-[180px]', // Card 1
                  'h-[390px] w-[210px]', // Card 2
                  'h-[460px] w-[250px]', // Card 3 (Center Hero)
                  'h-[390px] w-[210px]', // Card 4
                  'h-[340px] w-[180px]', // Card 5
                ];

                return (
                  <motion.div
                    key={item.id}
                    onMouseEnter={() => setActiveIdx(idx)}
                    onClick={() => handleOpenProduct(item.id)}
                    whileHover={{ scale: 1.04, zIndex: 30 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className={`relative rounded-2xl overflow-hidden cursor-pointer shadow-xl transition-all duration-300 group ${heights[idx]} ${
                      isActive 
                        ? 'ring-2 ring-[#e5ab6b] shadow-2xl shadow-[#c6894c]/20 z-20' 
                        : 'opacity-85 hover:opacity-100 z-10'
                    }`}
                  >
                    {/* Background Image */}
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#120b08] via-[#120b08]/40 to-transparent group-hover:via-[#120b08]/20 transition-all duration-300" />

                    {/* Top Tag Pill */}
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#120b08]/80 backdrop-blur-md text-[#e5ab6b] border border-[#c6894c]/30">
                        {item.tag}
                      </span>
                    </div>

                    {/* Bottom Details Card Overlay */}
                    <div className="absolute bottom-0 inset-x-0 p-4 flex flex-col justify-end">
                      <div className="flex items-center gap-1 text-[#f5ba73] text-xs font-semibold mb-1">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{item.rating}</span>
                      </div>

                      <h3 className="font-display font-bold text-base sm:text-lg text-[#faf6f0] group-hover:text-[#e5ab6b] transition-colors leading-snug">
                        {item.name}
                      </h3>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10">
                        <span className="text-base font-bold text-[#faf6f0]">
                          ₹{item.price}
                        </span>

                        <div className="w-8 h-8 rounded-full bg-[#c6894c] group-hover:bg-[#e5ab6b] text-[#120b08] flex items-center justify-center text-xs font-bold shadow-md transition-colors">
                          <Plus className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile / Tablet Responsive Cards Slider */}
            <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SPECIAL_COFFEES.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleOpenProduct(item.id)}
                  className="relative rounded-2xl overflow-hidden cursor-pointer shadow-lg bg-[#1c120c] border border-[#c6894c]/20 group h-64"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#120b08] via-[#120b08]/40 to-transparent" />
                  
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#120b08]/80 text-[#e5ab6b] border border-[#c6894c]/30">
                      {item.tag}
                    </span>
                  </div>

                  <div className="absolute bottom-3 inset-x-3">
                    <h3 className="font-display font-bold text-base text-[#faf6f0]">
                      {item.name}
                    </h3>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-sm font-bold text-[#e5ab6b]">₹{item.price}</span>
                      <span className="text-xs text-[#d5c3b2] flex items-center gap-1">
                        Customize & Order →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Bottom Explore Button */}
          <div className="mt-10 text-center">
            <button
              onClick={handleExploreMenu}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#c6894c] to-[#e5ab6b] text-[#120b08] text-sm font-bold tracking-wider uppercase hover:shadow-lg hover:shadow-[#c6894c]/30 hover:scale-[1.02] transition-all cursor-pointer"
            >
              <span>EXPLORE COMPLETE MENU</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
