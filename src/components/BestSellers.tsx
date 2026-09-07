import React from 'react';
import { useCafe } from '../context/CafeContext';
import { MENU_ITEMS } from '../data/cafeData';
import { MenuItem } from '../types';
import { Star, Plus, Heart, Sparkles, Check } from 'lucide-react';
import { motion } from 'motion/react';

export const BestSellers: React.FC = () => {
  const { addToCart, setSelectedProduct, favorites, toggleFavorite } = useCafe();

  // Pick top 6 bestsellers
  const bestsellers = MENU_ITEMS.filter(item => item.isBestseller).slice(0, 6);

  return (
    <section id="bestsellers" className="py-20 bg-[#120b08] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#c6894c]/20 text-[#e5ab6b] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Most Loved Flavors</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#faf6f0]">
            Customer Favourites
          </h2>
          <p className="text-sm sm:text-base text-[#c4b1a1] mt-3 font-light">
            Crafted to perfection. These signature drinks and snacks are ordered time and again by our cafe regulars.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {bestsellers.map((item, idx) => {
            const isFav = favorites.includes(item.id);

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="coffee-glass-card rounded-3xl overflow-hidden border border-[#c6894c]/25 hover:border-[#c6894c]/60 shadow-xl group transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Container with Badges */}
                <div 
                  className="relative h-56 w-full overflow-hidden cursor-pointer"
                  onClick={() => setSelectedProduct(item)}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#160e0a] via-transparent to-transparent opacity-80" />

                  {/* Bestseller Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#c6894c] to-[#e5ab6b] text-[#120b08] text-[11px] font-bold uppercase tracking-wider shadow-md">
                      Bestseller
                    </span>
                    {item.isVeg && (
                      <span className="w-5 h-5 rounded bg-white/90 backdrop-blur-md flex items-center justify-center p-0.5 border border-emerald-600 shadow">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                      </span>
                    )}
                  </div>

                  {/* Favorite Toggle Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(item.id);
                    }}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-[#120b08]/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:text-red-400 hover:scale-110 transition-all shadow"
                    aria-label="Add to favorites"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                  </button>

                  {/* Prep Time Tag */}
                  {item.prepTime && (
                    <div className="absolute bottom-3 left-3 text-[11px] font-medium text-[#e8d8c8] bg-[#120b08]/80 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10">
                      ⏱ {item.prepTime}
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Rating & Category */}
                    <div className="flex items-center justify-between text-xs text-[#a89080] mb-1.5">
                      <span className="text-[#e5ab6b] font-medium uppercase tracking-wider text-[11px]">
                        {item.category}
                      </span>
                      <div className="flex items-center gap-1 text-[#f5ba73] font-semibold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{item.rating}</span>
                        <span className="text-[#887060]">({item.reviewCount})</span>
                      </div>
                    </div>

                    {/* Item Title */}
                    <h3 
                      onClick={() => setSelectedProduct(item)}
                      className="font-display font-bold text-lg text-[#faf6f0] group-hover:text-[#e5ab6b] transition-colors cursor-pointer"
                    >
                      {item.name}
                    </h3>
                    {item.hindiName && (
                      <p className="text-xs text-[#c6894c] font-medium mt-0.5">
                        {item.hindiName}
                      </p>
                    )}

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#c4b1a1] mt-2 font-light line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Price & Action Row */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-[#887060] uppercase tracking-wider block">Price</span>
                      <span className="text-xl font-display font-bold text-[#faf6f0]">
                        ₹{item.price}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedProduct(item)}
                        className="px-3 py-2 rounded-xl text-xs font-semibold text-[#e8d8c8] hover:text-[#faf6f0] bg-white/5 hover:bg-white/10 transition-colors"
                      >
                        Customize
                      </button>

                      <button
                        onClick={() => addToCart(item, 1)}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#c6894c] to-[#e5ab6b] text-[#120b08] text-xs font-bold tracking-wider flex items-center gap-1.5 hover:shadow-lg hover:shadow-[#c6894c]/30 hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer"
                        id={`bestseller-add-${item.id}`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>

                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
