import React, { useState } from 'react';
import { useCafe } from '../context/CafeContext';
import { CAFE_INFO } from '../data/cafeData';
import { OrderStatus } from '../types';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  Flame, 
  Bike, 
  Store, 
  Search, 
  Phone, 
  MessageCircle,
  MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const OrderTrackingModal: React.FC = () => {
  const { 
    isTrackingOpen, 
    setIsTrackingOpen, 
    currentOrder, 
    orders, 
    setCurrentOrder 
  } = useCafe();

  const [searchOrderId, setSearchOrderId] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<typeof currentOrder | null>(null);

  if (!isTrackingOpen) return null;

  const displayOrder = searchedOrder || currentOrder || orders[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchOrderId.trim()) return;
    const found = orders.find(o => o.id.toLowerCase() === searchOrderId.trim().toLowerCase());
    if (found) {
      setSearchedOrder(found);
    } else {
      alert(`No order found with ID: ${searchOrderId}`);
    }
  };

  const steps: { status: OrderStatus; title: string; desc: string; icon: any }[] = [
    {
      status: 'received',
      title: 'Order Received',
      desc: 'Ticket sent to Lal Ten Cafe baristas',
      icon: <Store className="w-4 h-4" />
    },
    {
      status: 'preparing',
      title: 'Brewing & Preparing',
      desc: 'Grinding beans, steaming milk & baking snacks',
      icon: <Flame className="w-4 h-4" />
    },
    {
      status: 'ready',
      title: 'Fresh & Packed',
      desc: 'Boxed in insulated bags with warm love',
      icon: <CheckCircle2 className="w-4 h-4" />
    },
    {
      status: 'out_for_delivery',
      title: displayOrder?.deliveryType === 'pickup' ? 'Ready for Counter Pickup' : 'Out for Delivery',
      desc: displayOrder?.deliveryType === 'pickup' ? 'Visit Opp. GVT College counter' : 'Rider on the way in Merta City',
      icon: <Bike className="w-4 h-4" />
    },
    {
      status: 'delivered',
      title: 'Delivered / Completed',
      desc: 'Enjoy your warm cup of Sukun!',
      icon: <CheckCircle2 className="w-4 h-4" />
    },
  ];

  const getStepIndex = (status?: OrderStatus) => {
    switch (status) {
      case 'received': return 0;
      case 'preparing': return 1;
      case 'ready': return 2;
      case 'out_for_delivery': return 3;
      case 'delivered': return 4;
      default: return 1;
    }
  };

  const currentStepIdx = getStepIndex(displayOrder?.status);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsTrackingOpen(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 20 }}
          className="relative w-full max-w-xl bg-gradient-to-b from-[#241710] to-[#160e0a] border border-[#c6894c]/40 rounded-3xl shadow-2xl p-6 sm:p-8 z-10 text-[#f5ece3] max-h-[92vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-[#faf6f0]">
                Live Order Tracker
              </h3>
              <p className="text-xs text-[#a89080] mt-0.5">
                Real-time status from Lal Ten Cafe kitchen
              </p>
            </div>

            <button
              onClick={() => setIsTrackingOpen(false)}
              className="p-2 text-[#a89080] hover:text-white rounded-full hover:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search other order */}
          <form onSubmit={handleSearch} className="flex gap-2 my-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#887060]" />
              <input
                type="text"
                value={searchOrderId}
                onChange={(e) => setSearchOrderId(e.target.value)}
                placeholder="Track by Order ID (e.g. LTC-8492)"
                className="w-full bg-[#120b08] border border-white/10 rounded-xl py-2 pl-9 pr-3 text-xs text-[#faf6f0] uppercase placeholder:normal-case placeholder-[#887060] focus:outline-none focus:border-[#c6894c]"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#2b1a12] hover:bg-[#c6894c] hover:text-[#120b08] text-xs font-semibold border border-white/10 transition-colors"
            >
              Search
            </button>
          </form>

          {displayOrder ? (
            <div className="flex-1 overflow-y-auto space-y-6 pr-1">
              
              {/* Order Banner */}
              <div className="p-4 rounded-2xl bg-[#1c120c] border border-[#c6894c]/30 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[#c6894c] font-bold">
                    Active Order
                  </div>
                  <div className="text-lg font-mono font-bold text-[#faf6f0]">
                    {displayOrder.id}
                  </div>
                  <div className="text-xs text-[#a89080]">
                    Placed for: {displayOrder.customer.name} ({displayOrder.deliveryType === 'delivery' ? '🛵 Delivery' : '🏮 Pickup'})
                  </div>
                </div>

                <div className="bg-[#120b08] px-3.5 py-2 rounded-xl border border-white/10 text-right">
                  <div className="text-[10px] text-[#887060] uppercase">Est. Completion</div>
                  <div className="text-xs font-bold text-[#e5ab6b] flex items-center gap-1 justify-end">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{displayOrder.estimatedTime}</span>
                  </div>
                </div>
              </div>

              {/* Progress Timeline */}
              <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-white/10">
                {steps.map((step, idx) => {
                  const isDone = idx < currentStepIdx;
                  const isCurrent = idx === currentStepIdx;
                  const isUpcoming = idx > currentStepIdx;

                  return (
                    <div key={step.status} className="relative flex items-start gap-4">
                      {/* Node Icon */}
                      <div 
                        className={`absolute -left-6 sm:-left-8 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          isDone 
                            ? 'bg-emerald-500 text-black shadow-md' 
                            : isCurrent 
                            ? 'bg-gradient-to-r from-[#c6894c] to-[#e5ab6b] text-[#120b08] ring-4 ring-[#c6894c]/20 animate-pulse' 
                            : 'bg-[#180f0b] border border-white/10 text-[#887060]'
                        }`}
                      >
                        {isDone ? '✓' : step.icon}
                      </div>

                      {/* Content */}
                      <div>
                        <div className={`text-xs sm:text-sm font-bold ${
                          isCurrent ? 'text-[#e5ab6b]' : isDone ? 'text-[#faf6f0]' : 'text-[#887060]'
                        }`}>
                          {step.title}
                          {isCurrent && (
                            <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-[#c6894c]/20 text-[#e5ab6b] uppercase font-semibold">
                              In Progress
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-[#a89080] mt-0.5 font-light">
                          {step.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order Items Snapshot */}
              <div className="p-4 rounded-2xl bg-[#120b08] border border-white/5 space-y-1.5 text-xs">
                <div className="font-bold text-[#c6894c] uppercase text-[10px] mb-1">
                  Ordered Items ({displayOrder.items.length})
                </div>
                {displayOrder.items.map((it, i) => (
                  <div key={i} className="flex justify-between text-[#d5c3b2]">
                    <span>{it.quantity}x {it.item.name}</span>
                    <span>₹{it.totalPrice}</span>
                  </div>
                ))}
                <div className="pt-2 border-t border-white/10 flex justify-between font-bold text-[#faf6f0]">
                  <span>Total Amount</span>
                  <span className="text-[#e5ab6b]">₹{displayOrder.total}</span>
                </div>
              </div>

              {/* Contact Help */}
              <div className="p-4 rounded-2xl bg-[#1e130d] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-center sm:text-left">
                  <div className="font-semibold text-[#faf6f0]">Need direct support?</div>
                  <div className="text-[11px] text-[#a89080]">Cafe Owner: Sumit Soni ({CAFE_INFO.phoneFormatted})</div>
                </div>

                <div className="flex gap-2">
                  <a
                    href={`tel:${CAFE_INFO.phone}`}
                    className="px-3.5 py-2 rounded-xl bg-[#c6894c] hover:bg-[#e5ab6b] text-[#120b08] text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Cafe</span>
                  </a>

                  <a
                    href={`https://wa.me/918209389020?text=Hi%20Sumit,%20checking%20status%20for%20Order%20${displayOrder.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

            </div>
          ) : (
            <div className="text-center py-12 text-[#a89080] text-xs">
              No orders placed yet. Place an order to track live progress.
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
