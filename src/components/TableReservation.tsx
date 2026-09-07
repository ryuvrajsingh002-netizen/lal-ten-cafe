import React, { useState } from 'react';
import { useCafe } from '../context/CafeContext';
import { CAFE_INFO } from '../data/cafeData';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  User, 
  Phone, 
  Mail, 
  Sparkles, 
  CheckCircle2, 
  MessageCircle,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

export const TableReservation: React.FC = () => {
  const { 
    isReservationOpen, 
    setIsReservationOpen, 
    addReservation,
    latestReservation,
    setLatestReservation 
  } = useCafe();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: new Date().toISOString().split('T')[0],
    time: '06:00 PM',
    guests: 2,
    tablePreference: 'Cozy Lantern Corner',
    specialRequest: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Please fill in your Name and Mobile Number.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#c6894c', '#e5ab6b', '#ffffff']
      });

      addReservation(formData);
      setIsSubmitting(false);
    }, 500);
  };

  const getWhatsAppReservationUrl = () => {
    if (!latestReservation) return '';
    const text = `Hi Sumit, I have booked a table at Lal Ten Cafe!\n\n` +
      `📌 Reservation ID: ${latestReservation.id}\n` +
      `👤 Name: ${latestReservation.name}\n` +
      `📞 Phone: ${latestReservation.phone}\n` +
      `📅 Date: ${latestReservation.date} at ${latestReservation.time}\n` +
      `👥 Guests: ${latestReservation.guests} Persons\n` +
      `🏮 Table Preference: ${latestReservation.tablePreference}\n` +
      (latestReservation.specialRequest ? `✨ Request: ${latestReservation.specialRequest}\n` : '') +
      `\nPlease confirm our table at Lal Ten Cafe, Merta City. Thank you!`;
    return `https://wa.me/918209389020?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="book-table" className="py-24 bg-[#140c08] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c6894c]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Card */}
        <div className="bg-gradient-to-b from-[#241710] to-[#180f0b] border border-[#c6894c]/30 rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl relative overflow-hidden">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#c6894c]/20 text-[#e5ab6b] text-xs font-semibold uppercase tracking-wider mb-3">
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>Cozy Seating Guaranteed</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#faf6f0]">
              Reserve Your Table
            </h2>
            <p className="text-sm sm:text-base text-[#c4b1a1] mt-3 font-light leading-relaxed">
              Planning a coffee date, friends reunion, or study session? Reserve a spot under our warm glowing lanterns at <strong className="text-[#faf6f0]">Lal Ten Cafe</strong>.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#c6894c]">
                  Your Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#887060]" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="E.g. Rahul Sharma"
                    className="w-full bg-[#120b08] border border-white/10 rounded-xl py-3 pl-10 pr-3 text-xs sm:text-sm text-[#faf6f0] placeholder-[#887060] focus:outline-none focus:border-[#c6894c]"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#c6894c]">
                  Mobile Number (WhatsApp) *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#887060]" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="E.g. 9876543210"
                    className="w-full bg-[#120b08] border border-white/10 rounded-xl py-3 pl-10 pr-3 text-xs sm:text-sm text-[#faf6f0] placeholder-[#887060] focus:outline-none focus:border-[#c6894c]"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#c6894c]">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#887060]" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="E.g. rahul@gmail.com"
                    className="w-full bg-[#120b08] border border-white/10 rounded-xl py-3 pl-10 pr-3 text-xs sm:text-sm text-[#faf6f0] placeholder-[#887060] focus:outline-none focus:border-[#c6894c]"
                  />
                </div>
              </div>

              {/* Date */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#c6894c]">
                  Reservation Date *
                </label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#887060]" />
                  <input
                    type="date"
                    required
                    value={formData.date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-[#120b08] border border-white/10 rounded-xl py-3 pl-10 pr-3 text-xs sm:text-sm text-[#faf6f0] focus:outline-none focus:border-[#c6894c]"
                  />
                </div>
              </div>

              {/* Time Slot */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#c6894c]">
                  Time Slot *
                </label>
                <div className="relative">
                  <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#887060]" />
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full bg-[#120b08] border border-white/10 rounded-xl py-3 pl-10 pr-3 text-xs sm:text-sm text-[#faf6f0] focus:outline-none focus:border-[#c6894c]"
                  >
                    <option value="10:00 AM">10:00 AM (Morning Brew)</option>
                    <option value="12:00 PM">12:00 PM (Lunch Hour)</option>
                    <option value="02:00 PM">02:00 PM (Afternoon Study)</option>
                    <option value="04:00 PM">04:00 PM (Tea & Snacks)</option>
                    <option value="06:00 PM">06:00 PM (Evening Hangout)</option>
                    <option value="07:30 PM">07:30 PM (Dinner & Vibe)</option>
                    <option value="09:00 PM">09:00 PM (Late Night Chill)</option>
                    <option value="10:00 PM">10:00 PM (Night Owl Coffee)</option>
                  </select>
                </div>
              </div>

              {/* Number of Guests */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#c6894c]">
                  Number of Guests *
                </label>
                <div className="relative">
                  <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#887060]" />
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                    className="w-full bg-[#120b08] border border-white/10 rounded-xl py-3 pl-10 pr-3 text-xs sm:text-sm text-[#faf6f0] focus:outline-none focus:border-[#c6894c]"
                  >
                    <option value="1">1 Person (Solo Work)</option>
                    <option value="2">2 Persons (Table for Two)</option>
                    <option value="3">3 Persons</option>
                    <option value="4">4 Persons (Standard Group)</option>
                    <option value="6">6 Persons (Friends Circle)</option>
                    <option value="8">8+ Persons (Party Celebration)</option>
                  </select>
                </div>
              </div>

            </div>

            {/* Table Preference & Occasion */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#c6894c]">
                  Seating Area Preference
                </label>
                <select
                  value={formData.tablePreference}
                  onChange={(e) => setFormData({ ...formData, tablePreference: e.target.value })}
                  className="w-full bg-[#120b08] border border-white/10 rounded-xl py-3 px-3 text-xs sm:text-sm text-[#faf6f0] focus:outline-none focus:border-[#c6894c]"
                >
                  <option value="Cozy Lantern Corner">🏮 Cozy Lantern Corner (Romantic/Quiet)</option>
                  <option value="Open-Air Balcony / Storefront">🌿 Open-Air / Storefront View</option>
                  <option value="Study & Laptop Desk">💻 Study & Laptop Corner (Power outlet)</option>
                  <option value="Group Celebration Lounge">🎉 Group Celebration Lounge</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#c6894c]">
                  Special Occasion or Notes (Optional)
                </label>
                <input
                  type="text"
                  value={formData.specialRequest}
                  onChange={(e) => setFormData({ ...formData, specialRequest: e.target.value })}
                  placeholder="E.g. Birthday cake surprise, quiet meeting, etc."
                  className="w-full bg-[#120b08] border border-white/10 rounded-xl py-3 px-3 text-xs sm:text-sm text-[#faf6f0] placeholder-[#887060] focus:outline-none focus:border-[#c6894c]"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-10 py-4 rounded-full bg-gradient-to-r from-[#c6894c] via-[#d49757] to-[#e5ab6b] text-[#120b08] text-sm font-bold tracking-wider uppercase hover:shadow-xl hover:shadow-[#c6894c]/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                id="submit-reservation-btn"
              >
                {isSubmitting ? 'Reserving Your Table...' : 'CONFIRM TABLE RESERVATION 🏮'}
              </button>
              <p className="text-[11px] text-[#a89080] mt-2">
                No reservation fee required • Instant confirmation via WhatsApp & SMS
              </p>
            </div>

          </form>

        </div>

      </div>

      {/* Reservation Success Modal Popup */}
      <AnimatePresence>
        {latestReservation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLatestReservation(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-[#241710] border border-[#c6894c]/50 rounded-3xl p-6 text-center z-10 text-[#f5ece3] shadow-2xl"
            >
              <button
                onClick={() => setLatestReservation(null)}
                className="absolute top-4 right-4 p-1.5 text-[#a89080] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 rounded-full bg-emerald-500 text-black mx-auto flex items-center justify-center font-bold text-2xl mb-4">
                ✓
              </div>

              <h3 className="text-2xl font-display font-bold text-[#faf6f0]">
                Table Reserved! 🏮
              </h3>

              <p className="text-xs text-[#d5c3b2] mt-1.5">
                We're excited to host you, <strong className="text-[#faf6f0]">{latestReservation.name}</strong>!
              </p>

              <div className="my-5 p-4 rounded-2xl bg-[#140c08] border border-white/10 text-left text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[#887060]">Booking ID:</span>
                  <span className="font-mono font-bold text-[#e5ab6b]">{latestReservation.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#887060]">Date & Time:</span>
                  <span className="text-[#faf6f0]">{latestReservation.date} at {latestReservation.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#887060]">Guests:</span>
                  <span className="text-[#faf6f0]">{latestReservation.guests} Persons</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#887060]">Preference:</span>
                  <span className="text-[#faf6f0]">{latestReservation.tablePreference}</span>
                </div>
              </div>

              <div className="space-y-2">
                <a
                  href={getWhatsAppReservationUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Send Confirmation on WhatsApp</span>
                </a>

                <button
                  onClick={() => setLatestReservation(null)}
                  className="w-full py-2.5 rounded-xl border border-white/10 text-xs font-medium text-[#a89080] hover:text-white"
                >
                  Close
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
