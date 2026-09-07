import React, { useState, useEffect } from 'react';
import { useCafe } from '../context/CafeContext';
import { MENU_ITEMS } from '../data/cafeData';
import { Search, X, Plus, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, addToCart, setSelectedProduct } = useCafe();
  const [term, setTerm] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsSearchOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const results = term.trim()
    ? MENU_ITEMS.filter(it => 
        it.name.toLowerCase().includes(term.toLowerCase()) ||
        it.hindiName?.toLowerCase().includes(term.toLowerCase()) ||
        it.category.toLowerCase().includes(term.toLowerCase()) ||
        it.description.toLowerCase().includes(term.toLowerCase())
      )
    : MENU_ITEMS.slice(0, 6); // show popular when empty

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSearchOpen(false)}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="relative w-full max-w-2xl bg-gradient-to-b from-[#241710] to-[#180f0b] border border-[#c6894c]/40 rounded-3xl p-5 sm:p-6 shadow-2xl z-10 text-[#f5ece3]"
        >
          {/* Search Input Bar */}
          <div className="relative flex items-center pb-4 border-b border-white/10">
            <Search className="w-5 h-5 text-[#c6894c] mr-3" />
            <input
              type="text"
              autoFocus
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Search coffee, tea, sandwiches, pizzas, shakes..."
              className="w-full bg-transparent text-sm sm:text-base text-[#faf6f0] placeholder-[#887060] focus:outline-none"
            />
            {term && (
              <button onClick={() => setTerm('')} className="p-1 text-[#887060] hover:text-white mr-2 text-xs">
                Clear
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-1 text-[#a89080] hover:text-white rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Results Header */}
          <div className="py-3 text-xs text-[#887060] flex justify-between items-center">
            <span>{term ? `Found ${results.length} results` : 'Popular Recommendations'}</span>
            <span className="text-[11px] text-[#c6894c]">Press ESC to close</span>
          </div>

          {/* Results List */}
          <div className="max-h-96 overflow-y-auto space-y-2.5 pr-1">
            {results.length === 0 ? (
              <div className="text-center py-10 text-[#a89080] text-xs">
                No menu items found for "{term}". Try searching "Latte", "Chai", or "Burger".
              </div>
            ) : (
              results.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-2xl bg-[#140c08] border border-white/5 hover:border-[#c6894c]/40 transition-colors flex items-center justify-between gap-3 group"
                >
                  <div 
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSelectedProduct(item);
                    }}
                    className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-xl object-cover shrink-0"
                    />
                    <div className="truncate">
                      <div className="text-xs sm:text-sm font-bold text-[#faf6f0] group-hover:text-[#e5ab6b] transition-colors truncate">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-[#a89080] flex items-center gap-2 mt-0.5">
                        <span className="text-[#c6894c]">{item.category}</span>
                        <span>•</span>
                        <span className="text-[#f5ba73] flex items-center gap-0.5">
                          <Star className="w-3 h-3 fill-current" /> {item.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-display font-bold text-sm text-[#faf6f0]">
                      ₹{item.price}
                    </span>
                    <button
                      onClick={() => {
                        addToCart(item, 1);
                        setIsSearchOpen(false);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#c6894c] to-[#e5ab6b] text-[#120b08] text-xs font-bold flex items-center gap-1 shadow hover:scale-105 transition-all cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
