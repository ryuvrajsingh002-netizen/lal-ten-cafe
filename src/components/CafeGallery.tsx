import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/cafeData';
import { GalleryItem } from '../types';
import { Sparkles, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CafeGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Interior', 'Drinks', 'Food', 'Moments'];

  const filteredGallery = activeCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category.toLowerCase() === activeCategory.toLowerCase());

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredGallery.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredGallery.length) % filteredGallery.length);
    }
  };

  return (
    <section id="gallery" className="py-24 bg-[#120b08] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#c6894c]/20 text-[#e5ab6b] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Visual Glimpses</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#faf6f0]">
            Moments at Lal Ten Cafe
          </h2>
          <p className="text-sm sm:text-base text-[#c4b1a1] mt-3 font-light">
            Take a look inside our cozy haven in Merta City — from steaming kulhad cups to warm lantern evenings.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-[#c6894c] to-[#e5ab6b] text-[#120b08] shadow-md'
                  : 'coffee-glass text-[#d5c3b2] hover:text-[#faf6f0] border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item, idx) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              onClick={() => openLightbox(idx)}
              className={`relative rounded-3xl overflow-hidden cursor-pointer shadow-xl border border-[#c6894c]/20 group hover:border-[#c6894c]/60 transition-all duration-300 ${
                item.featured ? 'sm:col-span-2 aspect-[16/9]' : 'aspect-square sm:aspect-[4/3]'
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#120b08] via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Top Pill if featured */}
              {item.featured && (
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#c6894c] to-[#e5ab6b] text-[#120b08] text-xs font-bold shadow-lg">
                    🏮 Original Merta Storefront
                  </span>
                </div>
              )}

              {/* Hover Zoom Icon */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#120b08]/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Bottom Caption */}
              <div className="absolute bottom-0 inset-x-0 p-5 z-10">
                <span className="text-[10px] uppercase tracking-wider text-[#e5ab6b] font-semibold">
                  {item.category}
                </span>
                <h3 className="text-lg font-display font-bold text-[#faf6f0] mt-0.5">
                  {item.title}
                </h3>
              </div>

            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div 
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white z-50"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev */}
            <button
              onClick={prevImage}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white z-50"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next */}
            <button
              onClick={nextImage}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white z-50"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Main Image */}
            <div 
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl max-h-[85vh] flex flex-col items-center"
            >
              <img
                src={filteredGallery[lightboxIndex].image}
                alt={filteredGallery[lightboxIndex].title}
                referrerPolicy="no-referrer"
                className="max-h-[75vh] w-auto rounded-2xl shadow-2xl object-contain border border-[#c6894c]/30"
              />
              <div className="mt-4 text-center">
                <h4 className="text-lg font-display font-bold text-[#faf6f0]">
                  {filteredGallery[lightboxIndex].title}
                </h4>
                <p className="text-xs text-[#a89080] mt-0.5">
                  Lal Ten Cafe, Merta City • Photo {lightboxIndex + 1} of {filteredGallery.length}
                </p>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
