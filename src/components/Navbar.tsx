import React, { useState, useEffect } from 'react';
import { useCafe } from '../context/CafeContext';
import { CAFE_INFO } from '../data/cafeData';
import { 
  Search, 
  ShoppingBag, 
  Menu as MenuIcon, 
  X, 
  Phone, 
  Flame, 
  Calendar,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    cartCount, 
    setIsCartOpen, 
    setIsReservationOpen, 
    setIsCheckoutOpen,
    setIsSearchOpen,
    setIsAdminOpen,
    setSelectedCategory
  } = useCafe();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Special Coffee', href: '#special-coffee' },
    { name: 'Menu', href: '#menu' },
    { name: 'Our Story', href: '#our-story' },
    { name: 'Categories', href: '#categories' },
    { name: 'Offers', href: '#offers' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Top micro announcement bar */}
      <div className="bg-[#1e130d] border-b border-[#c6894c]/20 py-1.5 px-4 text-xs text-[#e8d8c8] flex justify-between items-center z-50 relative">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-medium text-[#f5ece3]">
            {CAFE_INFO.tagline} • Merta City (Opp. GVT College)
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[#d49757]">
          <a 
            href={`tel:${CAFE_INFO.phone}`} 
            className="flex items-center gap-1.5 hover:text-[#f5ece3] transition-colors"
          >
            <Phone className="w-3 h-3" />
            <span>{CAFE_INFO.phoneFormatted}</span>
          </a>
          <button 
            onClick={() => setIsAdminOpen(true)}
            className="flex items-center gap-1 text-[11px] bg-[#3a251a] hover:bg-[#c6894c] hover:text-[#120b08] px-2 py-0.5 rounded text-[#e5ab6b] transition-colors"
            title="Cafe Manager Dashboard"
          >
            <ShieldCheck className="w-3 h-3" />
            <span>Owner Portal</span>
          </button>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header 
        className={`sticky top-0 w-full z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#160e0a]/90 backdrop-blur-md shadow-2xl border-b border-[#c6894c]/20 py-3' 
            : 'bg-gradient-to-b from-[#120b08]/95 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <a 
            href="#hero" 
            className="flex items-center gap-3 group focus:outline-none"
            id="brand-logo"
          >
            {/* Custom Glowing Lantern Icon */}
            <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-[#c6894c] to-[#3d2417] p-0.5 shadow-lg shadow-[#c6894c]/20 group-hover:shadow-[#c6894c]/40 transition-all">
              <div className="w-full h-full rounded-full bg-[#1c120c] flex items-center justify-center relative overflow-hidden">
                {/* SVG Lantern Graphic */}
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#f5ba73] animate-lantern fill-current">
                  <path d="M12 2a2 2 0 0 0-2 2v1H8a1 1 0 0 0-1 1v1h10V6a1 1 0 0 0-1-1h-2V4a2 2 0 0 0-2-2zm-5 7v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9H7zm5 8a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm-3 4h6v1H9v-1z" />
                </svg>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="font-brand font-bold text-xl sm:text-2xl tracking-wider text-[#f5ece3] group-hover:text-[#e5ab6b] transition-colors leading-none">
                {CAFE_INFO.name}
              </span>
              <span className="text-[11px] font-medium tracking-widest text-[#c6894c] flex items-center gap-1.5 mt-0.5">
                <span>{CAFE_INFO.hindiName}</span>
                <span className="inline-block w-1 h-1 rounded-full bg-[#c6894c]"></span>
                <span className="text-[#a89080]">Merta City</span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-[#e8d8c8]/90 hover:text-[#e5ab6b] transition-colors relative py-1 group focus:outline-none"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#c6894c] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 rounded-full text-[#e8d8c8] hover:text-[#f5ba73] hover:bg-[#2b1a12] transition-colors focus:outline-none"
              aria-label="Search Menu"
              id="search-button"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Cart Trigger with Animated Badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full text-[#e8d8c8] hover:text-[#f5ba73] hover:bg-[#2b1a12] transition-colors focus:outline-none"
              aria-label="View Shopping Cart"
              id="cart-button"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-gradient-to-r from-[#d49757] to-[#e5ab6b] text-[#120b08] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Book Table Button (Desktop) */}
            <button
              onClick={() => setIsReservationOpen(true)}
              className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#c6894c]/40 text-xs font-semibold text-[#f5ece3] hover:bg-[#c6894c]/15 hover:border-[#c6894c] transition-all"
              id="nav-book-table-btn"
            >
              <Calendar className="w-3.5 h-3.5 text-[#e5ab6b]" />
              <span>Book Table</span>
            </button>

            {/* Primary Order Now CTA */}
            <button
              onClick={() => {
                if (cartCount > 0) {
                  setIsCheckoutOpen(true);
                } else {
                  setSelectedCategory('All');
                  const menuEl = document.getElementById('menu');
                  menuEl?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#c6894c] to-[#e5ab6b] text-[#120b08] text-xs font-bold tracking-wider uppercase hover:shadow-lg hover:shadow-[#c6894c]/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
              id="nav-order-now-btn"
            >
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>Order Now</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#e8d8c8] hover:text-[#f5ba73] hover:bg-[#2b1a12] transition-colors focus:outline-none"
              aria-label="Toggle menu"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-between bg-[#120b08]/98 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="p-4 border-b border-[#c6894c]/20 flex justify-between items-center">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#2b1a12] flex items-center justify-center text-[#f5ba73]">
                🏮
              </div>
              <span className="font-brand font-bold text-lg text-[#f5ece3]">
                {CAFE_INFO.name}
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg text-[#e8d8c8] hover:bg-[#2b1a12]"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 space-y-4 overflow-y-auto flex-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-lg font-medium text-[#e8d8c8] hover:text-[#e5ab6b] py-2 border-b border-white/5"
              >
                {link.name}
              </a>
            ))}

            <div className="pt-4 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsReservationOpen(true);
                }}
                className="w-full py-3 rounded-xl border border-[#c6894c] text-sm font-semibold text-[#f5ece3] flex items-center justify-center gap-2 hover:bg-[#c6894c]/10"
              >
                <Calendar className="w-4 h-4 text-[#e5ab6b]" />
                <span>Book a Table</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsCartOpen(true);
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#c6894c] to-[#e5ab6b] text-[#120b08] text-sm font-bold flex items-center justify-center gap-2 shadow-lg"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>View Tray ({cartCount} items)</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAdminOpen(true);
                }}
                className="w-full py-2.5 text-xs text-[#a89080] hover:text-[#e5ab6b] flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Owner Portal ({CAFE_INFO.owner})</span>
              </button>
            </div>
          </div>

          <div className="p-4 bg-[#1a100a] border-t border-[#c6894c]/20 text-center text-xs text-[#a89080]">
            <p>{CAFE_INFO.shortAddress}</p>
            <p className="mt-1 text-[#d49757]">Call: {CAFE_INFO.phoneFormatted}</p>
          </div>
        </div>
      )}
    </>
  );
};
