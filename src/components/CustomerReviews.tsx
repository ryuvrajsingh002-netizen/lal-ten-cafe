import React, { useState } from 'react';
import { useCafe } from '../context/CafeContext';
import { CUSTOMER_REVIEWS } from '../data/cafeData';
import { CustomerReview } from '../types';
import { Star, MessageSquarePlus, CheckCircle2, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CustomerReviews: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<CustomerReview[]>(CUSTOMER_REVIEWS);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    role: 'Cafe Guest',
    rating: 5,
    comment: '',
  });

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.comment.trim()) {
      alert('Please enter your name and comments.');
      return;
    }

    const created: CustomerReview = {
      id: `rev-${Date.now()}`,
      name: newReview.name,
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop`,
      role: newReview.role || 'Guest in Merta City',
      rating: newReview.rating,
      comment: newReview.comment,
      date: 'Just now',
      verified: true,
    };

    setReviewsList([created, ...reviewsList]);
    setIsWriteModalOpen(false);
    setNewReview({ name: '', role: 'Cafe Guest', rating: 5, comment: '' });
  };

  return (
    <section id="reviews" className="py-24 bg-[#140c08] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Overall Rating Summary */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#c6894c]/20 text-[#e5ab6b] text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Google Verified Reviews</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#faf6f0]">
              Loved by Merta City
            </h2>
            <p className="text-sm sm:text-base text-[#c4b1a1] mt-2 font-light">
              Here is what coffee lovers, college students, and families say about Lal Ten Cafe.
            </p>
          </div>

          {/* Rating Summary Box & Write Review Trigger */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3 bg-[#1e130d] p-3 rounded-2xl border border-[#c6894c]/30">
              <div className="text-3xl font-display font-bold text-[#e5ab6b]">4.9</div>
              <div>
                <div className="flex text-[#f5ba73]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <div className="text-[11px] text-[#a89080] mt-0.5">Based on 850+ reviews</div>
              </div>
            </div>

            <button
              onClick={() => setIsWriteModalOpen(true)}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#c6894c] to-[#e5ab6b] text-[#120b08] text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow hover:scale-[1.02] transition-all cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reviewsList.map((rev) => (
            <div
              key={rev.id}
              className="coffee-glass-card rounded-3xl p-6 sm:p-7 border border-[#c6894c]/20 hover:border-[#c6894c]/50 flex flex-col justify-between transition-all duration-300 shadow-lg"
            >
              <div>
                {/* Header: Avatar, Name, Rating */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.avatar}
                      alt={rev.name}
                      referrerPolicy="no-referrer"
                      className="w-11 h-11 rounded-full object-cover border border-[#c6894c]/40"
                    />
                    <div>
                      <div className="font-semibold text-sm text-[#faf6f0] flex items-center gap-1.5">
                        <span>{rev.name}</span>
                        {rev.verified && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" title="Verified Customer" />
                        )}
                      </div>
                      <div className="text-[11px] text-[#a89080]">{rev.role}</div>
                    </div>
                  </div>

                  <div className="flex text-[#f5ba73]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-[#d5c3b2] font-light leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Date */}
              <div className="mt-5 pt-3 border-t border-white/5 text-[11px] text-[#887060]">
                {rev.date}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Write a Review Modal */}
      <AnimatePresence>
        {isWriteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsWriteModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-[#241710] border border-[#c6894c]/40 rounded-3xl p-6 z-10 text-[#f5ece3] shadow-2xl"
            >
              <button
                onClick={() => setIsWriteModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 text-[#a89080] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-display font-bold text-[#faf6f0]">
                Share Your Experience
              </h3>
              <p className="text-xs text-[#a89080] mt-1">
                How was your coffee & time at Lal Ten Cafe?
              </p>

              <form onSubmit={handleAddReview} className="mt-5 space-y-4">
                {/* Rating Selector */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#c6894c] block mb-1.5">
                    Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className="p-1 text-2xl hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= newReview.rating
                              ? 'text-[#f5ba73] fill-current'
                              : 'text-white/20'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#c6894c] block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    placeholder="E.g. Vikram Singh"
                    className="w-full bg-[#140c08] border border-white/10 rounded-xl py-2.5 px-3.5 text-xs text-[#faf6f0] focus:outline-none focus:border-[#c6894c]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#c6894c] block mb-1">
                    Tag / Role
                  </label>
                  <input
                    type="text"
                    value={newReview.role}
                    onChange={(e) => setNewReview({ ...newReview, role: e.target.value })}
                    placeholder="E.g. GVT College Student / Coffee Lover"
                    className="w-full bg-[#140c08] border border-white/10 rounded-xl py-2.5 px-3.5 text-xs text-[#faf6f0] focus:outline-none focus:border-[#c6894c]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#c6894c] block mb-1">
                    Your Review *
                  </label>
                  <textarea
                    required
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    placeholder="Describe the coffee taste, ambient lights, hospitality..."
                    rows={3}
                    className="w-full bg-[#140c08] border border-white/10 rounded-xl p-3 text-xs text-[#faf6f0] focus:outline-none focus:border-[#c6894c]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#c6894c] to-[#e5ab6b] text-[#120b08] text-xs font-bold uppercase tracking-wider shadow hover:scale-[1.01] transition-all"
                >
                  Submit Review
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
