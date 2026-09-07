import React from 'react';
import { CafeProvider } from './context/CafeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SpecialCoffee } from './components/SpecialCoffee';
import { BestSellers } from './components/BestSellers';
import { DigitalMenu } from './components/DigitalMenu';
import { OurStory } from './components/OurStory';
import { TopCategories } from './components/TopCategories';
import { SpecialOffers } from './components/SpecialOffers';
import { TableReservation } from './components/TableReservation';
import { WhyChooseUs } from './components/WhyChooseUs';
import { CafeGallery } from './components/CafeGallery';
import { CustomerReviews } from './components/CustomerReviews';
import { InstagramFeed } from './components/InstagramFeed';
import { LocationContact } from './components/LocationContact';
import { Footer } from './components/Footer';

// Modals and Overlays
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { AdminModal } from './components/AdminModal';
import { SearchModal } from './components/SearchModal';
import { ToastContainer } from './components/ToastContainer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { MobileBottomNav } from './components/MobileBottomNav';

export default function App() {
  return (
    <CafeProvider>
      <div className="min-h-screen bg-[#120b08] text-[#f5ece3] font-body selection:bg-[#c6894c] selection:text-[#120b08] overflow-x-hidden">
        
        {/* Sticky Global Navigation */}
        <Navbar />

        {/* Main Sections */}
        <main>
          {/* 1. Cinematic Fullscreen Hero */}
          <Hero />

          {/* 2. Visual Overlapping Special Coffee Gallery (Inspired directly by reference design) */}
          <SpecialCoffee />

          {/* 3. Customer Favourites / Best Sellers */}
          <BestSellers />

          {/* 4. Complete Interactive Digital Menu with Categories & Search */}
          <DigitalMenu />

          {/* 5. Our Story & Authentic Merta Storefront Spotlight */}
          <OurStory />

          {/* 6. Top Categories with Editorial Photo Cards */}
          <TopCategories />

          {/* 7. Special Offers & Live Countdown */}
          <SpecialOffers />

          {/* 8. Table Reservation & Booking Engine */}
          <TableReservation />

          {/* 9. Why Choose Us (6 Premium Quality Pillars) */}
          <WhyChooseUs />

          {/* 10. High-Resolution Gallery with Lightbox */}
          <CafeGallery />

          {/* 11. Customer Reviews & Testimonials */}
          <CustomerReviews />

          {/* 12. Instagram Gallery Grid */}
          <InstagramFeed />

          {/* 13. Location, Maps & Contact Information */}
          <LocationContact />
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Interactive Modals and Drawers */}
        <ProductModal />
        <CartDrawer />
        <CheckoutModal />
        <OrderConfirmationModal />
        <OrderTrackingModal />
        <AdminModal />
        <SearchModal />
        <ToastContainer />

        {/* Floating Utilities */}
        <FloatingWhatsApp />
        <MobileBottomNav />

      </div>
    </CafeProvider>
  );
}
