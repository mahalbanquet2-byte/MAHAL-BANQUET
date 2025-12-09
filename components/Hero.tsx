import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, ArrowRight, Star, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

const SLIDES = [
  {
    id: 1,
    image: "https://i.imgur.com/uLg7vsp.jpeg",
    title: "Celebrate Life's Finest Moments",
    subtitle: "Mahal Banquet • Gwarko, Lalitpur"
  },
  {
    id: 2,
    image: "https://i.imgur.com/t9IJdWc.jpeg",
    title: "Exquisite Culinary Artistry",
    subtitle: "World-Class Catering & Hospitality"
  },
  {
    id: 3,
    image: "https://i.imgur.com/9tKmFLI.jpeg",
    title: "Grandeur in Every Detail",
    subtitle: "The Perfect Setting for Your Special Day"
  },
  {
    id: 4,
    image: "https://i.imgur.com/jRKcnOf.jpeg",
    title: "Luxury Redefined",
    subtitle: "Elegant Spaces for Corporate & Social Events"
  },
  {
    id: 5,
    image: "https://i.imgur.com/C71EpR9.jpeg",
    title: "Unrivaled Ambience",
    subtitle: "Creating Memories That Last Forever"
  }
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, 6000); // 6 seconds per slide
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden bg-onyx">
      {/* Background Slider */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          {/* Dark Gradient Overlay for Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60 z-10" />
          <div className="absolute inset-0 bg-onyx/30 mix-blend-multiply z-10" />
          
          <img 
            src={SLIDES[currentIndex].image} 
            alt={SLIDES[currentIndex].title} 
            className="w-full h-full object-cover"
            decoding="async"
            fetchPriority={currentIndex === 0 ? "high" : "auto"}
          />
        </motion.div>
      </AnimatePresence>

      {/* Content Overlay */}
      <div className="absolute inset-0 z-20 flex items-center justify-center px-4 sm:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -40, filter: "blur(10px)" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full max-w-5xl"
          >
            <div className="crystal-glass p-8 md:p-16 rounded-[2rem] md:rounded-[4rem] text-center border border-gold-500/20 shadow-[0_0_60px_rgba(0,0,0,0.6)] relative overflow-hidden group mx-auto">
              
              {/* Decorative Glows */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-gold-500/50 to-transparent blur-sm"></div>
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-gold-500/10 rounded-full blur-[80px] pointer-events-none"></div>
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none"></div>

              {/* Royal 3D Crown Emblem */}
              <div className="relative w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 md:mb-8 perspective-1000">
                <div className="absolute inset-0 bg-gold-500/20 rounded-full blur-xl animate-pulse"></div>
                <div className="w-full h-full relative transform-style-3d animate-[spin_10s_linear_infinite]">
                  <div className="absolute inset-0 rounded-full border border-gold-500/40 border-t-gold-500 border-b-gold-500 shadow-[0_0_15px_rgba(212,175,55,0.3)]"></div>
                  <div className="absolute inset-2 rounded-full border border-gold-500/30 border-l-gold-500 rotate-45"></div>
                  <div className="absolute inset-4 rounded-full border border-white/10 border-r-white/50 -rotate-45"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Crown size={28} className="text-gold-500 drop-shadow-[0_0_10px_rgba(212,175,55,0.8)] animate-float md:w-8 md:h-8" />
                </div>
              </div>

              {/* Subtitle Badge */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="inline-flex items-center gap-2 py-1.5 px-4 md:px-5 rounded-full bg-gold-500/10 border border-gold-500/20 mb-6 md:mb-8 backdrop-blur-md"
              >
                <Star size={12} className="text-gold-500 fill-gold-500" />
                <span className="text-gold-400 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] font-cinzel">
                  {SLIDES[currentIndex].subtitle}
                </span>
                <Star size={12} className="text-gold-500 fill-gold-500" />
              </motion.div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-cinzel text-ivory mb-8 md:mb-10 leading-[1.1] drop-shadow-2xl">
                {SLIDES[currentIndex].title}
              </h1>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center">
                <Link 
                  to="/contact" 
                  className="w-full sm:w-auto group/btn relative overflow-hidden bg-gold-500 text-onyx px-8 md:px-10 py-3 md:py-4 rounded-full font-cinzel font-bold uppercase tracking-widest text-xs md:text-sm hover:text-white transition-colors duration-500 shadow-[0_0_30px_rgba(212,175,55,0.4)] flex items-center justify-center gap-3"
                >
                  <span className="absolute inset-0 bg-onyx translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-in-out"></span>
                  <span className="relative z-10">Book Your Event</span>
                  <ArrowRight size={16} className="relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
                
                <Link 
                  to="/events" 
                  className="w-full sm:w-auto px-8 md:px-10 py-3 md:py-4 rounded-full font-cinzel font-bold uppercase tracking-widest text-xs md:text-sm text-ivory border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all backdrop-blur-sm text-center"
                >
                  Explore Events
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-6 md:bottom-12 left-0 right-0 z-30 flex flex-col items-center gap-6 pointer-events-none">
        
        {/* Pagination Dots */}
        <div className="flex gap-4 pointer-events-auto">
          {SLIDES.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-700 ease-out ${
                idx === currentIndex 
                  ? 'w-12 bg-gold-500 shadow-[0_0_10px_rgba(212,175,55,0.8)]' 
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Arrows (Desktop Only) */}
        <div className="hidden md:flex w-full justify-between px-12 absolute top-1/2 -translate-y-1/2 pointer-events-none">
           <button 
             onClick={prevSlide} 
             className="pointer-events-auto p-4 rounded-full bg-black/20 hover:bg-gold-500/90 hover:text-onyx border border-white/10 hover:border-gold-500 transition-all text-white backdrop-blur-md group"
             aria-label="Previous Slide"
           >
             <ChevronLeft size={28} className="group-hover:-translate-x-1 transition-transform" />
           </button>
           <button 
             onClick={nextSlide} 
             className="pointer-events-auto p-4 rounded-full bg-black/20 hover:bg-gold-500/90 hover:text-onyx border border-white/10 hover:border-gold-500 transition-all text-white backdrop-blur-md group"
             aria-label="Next Slide"
           >
             <ChevronRight size={28} className="group-hover:translate-x-1 transition-transform" />
           </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;