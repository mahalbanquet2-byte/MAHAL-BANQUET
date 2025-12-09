import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, MapPin, Navigation, Quote, Instagram, Facebook, Heart, MessageCircle, Scroll } from 'lucide-react';
import { REVIEWS, COMPANY_ADDRESS, getOptimizedImage } from '../constants';

const About = () => {
  const [currentReview, setCurrentReview] = useState(0);

  // Auto-slide reviews
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % REVIEWS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % REVIEWS.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  const instagramPosts = [
    { id: 1, src: getOptimizedImage("https://i.imgur.com/Tm5NcyQ.jpeg", 'large'), likes: 124, comments: 12 },
    { id: 2, src: getOptimizedImage("https://i.imgur.com/PlzPy7I.jpeg", 'large'), likes: 89, comments: 5 },
    { id: 3, src: getOptimizedImage("https://i.imgur.com/Dr7QFnx.jpeg", 'large'), likes: 256, comments: 34 },
    { id: 4, src: getOptimizedImage("https://i.imgur.com/LWt8wSQ.jpeg", 'large'), likes: 112, comments: 8 },
  ];

  return (
    <div className="pt-24 bg-onyx min-h-screen">
      <div className="container mx-auto px-6 py-12">
        
        {/* Story Section */}
        <section className="mb-24 md:mb-32">
           <motion.div 
             initial={{ opacity: 0, y: 20 }} 
             animate={{ opacity: 1, y: 0 }}
             className="crystal-glass rounded-[2rem] md:rounded-[3rem] p-8 md:p-20 text-center relative overflow-hidden"
           >
             {/* Background Decoration */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold-500/10 rounded-full blur-[100px] pointer-events-none"></div>

             {/* Royal 3D Emblem */}
             <div className="relative w-20 h-20 mx-auto mb-6 perspective-1000">
                <div className="absolute inset-0 bg-gold-500/20 rounded-full blur-xl animate-pulse"></div>
                <div className="w-full h-full relative transform-style-3d animate-[spin_10s_linear_infinite]">
                  <div className="absolute inset-0 rounded-full border border-gold-500/40 border-t-gold-500 border-b-gold-500 shadow-[0_0_15px_rgba(212,175,55,0.2)]"></div>
                  <div className="absolute inset-2 rounded-full border border-gold-500/20 border-l-gold-500 rotate-45"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Scroll size={28} className="text-gold-500 drop-shadow-[0_0_10px_rgba(212,175,55,0.8)] animate-float" />
                </div>
             </div>

             <h1 className="text-4xl md:text-7xl font-cinzel text-ivory mb-8 md:mb-10 drop-shadow-xl">Our Legacy</h1>
             
             <div className="max-w-4xl mx-auto text-base md:text-xl text-white/70 leading-relaxed space-y-6 md:space-y-8 font-light font-serif">
               <p>
                 <span className="text-gold-400">Mahal Banquet</span> is a premium full-service event venue located in Gwarko, Lalitpur, Nepal.
                 It offers elegant banquet halls, professional hospitality, and comprehensive event services suitable for weddings, corporate gatherings, receptions, and family celebrations.
               </p>
               <p>
                 With spacious halls, versatile event arrangements, and a refined multicuisine catering team, Mahal Banquet delivers a polished and memorable experience for every celebration.
               </p>
             </div>
           </motion.div>
        </section>

        {/* Leadership Section */}
        <section className="mb-24 md:mb-32">
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="crystal-glass rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 overflow-hidden relative"
          >
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
              {/* Image */}
              <div className="w-full md:w-1/3 relative">
                 <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 shadow-2xl group relative max-w-sm mx-auto md:max-w-none">
                   <img 
                     src={getOptimizedImage("https://i.imgur.com/ejblp1S.jpeg", 'large')} 
                     alt="Baburaja Maharjan" 
                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                     loading="lazy"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                 </div>
                 {/* Decorative elements */}
                 <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gold-500/10 rounded-full blur-xl"></div>
              </div>

              {/* Text */}
              <div className="w-full md:w-2/3 text-center md:text-left">
                 <span className="text-gold-500 text-xs font-bold uppercase tracking-[0.2em] mb-4 block font-cinzel">Visionary Leadership</span>
                 <h2 className="text-3xl md:text-5xl font-cinzel text-ivory mb-4">Baburaja Maharjan</h2>
                 <p className="text-white/50 text-xs md:text-sm uppercase tracking-widest mb-6 md:mb-8 border-b border-white/10 pb-6 md:pb-8 inline-block">Chairman & Managing Director</p>
                 
                 <div className="space-y-6 text-white/80 leading-relaxed font-light text-base md:text-lg">
                   <p className="font-serif italic text-lg md:text-xl text-white/90">
                     "Every guest is royalty, and every event is a page in history."
                   </p>
                   <p>
                     Mr. Maharjan oversees operations with a meticulous eye for detail, ensuring that Mahal Banquet remains Lalitpur's crown jewel for luxury events. His dedication to excellence sets the standard for our entire team.
                   </p>
                 </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Social Feed Section */}
        <section className="mb-24 md:mb-32">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <span className="text-gold-500 text-xs font-bold uppercase tracking-[0.2em] mb-4 block font-cinzel">Stay Connected</span>
            <h2 className="text-3xl md:text-5xl font-cinzel text-ivory mb-6">Social Highlights</h2>
            <p className="text-white/60 max-w-2xl mx-auto font-light text-sm md:text-base">Follow us for live updates, behind-the-scenes moments, and inspiration from recent events.</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {instagramPosts.map((post) => (
              <motion.div 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative aspect-square overflow-hidden rounded-2xl crystal-glass"
              >
                <img 
                  src={post.src} 
                  alt="Instagram Post" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 text-white">
                  <div className="flex items-center gap-2">
                    <Heart size={20} fill="white" />
                    <span className="font-bold">{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle size={20} fill="white" />
                    <span className="font-bold">{post.comments}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 px-4 md:px-0">
            <a 
              href="https://www.instagram.com/mahal_banquet/" 
              target="_blank" 
              rel="noreferrer"
              className="group relative flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white/5 border border-white/20 backdrop-blur-md hover:bg-white/10 hover:border-white/40 transition-all duration-300 overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.05)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Instagram size={20} className="text-ivory group-hover:scale-110 transition-transform relative z-10" />
              <span className="text-ivory font-cinzel font-bold uppercase tracking-widest text-xs md:text-sm relative z-10">Follow on Instagram</span>
            </a>

            <a 
              href="https://www.facebook.com/profile.php?id=100087978445352" 
              target="_blank" 
              rel="noreferrer"
              className="group relative flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white/5 border border-white/20 backdrop-blur-md hover:bg-white/10 hover:border-white/40 transition-all duration-300 overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.05)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Facebook size={20} className="text-ivory group-hover:scale-110 transition-transform relative z-10" />
              <span className="text-ivory font-cinzel font-bold uppercase tracking-widest text-xs md:text-sm relative z-10">Follow on Facebook</span>
            </a>
          </div>
        </section>

        {/* Map & Reviews Section */}
        <section className="grid lg:grid-cols-2 gap-8 md:gap-12 items-stretch mb-12">
          
          {/* Left: Map */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex flex-col h-full crystal-glass rounded-[2rem] md:rounded-[3rem] p-4 shadow-2xl order-2 lg:order-1"
          >
            <div className="flex-grow relative rounded-[2rem] overflow-hidden min-h-[300px] md:min-h-[400px]">
               <iframe 
                width="100%" 
                height="100%" 
                style={{ border: 0, minHeight: '300px', filter: 'grayscale(0.8) contrast(1.2) invert(0.9)' }} 
                loading="lazy" 
                allowFullScreen 
                src="https://maps.google.com/maps?q=Mahal+Banquet+Gwarko+Lalitpur&t=&z=15&ie=UTF8&iwloc=&output=embed">
              </iframe>
            </div>
            
            <div className="mt-4 flex flex-col md:flex-row justify-between items-center gap-4 px-2 md:px-4 pb-2">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gold-500 text-onyx flex items-center justify-center shadow-lg shadow-gold-500/20 shrink-0">
                  <MapPin size={20} className="md:w-6 md:h-6" />
                </div>
                <div>
                  <h4 className="text-ivory font-cinzel font-bold text-base md:text-lg">Mahal Banquet</h4>
                  <p className="text-white/60 text-xs md:text-sm">{COMPANY_ADDRESS}</p>
                </div>
              </div>
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Mahal+Banquet+Gwarko+Lalitpur" 
                target="_blank" 
                rel="noreferrer"
                className="w-full md:w-auto flex items-center justify-center gap-2 bg-white/5 hover:bg-gold-500 hover:text-onyx text-gold-500 border border-gold-500/30 px-6 py-3 rounded-xl transition-all text-xs font-bold uppercase tracking-widest"
              >
                <Navigation size={14} /> Get Directions
              </a>
            </div>
          </motion.div>

          {/* Right: Reviews Slider */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="crystal-glass rounded-[2rem] md:rounded-[3rem] p-8 md:p-14 relative overflow-hidden flex flex-col justify-center shadow-2xl order-1 lg:order-2"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gold-500/5 rounded-full blur-[80px] translate-x-1/2 -translate-y-1/2"></div>

            <div className="relative z-10 h-full flex flex-col">
              <div className="flex justify-between items-end mb-8 md:mb-12">
                <div>
                   <span className="text-gold-500 text-xs font-bold uppercase tracking-[0.2em] mb-3 block">Guest Experiences</span>
                   <h3 className="text-2xl md:text-4xl font-cinzel text-ivory">Google Reviews</h3>
                </div>
                <div className="flex gap-2 md:gap-3">
                   <button onClick={prevReview} className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:bg-gold-500 hover:text-onyx transition-all">
                     <ChevronLeft size={18} className="md:w-5 md:h-5" />
                   </button>
                   <button onClick={nextReview} className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:bg-gold-500 hover:text-onyx transition-all">
                     <ChevronRight size={18} className="md:w-5 md:h-5" />
                   </button>
                </div>
              </div>

              {/* Slider Container */}
              <div className="relative flex-grow min-h-[250px] md:min-h-[250px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentReview}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5, ease: "circOut" }}
                    className="absolute inset-0 flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-gold-500/20 mb-4">
                        <Quote size={32} className="md:w-10 md:h-10" />
                      </div>
                      <p className="text-white/90 text-lg md:text-2xl leading-relaxed italic font-serif font-light">
                        "{REVIEWS[currentReview].text}"
                      </p>
                    </div>
                    
                    <div>
                      <div className="flex gap-1 text-gold-500 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} fill={i < Math.floor(REVIEWS[currentReview].rating) ? "currentColor" : "none"} className={`md:w-[18px] md:h-[18px] ${i < Math.floor(REVIEWS[currentReview].rating) ? "" : "opacity-30"}`} />
                        ))}
                      </div>
                      <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                         <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-onyx flex items-center justify-center text-base md:text-lg font-cinzel font-bold shadow-lg">
                           {REVIEWS[currentReview].name.charAt(0)}
                         </div>
                         <div>
                           <h4 className="text-ivory text-sm md:text-base font-bold font-cinzel tracking-wide">{REVIEWS[currentReview].name}</h4>
                           <p className="text-white/40 text-[10px] md:text-xs uppercase tracking-wider">{REVIEWS[currentReview].date}</p>
                         </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              
            </div>
          </motion.div>

        </section>

      </div>
    </div>
  );
};

export default About;