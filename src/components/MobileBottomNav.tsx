import React from 'react';
import { useCafe } from '../context/CafeContext';
import { CAFE_INFO } from '../data/cafeData';
import { Home, Coffee, ShoppingBag, Calendar, Phone } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { cartCount, setIsCartOpen, setIsReservationOpen, setSelectedCategory } = useCafe();

  const handleGoMenu = () => {
    setSelectedCategory('All');
    const el = document.getElementById('menu');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleGoHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-30 sm:hidden bg-[#160e0a]/95 backdrop-blur-lg border-t border-[#c6894c]/20 py-2 px-3 flex items-center justify-around shadow-2xl">
      <button
        onClick={handleGoHome}
        className="flex flex-col items-center text-[#a89080] hover:text-[#e5ab6b] py-1 transition-colors"
      >
        <Home className="w-5 h-5" />
        <span className="text-[10px] mt-1 font-medium">Home</span>
      </button>

      <button
        onClick={handleGoMenu}
        className="flex flex-col items-center text-[#a89080] hover:text-[#e5ab6b] py-1 transition-colors"
      >
        <Coffee className="w-5 h-5" />
        <span className="text-[10px] mt-1 font-medium">Menu</span>
      </button>

      <button
        onClick={() => setIsCartOpen(true)}
        className="relative flex flex-col items-center text-[#a89080] hover:text-[#e5ab6b] py-1 transition-colors"
      >
        <div className="relative">
          <ShoppingBag className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-gradient-to-r from-[#c6894c] to-[#e5ab6b] text-[#120b08] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>
        <span className="text-[10px] mt-1 font-medium">Tray</span>
      </button>

      <button
        onClick={() => setIsReservationOpen(true)}
        className="flex flex-col items-center text-[#a89080] hover:text-[#e5ab6b] py-1 transition-colors"
      >
        <Calendar className="w-5 h-5" />
        <span className="text-[10px] mt-1 font-medium">Table</span>
      </button>

      <a
        href={`tel:${CAFE_INFO.phone}`}
        className="flex flex-col items-center text-[#d49757] hover:text-[#f5ece3] py-1 transition-colors"
      >
        <Phone className="w-5 h-5" />
        <span className="text-[10px] mt-1 font-medium">Call</span>
      </a>
    </div>
  );
};
