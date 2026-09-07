import React, { useState } from 'react';
import { useCafe } from '../context/CafeContext';
import { CAFE_INFO } from '../data/cafeData';
import { OrderStatus } from '../types';
import { 
  X, 
  ShieldCheck, 
  ShoppingBag, 
  Calendar, 
  Clock, 
  Phone, 
  TrendingUp, 
  CheckCircle2, 
  Flame, 
  Bike,
  Store,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AdminModal: React.FC = () => {
  const { 
    isAdminOpen, 
    setIsAdminOpen, 
    orders, 
    updateOrderStatus, 
    reservations 
  } = useCafe();

  const [activeTab, setActiveTab] = useState<'orders' | 'reservations' | 'metrics'>('orders');

  if (!isAdminOpen) return null;

  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);

  const statusOptions: OrderStatus[] = [
    'received',
    'preparing',
    'ready',
    'out_for_delivery',
    'delivered',
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsAdminOpen(false)}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          className="relative w-full max-w-4xl bg-gradient-to-b from-[#241710] to-[#160e0a] border border-[#c6894c]/50 rounded-3xl shadow-2xl p-6 sm:p-8 z-10 text-[#f5ece3] max-h-[92vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#c6894c]/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#c6894c]/20 text-[#e5ab6b] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-[#faf6f0]">
                  Owner Portal • {CAFE_INFO.name}
                </h3>
                <p className="text-xs text-[#c6894c]">
                  Proprietor: {CAFE_INFO.owner} | Phone: {CAFE_INFO.phoneFormatted}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-2 text-[#a89080] hover:text-white rounded-full hover:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Metrics Quick Strip */}
          <div className="grid grid-cols-3 gap-3 my-4">
            <div className="bg-[#120b08] p-3.5 rounded-2xl border border-white/5">
              <div className="text-[10px] text-[#887060] uppercase tracking-wider">Total Orders</div>
              <div className="text-xl font-display font-bold text-[#faf6f0] mt-0.5">{orders.length}</div>
            </div>
            <div className="bg-[#120b08] p-3.5 rounded-2xl border border-white/5">
              <div className="text-[10px] text-[#887060] uppercase tracking-wider">Booked Tables</div>
              <div className="text-xl font-display font-bold text-[#e5ab6b] mt-0.5">{reservations.length}</div>
            </div>
            <div className="bg-[#120b08] p-3.5 rounded-2xl border border-white/5">
              <div className="text-[10px] text-[#887060] uppercase tracking-wider">Estimated Revenue</div>
              <div className="text-xl font-display font-bold text-emerald-400 mt-0.5">₹{totalRevenue}</div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 border-b border-white/10 pb-3 mb-4">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'orders'
                  ? 'bg-[#c6894c] text-[#120b08]'
                  : 'text-[#a89080] hover:text-white bg-[#120b08]'
              }`}
            >
              Live Kitchen Orders ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('reservations')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'reservations'
                  ? 'bg-[#c6894c] text-[#120b08]'
                  : 'text-[#a89080] hover:text-white bg-[#120b08]'
              }`}
            >
              Table Reservations ({reservations.length})
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-1">
            {activeTab === 'orders' ? (
              orders.length === 0 ? (
                <div className="text-center py-12 text-[#a89080] text-xs">
                  No orders placed in this session yet.
                </div>
              ) : (
                orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 rounded-2xl bg-[#1a100a] border border-white/10 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-sm text-[#e5ab6b]">
                            {order.id}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded bg-[#120b08] text-[#a89080] border border-white/5">
                            {order.deliveryType === 'delivery' ? '🛵 Delivery' : '🏮 Pickup'}
                          </span>
                          <span className="text-xs text-[#887060]">
                            {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <div className="text-xs text-[#faf6f0] mt-1">
                          Customer: <strong>{order.customer.name}</strong> • Phone:{' '}
                          <a href={`tel:${order.customer.phone}`} className="text-[#e5ab6b] underline">
                            {order.customer.phone}
                          </a>
                        </div>
                        {order.customer.address && (
                          <div className="text-[11px] text-[#a89080] mt-0.5">
                            Address: {order.customer.address} ({order.customer.landmark || 'Merta City'})
                          </div>
                        )}
                      </div>

                      <div className="text-right">
                        <div className="text-base font-bold text-[#faf6f0]">₹{order.total}</div>
                        <div className="text-[10px] text-[#a89080] uppercase">{order.paymentMethod}</div>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="p-2.5 rounded-xl bg-[#120b08] text-xs space-y-1 text-[#d5c3b2]">
                      {order.items.map((it, i) => (
                        <div key={i} className="flex justify-between">
                          <span>{it.quantity}x {it.item.name} ({it.customization.size}, {it.customization.temperature})</span>
                          <span>₹{it.totalPrice}</span>
                        </div>
                      ))}
                    </div>

                    {/* Order Status Control Buttons */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[11px] text-[#887060] mr-1">Update Status:</span>
                      {statusOptions.map((st) => (
                        <button
                          key={st}
                          onClick={() => updateOrderStatus(order.id, st)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                            order.status === st
                              ? 'bg-gradient-to-r from-[#c6894c] to-[#e5ab6b] text-[#120b08] shadow'
                              : 'bg-[#120b08] border border-white/5 text-[#a89080] hover:text-white'
                          }`}
                        >
                          {st.replace('_', ' ').toUpperCase()}
                        </button>
                      ))}
                    </div>

                  </div>
                ))
              )
            ) : (
              reservations.length === 0 ? (
                <div className="text-center py-12 text-[#a89080] text-xs">
                  No reservations received yet.
                </div>
              ) : (
                reservations.map((res) => (
                  <div
                    key={res.id}
                    className="p-4 rounded-2xl bg-[#1a100a] border border-white/10 flex flex-col sm:flex-row justify-between sm:items-center gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm text-[#e5ab6b]">{res.id}</span>
                        <span className="text-xs text-emerald-400 font-semibold">Confirmed</span>
                      </div>
                      <div className="text-sm font-bold text-[#faf6f0] mt-0.5">
                        {res.name} — {res.guests} Guests
                      </div>
                      <div className="text-xs text-[#a89080] mt-0.5">
                        📅 {res.date} at {res.time} • 🏮 {res.tablePreference}
                      </div>
                      {res.specialRequest && (
                        <div className="text-xs text-[#c6894c] mt-1">
                          Note: "{res.specialRequest}"
                        </div>
                      )}
                    </div>

                    <div className="flex sm:flex-col gap-2">
                      <a
                        href={`tel:${res.phone}`}
                        className="px-3 py-1.5 rounded-xl bg-[#c6894c] text-[#120b08] text-xs font-bold text-center"
                      >
                        Call ({res.phone})
                      </a>
                      <a
                        href={`https://wa.me/91${res.phone}?text=Hello%20${res.name},%20your%20table%20at%20Lal%20Ten%20Cafe%20is%20reserved!`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-emerald-700 text-white text-xs font-bold text-center"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                ))
              )
            )}
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-white/10 text-center text-xs text-[#887060]">
            Lal Ten Cafe Kitchen Terminal • Merta City (Opp. GVT College)
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
