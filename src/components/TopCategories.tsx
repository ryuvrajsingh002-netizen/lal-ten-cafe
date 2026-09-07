import React from 'react';
import { useCafe } from '../context/CafeContext';
import { CATEGORIES_LIST } from '../data/cafeData';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const TopCategories: React.FC = () => {
  const { setSelectedCategory } = useCafe();

  const handleCategoryClick = (categoryTitle: string) => {
    setSelectedCategory(categoryTitle);
    const menuEl = document.getElementById('menu');
    menuEl?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="categories" className="py-24 bg-[#160e0a] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header matching Reference Image */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#c6894c] font-semibold">
              Explore Variety
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#faf6f0] mt-1">
              Our Top Categories:
            </h2>
            <p className="text-sm sm:text-base text-[#c4b1a1] mt-2 font-light">
              From invigorating espresso to comforting kulhad chai, stone-baked pizzas, and desserts.
            </p>
          </div>

          <button
            onClick={() => handleCategoryClick('All')}
            className="self-start sm:self-auto inline-flex items-center gap-2 text-sm font-semibold text-[#e5ab6b] hover:text-[#faf6f0] transition-colors group"
          >
            <span>View Full Menu</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Categories Grid matching reference design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CATEGORIES_LIST.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => handleCategoryClick(cat.id)}
              className="relative rounded-3xl overflow-hidden cursor-pointer h-80 shadow-xl border border-[#c6894c]/20 group hover:border-[#c6894c]/60 hover:shadow-2xl hover:shadow-[#c6894c]/10 transition-all duration-500"
            >
              {/* Full Background Image */}
              <img
                src={cat.image}
                alt={cat.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-[0.75] group-hover:brightness-[0.9]"
              />

              {/* Coffee Color Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#120b08] via-[#120b08]/50 to-transparent group-hover:via-[#120b08]/30 transition-all duration-300" />

              {/* Top Right "Buy ↗" Pill Button exactly matching Reference Image */}
              <div className="absolute top-4 right-4 z-10">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#120b08]/75 backdrop-blur-md border border-[#c6894c]/40 text-xs font-semibold text-[#faf6f0] group-hover:bg-[#c6894c] group-hover:text-[#120b08] transition-colors shadow-md">
                  <span>Buy</span>
                  <span className="text-xs">↗</span>
                </span>
              </div>

              {/* Bottom Information */}
              <div className="absolute bottom-0 inset-x-0 p-6 flex flex-col justify-end z-10">
                <span className="text-xs uppercase tracking-widest text-[#e5ab6b] font-semibold">
                  {cat.itemCount}
                </span>

                <h3 className="text-2xl font-display font-bold text-[#faf6f0] group-hover:text-[#e5ab6b] transition-colors mt-1">
                  {cat.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#d5c3b2] mt-1.5 line-clamp-1 font-light opacity-90">
                  {cat.description}
                </p>

                <div className="mt-4 flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#faf6f0] group-hover:text-[#e5ab6b] transition-colors">
                  <span>Browse Collection</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
