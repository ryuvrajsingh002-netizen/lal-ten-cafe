import React, { useState } from 'react';
import { CAFE_INFO } from '../data/cafeData';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const quickMessages = [
    'Hi Sumit, I want to order coffee!',
    'Do you have tables available right now?',
    'What is today\'s special menu?',
    'Can I get home delivery near GVT College?',
  ];

  const handleSendMessage = (msg: string) => {
    const url = `https://wa.me/918209389020?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-20 sm:bottom-8 right-4 sm:right-8 z-40 flex flex-col items-end">
      {/* Expanded Quick Chat Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 15 }}
            className="mb-3 w-72 sm:w-80 bg-[#1e130d] border border-[#c6894c]/40 rounded-3xl p-4 shadow-2xl text-[#f5ece3] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-black flex items-center justify-center font-bold text-sm">
                  🏮
                </div>
                <div>
                  <div className="text-xs font-bold text-[#faf6f0]">{CAFE_INFO.name}</div>
                  <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Online • Sumit Soni</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="text-[#a89080] hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat greeting */}
            <div className="py-3 text-xs text-[#d5c3b2] leading-relaxed">
              Hello! Welcome to Lal Ten Cafe. How can we serve you today?
            </div>

            {/* Quick choices */}
            <div className="space-y-1.5">
              {quickMessages.map((msg, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(msg)}
                  className="w-full text-left p-2 rounded-xl bg-[#140c08] hover:bg-[#c6894c]/20 hover:border-[#c6894c] border border-white/5 text-[11px] text-[#faf6f0] transition-colors"
                >
                  💬 {msg}
                </button>
              ))}
            </div>

            <div className="mt-3 pt-2 text-center">
              <a
                href="https://wa.me/918209389020"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-[#e5ab6b] font-medium hover:underline block"
              >
                Open full WhatsApp conversation →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group p-4 rounded-full bg-[#25D366] text-white shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-emerald-950"
        aria-label="Chat with Lal Ten Cafe on WhatsApp"
        id="floating-whatsapp-btn"
      >
        <MessageCircle className="w-7 h-7 fill-current" />
        
        {/* Pulsing notification dot */}
        <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-white animate-pulse"></span>

        {/* Hover Tooltip on desktop */}
        <span className="hidden sm:block absolute right-16 px-3 py-1.5 rounded-xl bg-[#120b08] border border-[#c6894c]/40 text-xs font-semibold text-[#faf6f0] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
          Order or Chat on WhatsApp ☕
        </span>
      </button>
    </div>
  );
};
