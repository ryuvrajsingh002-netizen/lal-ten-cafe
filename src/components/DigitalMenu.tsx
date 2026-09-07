import React, { useState, useMemo } from 'react';
import { useCafe } from '../context/CafeContext';
import { MENU_ITEMS, CAFE_INFO } from '../data/cafeData';
import { CategoryType, MenuItem } from '../types';
import { 
  Search, 
  Plus, 
  Minus, 
  Heart, 
  SlidersHorizontal, 
  Star, 
  Sparkles,
  MessageCircle,
  Clock,
  Flame,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const CATEGORIES: CategoryType[] = [
  'All',
  'Coffee',
  'Tea',
  'Cold Drinks',
  'Food',
  'Desserts',
  'Breakfast'
];

export const DigitalMenu: React.FC = () => {
  const { 
    selectedCategory, 
    setSelectedCategory, 
    addToCart, 
    setSelectedProduct,
    favorites,
    toggleFavorite,
    searchQuery,
    setSearchQuery,
    getWhatsAppOrderUrl
  } = useCafe();

  const [vegOnly, setVegOnly] = useState(false);
  const [addedItemIds, setAddedItemIds] = useState<string[]>([]);

  // Filtered menu items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      // Category filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      // Veg filter
      if (vegOnly && !item.isVeg) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchHindi = item.hindiName?.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchCat = item.category.toLowerCase().includes(q);
        const matchTags = item.tags?.some(t => t.toLowerCase().includes(q));
        return matchName || matchHindi || matchDesc || matchCat || matchTags;
      }
      return true;
    });
  }, [selectedCategory, vegOnly, searchQuery]);

  const handleQuickAdd = (item: MenuItem) => {
    addToCart(item, 1);
    setAddedItemIds(prev => [...prev, item.id]);
    setTimeout(() => {
      setAddedItemIds(prev => prev.filter(id => id !== item.id));
    }, 1200);
  };

  return (
    <section id="menu" className="py-24 bg-[#140c08] relative overflow-hidden">
      {/* Soft background glow */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#c6894c]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#2e1910]/40 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c6894c]/20 text-[#e5ab6b] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Handcrafted Flavors & Delicacies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#faf6f0]">
            Our Digital Menu
          </h2>
          <p className="text-sm sm:text-base text-[#c4b1a1] mt-3 font-light leading-relaxed">
            Select your favourite brews, authentic chai, fresh snacks and desserts. Customize with oat milk, roasted hazelnut syrup, or order directly via WhatsApp!
          </p>
        </div>

        {/* Search Bar & Dietary Controls Bar */}
        <div className="max-w-4xl mx-auto mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#c6894c]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search your favourite coffee, sandwich, shake, kulhad chai..."
                className="w-full bg-[#1e130d] border border-[#c6894c]/30 rounded-full py-3.5 pl-12 pr-10 text-sm text-[#faf6f0] placeholder-[#887060] focus:outline-none focus:border-[#e5ab6b] focus:ring-1 focus:ring-[#e5ab6b] transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#a89080] hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Veg Only Toggle */}
            <button
              onClick={() => setVegOnly(!vegOnly)}
              className={`px-4 py-3 rounded-full border text-xs font-semibold flex items-center gap-2 transition-all w-full sm:w-auto justify-center cursor-pointer ${
                vegOnly 
                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300' 
                  : 'bg-[#1e130d] border-[#c6894c]/30 text-[#d5c3b2] hover:border-[#c6894c]'
              }`}
            >
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              <span>100% Veg Only</span>
            </button>

            {/* Quick WhatsApp Order Button */}
            <a
              href={getWhatsAppOrderUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 rounded-full bg-emerald-700/80 hover:bg-emerald-600 border border-emerald-500 text-xs font-semibold text-white flex items-center gap-2 transition-all w-full sm:w-auto justify-center"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Order on WhatsApp</span>
            </a>

          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none py-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-[#c6894c] to-[#e5ab6b] text-[#120b08] shadow-md shadow-[#c6894c]/20 scale-[1.03]'
                    : 'coffee-glass border border-white/5 text-[#d5c3b2] hover:text-[#faf6f0] hover:border-[#c6894c]/40'
                }`}
              >
                {cat === 'All' ? 'All Items' : cat}
              </button>
            ))}
          </div>

        </div>

        {/* Results Counter */}
        <div className="max-w-4xl mx-auto mb-8 flex justify-between items-center text-xs text-[#a89080] px-2">
          <span>Showing {filteredItems.length} items in {selectedCategory}</span>
          {vegOnly && <span className="text-emerald-400">Filtered: Pure Vegetarian</span>}
        </div>

        {/* Menu Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 coffee-glass rounded-3xl max-w-md mx-auto p-8 border border-white/10">
            <p className="text-lg text-[#faf6f0] font-semibold">No items match your search</p>
            <p className="text-xs text-[#a89080] mt-1">Try changing category or clearing your search term</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setVegOnly(false);
              }}
              className="mt-4 px-4 py-2 rounded-full bg-[#c6894c] text-[#120b08] text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredItems.map((item) => {
              const isFav = favorites.includes(item.id);
              const isJustAdded = addedItemIds.includes(item.id);

              return (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="coffee-glass-card rounded-3xl overflow-hidden border border-[#c6894c]/20 hover:border-[#c6894c]/60 shadow-lg group transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Image & Quick Overlays */}
                  <div 
                    className="relative h-52 w-full overflow-hidden cursor-pointer"
                    onClick={() => setSelectedProduct(item)}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a100a] via-transparent to-transparent opacity-80" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      {item.isBestseller && (
                        <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#c6894c] to-[#e5ab6b] text-[#120b08] text-[10px] font-bold uppercase tracking-wider shadow">
                          Bestseller
                        </span>
                      )}
                      {item.isVeg && (
                        <span className="w-5 h-5 rounded bg-white/90 backdrop-blur-md flex items-center justify-center p-0.5 border border-emerald-600 shadow" title="Vegetarian">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                        </span>
                      )}
                    </div>

                    {/* Favorite Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(item.id);
                      }}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#120b08]/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:text-red-400 hover:scale-110 transition-all shadow"
                      aria-label="Toggle favorite"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                    </button>

                    {/* Prep time */}
                    {item.prepTime && (
                      <span className="absolute bottom-3 left-3 text-[10px] text-[#e8d8c8] bg-[#120b08]/80 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#c6894c]" />
                        <span>{item.prepTime}</span>
                      </span>
                    )}

                    {/* Calories */}
                    {item.calories && (
                      <span className="absolute bottom-3 right-3 text-[10px] text-[#a89080] bg-[#120b08]/80 backdrop-blur-md px-2 py-0.5 rounded-full">
                        {item.calories}
                      </span>
                    )}
                  </div>

                  {/* Content Body */}
                  <div className="p-5 flex flex-col flex-1 justify-between">
                    <div>
                      {/* Rating & Category */}
                      <div className="flex items-center justify-between text-xs text-[#a89080] mb-1">
                        <span className="text-[#e5ab6b] font-medium uppercase tracking-wider text-[10px]">
                          {item.category}
                        </span>
                        <div className="flex items-center gap-1 text-[#f5ba73] font-semibold text-[11px]">
                          <Star className="w-3 h-3 fill-current" />
                          <span>{item.rating}</span>
                          <span className="text-[#887060]">({item.reviewCount})</span>
                        </div>
                      </div>

                      {/* Name */}
                      <h3 
                        onClick={() => setSelectedProduct(item)}
                        className="font-display font-bold text-base sm:text-lg text-[#faf6f0] group-hover:text-[#e5ab6b] transition-colors cursor-pointer leading-snug"
                      >
                        {item.name}
                      </h3>
                      {item.hindiName && (
                        <p className="text-xs text-[#c6894c] font-medium mt-0.5">
                          {item.hindiName}
                        </p>
                      )}

                      {/* Description */}
                      <p className="text-xs text-[#c4b1a1] mt-2 font-light line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Tags */}
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {item.tags.map(tag => (
                            <span 
                              key={tag} 
                              className="text-[10px] px-2 py-0.5 rounded-full bg-[#1e130d] text-[#a89080] border border-white/5"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Price & Action Buttons */}
                    <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-[#887060] uppercase tracking-wider block">Price</span>
                        <span className="text-lg font-display font-bold text-[#faf6f0]">
                          ₹{item.price}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedProduct(item)}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#e8d8c8] hover:text-[#faf6f0] bg-white/5 hover:bg-white/10 transition-colors"
                        >
                          Customize
                        </button>

                        <button
                          onClick={() => handleQuickAdd(item)}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold tracking-wider flex items-center gap-1.5 transition-all shadow-md cursor-pointer ${
                            isJustAdded
                              ? 'bg-emerald-600 text-white'
                              : 'bg-gradient-to-r from-[#c6894c] to-[#e5ab6b] text-[#120b08] hover:shadow-[#c6894c]/30 hover:scale-[1.03] active:scale-[0.98]'
                          }`}
                          id={`menu-add-btn-${item.id}`}
                        >
                          {isJustAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Added ✓</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                  </div>

                </motion.div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
