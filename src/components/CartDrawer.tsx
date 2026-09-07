import React, { useState } from 'react';
import { useCafe } from '../context/CafeContext';
import { CAFE_INFO } from '../data/cafeData';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Tag, 
  MessageCircle, 
  Sparkles,
  Coffee,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    subtotal, 
    tax, 
    deliveryFee, 
    discount, 
    total,
    couponCode,
    applyCoupon,
    removeCoupon,
    deliveryType,
    setDeliveryType,
    setIsCheckoutOpen,
    getWhatsAppOrderUrl
  } = useCafe();

  const [inputCoupon, setInputCoupon] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCoupon.trim()) {
      applyCoupon(inputCoupon.trim());
      setInputCoupon('');
    }
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        />

        {/* Drawer Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="relative w-full max-w-md bg-[#160e0a] border-l border-[#c6894c]/30 shadow-2xl h-full flex flex-col justify-between z-10 text-[#f5ece3]"
        >
          {/* Header */}
          <div className="p-5 border-b border-[#c6894c]/20 flex items-center justify-between bg-[#1c120c]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#c6894c]/20 text-[#e5ab6b] flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-[#faf6f0]">
                  Your Tray
                </h3>
                <p className="text-xs text-[#a89080]">
                  {cart.length} item{cart.length === 1 ? '' : 's'} selected
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-[#a89080] hover:text-red-400 p-1 transition-colors"
                  title="Clear all"
                >
                  Clear
                </button>
              )}
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full text-[#a89080] hover:text-white hover:bg-white/5 transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Delivery or Pickup Toggle */}
          <div className="p-3 bg-[#120b08] border-b border-white/5 px-5">
            <div className="grid grid-cols-2 gap-2 bg-[#1c120c] p-1 rounded-2xl border border-white/10">
              <button
                type="button"
                onClick={() => setDeliveryType('delivery')}
                className={`py-2 rounded-xl text-xs font-semibold transition-all ${
                  deliveryType === 'delivery'
                    ? 'bg-[#c6894c] text-[#120b08] font-bold shadow'
                    : 'text-[#a89080] hover:text-white'
                }`}
              >
                🛵 Home Delivery
              </button>
              <button
                type="button"
                onClick={() => setDeliveryType('pickup')}
                className={`py-2 rounded-xl text-xs font-semibold transition-all ${
                  deliveryType === 'pickup'
                    ? 'bg-[#c6894c] text-[#120b08] font-bold shadow'
                    : 'text-[#a89080] hover:text-white'
                }`}
              >
                🏮 Pickup from Cafe
              </button>
            </div>
            {deliveryType === 'delivery' && (
              <p className="text-[11px] text-[#a89080] text-center mt-2">
                {subtotal >= 299 ? '🎉 Free Delivery unlocked!' : `Add ₹${299 - subtotal} more for Free Delivery in Merta City`}
              </p>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 flex flex-col items-center justify-center h-full">
                <div className="w-20 h-20 rounded-full bg-[#241710] flex items-center justify-center text-3xl mb-4 text-[#c6894c] border border-white/5">
                  ☕
                </div>
                <h4 className="font-display font-bold text-lg text-[#faf6f0]">
                  Your Tray is Empty
                </h4>
                <p className="text-xs text-[#a89080] max-w-xs mt-1.5 leading-relaxed">
                  Explore our handcrafted coffees, hot masala tea, sandwiches and desserts to start ordering.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 px-6 py-2.5 rounded-full bg-[#c6894c] text-[#120b08] text-xs font-bold uppercase tracking-wider hover:bg-[#e5ab6b] transition-all"
                >
                  Explore Menu
                </button>
              </div>
            ) : (
              cart.map((cartItem) => (
                <div
                  key={cartItem.cartItemId}
                  className="coffee-glass rounded-2xl p-3.5 border border-white/10 flex gap-3 relative group"
                >
                  {/* Thumbnail */}
                  <img
                    src={cartItem.item.image}
                    alt={cartItem.item.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-xl object-cover shrink-0 border border-white/10"
                  />

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold text-sm text-[#faf6f0] truncate pr-2">
                        {cartItem.item.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(cartItem.cartItemId)}
                        className="text-[#887060] hover:text-red-400 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Customizations tags */}
                    <div className="text-[11px] text-[#c6894c] mt-0.5 space-x-1">
                      <span>{cartItem.customization.size}</span>
                      <span>•</span>
                      <span>{cartItem.customization.temperature || 'Hot'}</span>
                      {cartItem.customization.sugar !== 'Normal' && (
                        <span>• Sugar: {cartItem.customization.sugar}</span>
                      )}
                    </div>

                    {cartItem.customization.syrups.length > 0 && (
                      <p className="text-[10px] text-[#a89080] truncate mt-0.5">
                        +{cartItem.customization.syrups.join(', ')}
                      </p>
                    )}

                    {/* Quantity & Price */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2 bg-[#120b08] rounded-xl px-2 py-1 border border-white/10">
                        <button
                          onClick={() => updateQuantity(cartItem.cartItemId, -1)}
                          className="w-5 h-5 flex items-center justify-center text-[#a89080] hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-[#faf6f0] w-4 text-center">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(cartItem.cartItemId, 1)}
                          className="w-5 h-5 flex items-center justify-center text-[#a89080] hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-display font-bold text-sm text-[#faf6f0]">
                        ₹{cartItem.totalPrice}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Billing Details */}
          {cart.length > 0 && (
            <div className="p-5 bg-[#1a100a] border-t border-[#c6894c]/20 space-y-4">
              
              {/* Promo Coupon Bar */}
              {couponCode ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#c6894c]/15 border border-[#c6894c]/40 text-xs text-[#e5ab6b]">
                  <div className="flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Promo <strong>{couponCode}</strong> applied (-₹{discount})</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-[#a89080] hover:text-red-400 text-xs underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#887060]" />
                    <input
                      type="text"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      placeholder="Coupon (e.g. LALTEN20)"
                      className="w-full bg-[#120b08] border border-white/10 rounded-xl py-2 pl-9 pr-3 text-xs text-[#faf6f0] uppercase placeholder:normal-case placeholder-[#887060] focus:outline-none focus:border-[#c6894c]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#2b1a12] hover:bg-[#c6894c] hover:text-[#120b08] text-xs font-semibold text-[#e8d8c8] border border-white/10 transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}

              {/* Quick Preset Coupons */}
              {!couponCode && (
                <div className="flex gap-1.5 overflow-x-auto text-[10px]">
                  <button
                    onClick={() => applyCoupon('LALTEN20')}
                    className="px-2 py-0.5 rounded-md bg-[#241710] border border-white/10 text-[#d49757] hover:border-[#c6894c]"
                  >
                    LALTEN20 (20% Off)
                  </button>
                  <button
                    onClick={() => applyCoupon('BOGO')}
                    className="px-2 py-0.5 rounded-md bg-[#241710] border border-white/10 text-[#d49757] hover:border-[#c6894c]"
                  >
                    BOGO (Special)
                  </button>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#a89080] pt-1">
                <div className="flex justify-between">
                  <span>Item Subtotal</span>
                  <span className="text-[#faf6f0]">₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#e5ab6b]">
                    <span>Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Taxes (5% GST)</span>
                  <span className="text-[#faf6f0]">₹{tax}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="text-[#faf6f0]">
                    {deliveryFee === 0 ? <span className="text-emerald-400">FREE</span> : `₹${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-display font-bold text-[#faf6f0] pt-2 border-t border-white/10">
                  <span>Grand Total</span>
                  <span className="text-[#e5ab6b]">₹{total}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={handleProceedCheckout}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#c6894c] to-[#e5ab6b] text-[#120b08] text-xs sm:text-sm font-bold tracking-wider uppercase flex items-center justify-between shadow-lg shadow-[#c6894c]/20 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
                  id="checkout-proceed-btn"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <span>₹{total} →</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-[#a89080] hover:text-white hover:border-white/20 transition-colors"
                  >
                    Continue Shopping
                  </button>

                  <a
                    href={getWhatsAppOrderUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 rounded-xl bg-emerald-700/80 hover:bg-emerald-600 border border-emerald-500 text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    <span>WhatsApp Order</span>
                  </a>
                </div>
              </div>

            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
