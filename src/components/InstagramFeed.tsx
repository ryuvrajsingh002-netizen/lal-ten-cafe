import React from 'react';
import { INSTAGRAM_POSTS, CAFE_INFO } from '../data/cafeData';
import { Instagram, Heart, MessageCircle } from 'lucide-react';

export const InstagramFeed: React.FC = () => {
  return (
    <section className="py-20 bg-[#120b08] border-t border-b border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c6894c]/20 text-[#e5ab6b] text-xs font-semibold uppercase tracking-wider mb-2">
            <Instagram className="w-3.5 h-3.5" />
            <span>@lalten.cafe</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#faf6f0]">
            Follow Our Coffee Journey
          </h2>
          <p className="text-xs sm:text-sm text-[#a89080] mt-1.5 font-light">
            Tag us in your stories with <strong>#LalTenCafe</strong> & <strong>#SukunKaDoosraNaam</strong>
          </p>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href={CAFE_INFO.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square rounded-2xl overflow-hidden group shadow-md border border-white/5"
            >
              <img
                src={post.image}
                alt="Instagram post from Lal Ten Cafe"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-[#120b08]/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 text-white p-2 text-center">
                <Instagram className="w-5 h-5 text-[#f5ba73]" />
                <div className="flex items-center gap-1 text-xs font-semibold text-[#faf6f0]">
                  <Heart className="w-3.5 h-3.5 fill-current text-red-400" />
                  <span>{post.likes}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href={CAFE_INFO.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#c6894c]/50 hover:bg-[#c6894c] hover:text-[#120b08] text-xs font-bold text-[#faf6f0] transition-all"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow @lalten.cafe on Instagram</span>
          </a>
        </div>

      </div>
    </section>
  );
};
