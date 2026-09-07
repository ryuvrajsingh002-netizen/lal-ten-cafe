import React, { useState, useEffect } from 'react';
import { useCafe } from '../context/CafeContext';
import { CustomizationOptions } from '../types';
import { X, Plus, Minus, Check, Star, Coffee, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ProductModal: React.FC = () => {
  const { selectedProduct, setSelectedProduct, addToCart, setIsCartOpen } = useCafe();

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState<'Regular' | 'Medium' | 'Large'>('Regular');
  const [temperature, setTemperature] = useState<'Hot' | 'Iced'>('Hot');
  const [sugar, setSugar] = useState<'None' | 'Less' | 'Normal' | 'Extra'>('Normal');
  const [milk, setMilk] = useState<CustomizationOptions['milk']>('Standard Dairy');
  const [syrups, setSyrups] = useState<string[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Reset when product changes
  useEffect(() => {
    if (selectedProduct) {
      setQuantity(1);
      setSize('Regular');
      setTemperature(selectedProduct.category === 'Cold Drinks' ? 'Iced' : 'Hot');
      setSugar('Normal');
      setMilk('Standard Dairy');
      setSyrups([]);
      setSpecialInstructions('');
    }
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  // Calculate dynamic item price with options
  let unitPrice = selectedProduct.price;
  if (size === 'Medium') unitPrice += 30;
  if (size === 'Large') unitPrice += 50;
  if (milk.includes('Oat')) unitPrice += 30;
  if (milk.includes('Almond')) unitPrice += 35;
  if (milk.includes('Double Cream')) unitPrice += 25;
  if (syrups.length > 0) unitPrice += syrups.length * 25;

  const totalPrice = unitPrice * quantity;

  const handleToggleSyrup = (name: string) => {
    setSyrups(prev => 
      prev.includes(name) ? prev.filter(s => s !== name) : [...prev, name]
    );
  };

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity, {
      size,
      temperature,
      sugar,
      milk,
      syrups,
      specialInstructions,
    });
    setSelectedProduct(null);
  };

  const isBeverage = selectedProduct.category === 'Coffee' || selectedProduct.category === 'Tea' || selectedProduct.category === 'Cold Drinks';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProduct(null)}
          className="fixed inset-0 bg-[#0a0604]/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
          className="relative w-full max-w-2xl bg-gradient-to-b from-[#241710] to-[#1a100a] border border-[#c6894c]/40 rounded-3xl shadow-2xl shadow-black overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col"
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedProduct(null)}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#120b08]/80 text-[#e8d8c8] hover:text-white hover:bg-[#120b08] flex items-center justify-center transition-colors border border-white/10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header Image */}
          <div className="relative h-60 sm:h-72 w-full overflow-hidden shrink-0 bg-[#120b08]">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#241710] via-transparent to-transparent" />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#c6894c] to-[#e5ab6b] text-[#120b08] text-xs font-bold uppercase tracking-wider shadow">
                {selectedProduct.category}
              </span>
              {selectedProduct.isVeg && (
                <span className="w-6 h-6 rounded bg-white/90 backdrop-blur-md flex items-center justify-center p-0.5 border border-emerald-600 shadow">
                  <span className="w-3 h-3 rounded-full bg-emerald-600"></span>
                </span>
              )}
            </div>

            <div className="absolute bottom-4 left-6 right-6">
              <div className="flex items-center gap-2 text-[#f5ba73] text-xs font-semibold mb-1">
                <Star className="w-4 h-4 fill-current" />
                <span>{selectedProduct.rating}</span>
                <span className="text-[#a89080]">({selectedProduct.reviewCount} reviews)</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#faf6f0]">
                {selectedProduct.name}
              </h2>
              {selectedProduct.hindiName && (
                <p className="text-sm text-[#e5ab6b] font-medium">
                  {selectedProduct.hindiName}
                </p>
              )}
            </div>
          </div>

          {/* Scrollable Customization Body */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1 text-[#f5ece3]">
            {/* Description */}
            <p className="text-sm text-[#d5c3b2] leading-relaxed font-light">
              {selectedProduct.description}
            </p>

            {/* Size Options */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#c6894c] block mb-2.5">
                Select Serving Size
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { name: 'Regular', add: 0, desc: 'Standard cup' },
                  { name: 'Medium', add: 30, desc: '+100 ml (+₹30)' },
                  { name: 'Large', add: 50, desc: '+200 ml (+₹50)' },
                ].map((s) => (
                  <button
                    key={s.name}
                    type="button"
                    onClick={() => setSize(s.name as any)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      size === s.name
                        ? 'bg-[#c6894c]/20 border-[#e5ab6b] text-[#faf6f0] ring-1 ring-[#e5ab6b]'
                        : 'bg-[#180f0b] border-white/5 text-[#a89080] hover:border-white/20'
                    }`}
                  >
                    <div className="text-xs font-bold text-[#faf6f0]">{s.name}</div>
                    <div className="text-[11px] text-[#e5ab6b] mt-0.5">{s.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Beverage specifics: Temperature, Sugar, Milk */}
            {isBeverage && (
              <>
                {/* Temperature */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#c6894c] block mb-2.5">
                    Temperature Preference
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {(['Hot', 'Iced'] as const).map((temp) => (
                      <button
                        key={temp}
                        type="button"
                        onClick={() => setTemperature(temp)}
                        className={`py-2.5 px-4 rounded-xl border text-xs font-semibold transition-all ${
                          temperature === temp
                            ? 'bg-[#c6894c] text-[#120b08] border-[#c6894c] font-bold'
                            : 'bg-[#180f0b] border-white/5 text-[#d5c3b2] hover:border-white/20'
                        }`}
                      >
                        {temp === 'Hot' ? '☕ Hot Steamed' : '🧊 Chilled on Ice'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sugar Level */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#c6894c] block mb-2.5">
                    Sweetness / Sugar Level
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {(['None', 'Less', 'Normal', 'Extra'] as const).map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setSugar(lvl)}
                        className={`py-2 rounded-xl border text-xs font-medium text-center transition-all ${
                          sugar === lvl
                            ? 'bg-[#e5ab6b]/20 border-[#e5ab6b] text-[#faf6f0]'
                            : 'bg-[#180f0b] border-white/5 text-[#a89080] hover:border-white/20'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Milk Choice */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#c6894c] block mb-2.5">
                    Milk Option
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      'Standard Dairy',
                      'Oat Milk (+₹30)',
                      'Almond Milk (+₹35)',
                      'Double Cream (+₹25)',
                    ].map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setMilk(m as any)}
                        className={`p-2.5 rounded-xl border text-xs font-medium text-left transition-all ${
                          milk === m
                            ? 'bg-[#c6894c]/20 border-[#e5ab6b] text-[#faf6f0]'
                            : 'bg-[#180f0b] border-white/5 text-[#a89080] hover:border-white/20'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Extra Syrups */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#c6894c] block mb-2.5">
                    Extra Syrups & Toppings (+₹25 each)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Roasted Hazelnut',
                      'Madagascar Vanilla',
                      'Salted Caramel',
                      'Whipped Cream',
                      'Belgian Chocolate Drizzle',
                    ].map((syrup) => {
                      const selected = syrups.includes(syrup);
                      return (
                        <button
                          key={syrup}
                          type="button"
                          onClick={() => handleToggleSyrup(syrup)}
                          className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                            selected
                              ? 'bg-[#c6894c] text-[#120b08] border-[#c6894c] font-bold'
                              : 'bg-[#180f0b] border-white/5 text-[#d5c3b2] hover:border-white/20'
                          }`}
                        >
                          {selected ? `✓ ${syrup}` : `+ ${syrup}`}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {/* Special Instructions Note */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#c6894c] block mb-2">
                Special Kitchen Instructions (Optional)
              </label>
              <textarea
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="E.g. Extra hot, no cocoa dust, pack separately, etc."
                rows={2}
                className="w-full bg-[#180f0b] border border-white/10 rounded-2xl p-3 text-xs text-[#faf6f0] placeholder-[#887060] focus:outline-none focus:border-[#c6894c]"
              />
            </div>
          </div>

          {/* Modal Footer: Quantity, Total & Add to Cart Button */}
          <div className="p-5 border-t border-white/10 bg-[#1a100a] flex items-center justify-between gap-4">
            {/* Quantity Selector */}
            <div className="flex items-center gap-3 bg-[#120b08] border border-white/10 rounded-2xl px-3 py-1.5">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-7 h-7 rounded-lg text-[#a89080] hover:text-white flex items-center justify-center"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-bold text-sm text-[#faf6f0] w-5 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-7 h-7 rounded-lg text-[#a89080] hover:text-white flex items-center justify-center"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Add to Tray CTA */}
            <button
              onClick={handleAddToCart}
              className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#c6894c] to-[#e5ab6b] text-[#120b08] text-sm font-bold tracking-wider uppercase flex items-center justify-between shadow-lg shadow-[#c6894c]/20 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
            >
              <span>ADD TO TRAY</span>
              <span className="text-base font-display font-bold">₹{totalPrice}</span>
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
