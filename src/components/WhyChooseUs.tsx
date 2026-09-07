import React from 'react';
import { Coffee, ShieldCheck, Heart, Zap, Sparkles, Wifi } from 'lucide-react';
import { motion } from 'motion/react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: <Coffee className="w-6 h-6 text-[#e5ab6b]" />,
      title: 'Freshly Brewed Every Day',
      desc: 'Selected Arabica beans freshly ground and brewed per order for unparalleled richness and aroma.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#e5ab6b]" />,
      title: '100% Quality Ingredients',
      desc: 'Pure dairy, organic whole-leaf teas, authentic spices and artisanal syrups without artificial fillers.'
    },
    {
      icon: <Heart className="w-6 h-6 text-[#e5ab6b]" />,
      title: 'Made With Pure Passion',
      desc: 'Our signature motto: "Chai ki Chuski, Dil ki Khushi". Every cup is crafted with personal care.'
    },
    {
      icon: <Zap className="w-6 h-6 text-[#e5ab6b]" />,
      title: 'Quick & Hot Delivery',
      desc: 'Insulated packaging delivers your piping hot tea and coffee fresh to any doorstep in Merta City.'
    },
    {
      icon: <Sparkles className="w-6 h-6 text-[#e5ab6b]" />,
      title: 'Cozy Lantern Atmosphere',
      desc: 'Rustic bamboo decor, warm golden glow, comfortable seating and soothing background music.'
    },
    {
      icon: <Wifi className="w-6 h-6 text-[#e5ab6b]" />,
      title: 'Free High-Speed Wi-Fi',
      desc: 'Study, work on your laptop, or catch up with friends with dependable fast connectivity.'
    },
  ];

  return (
    <section className="py-24 bg-[#140c08] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#c6894c] font-semibold">
            The Lal Ten Experience
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#faf6f0] mt-1">
            Why You'll Love Us
          </h2>
          <p className="text-sm sm:text-base text-[#c4b1a1] mt-3 font-light">
            We are more than just a cafe — we are Merta City's favorite hangout for conversation, coffee, and comfort.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((f, idx) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="coffee-glass-card rounded-3xl p-7 border border-[#c6894c]/20 hover:border-[#c6894c]/60 shadow-lg group transition-all duration-300 relative"
            >
              {/* Icon Bubble */}
              <div className="w-12 h-12 rounded-2xl bg-[#241710] border border-[#c6894c]/30 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:border-[#e5ab6b] transition-all">
                {f.icon}
              </div>

              <h3 className="text-xl font-display font-bold text-[#faf6f0] group-hover:text-[#e5ab6b] transition-colors">
                {f.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#c4b1a1] mt-2.5 font-light leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
