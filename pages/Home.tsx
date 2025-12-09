
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowRight, Star, Sparkles, Users, Utensils, Music, Car, Crown } from 'lucide-react';
import Hero from '../components/Hero';
import { Link } from 'react-router-dom';

const SectionTitle = ({ subtitle, title }: { subtitle: string, title: string }) => (
  <div className="text-center mb-16">
    <span className="text-gold-500 text-xs font-bold uppercase tracking-[0.2em] mb-4 block font-cinzel">{subtitle}</span>
    <h2 className="text-4xl md:text-5xl font-cinzel text-ivory drop-shadow-lg">{title}</h2>
    <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-6"></div>
  </div>
);

// --- NEW HOME VENUE DATA & COMPONENT ---

const HOME_VENUES = [
  {
    id: 'grand-hall',
    name: 'Grand Celebration Hall',
    description: 'The pinnacle of elegance with a majestic stage, high ceilings, and luxurious décor for grand weddings.',
    capacity: '500 - 1500 Guests',
    images: [
      'https://i.imgur.com/9tKmFLI.jpeg',
      'https://i.imgur.com/yDLYT6r.jpeg',
      'https://i.imgur.com/KZOiW5N.jpeg',
      'https://i.imgur.com/tJHDkAO.jpeg'
    ]
  },
  {
    id: 'celestial-lounge',
    name: 'Celestial Dining Lounge',
    description: 'An intimate sanctuary of luxury featuring plush seating and ambient lighting for exclusive gatherings.',
    capacity: '50 - 200 Guests',
    images: [
      'https://i.imgur.com/dygMMhD.jpeg',
      'https://i.imgur.com/C71EpR9.jpeg',
      'https://i.imgur.com/FxxUOpU.jpeg',
      'https://i.imgur.com/vzD53RR.jpeg',
      'https://i.imgur.com/mUIUeyl.jpeg'
    ]
  }
];

const HomeVenueSlider = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="absolute inset-0 w-full h-full bg-onyx">
      <AnimatePresence mode="popLayout">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt="Venue Preview"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80"></div>
    </div>
  );
};

const Home = () => {
  return (
    <>
      <Hero />
      
      {/* Venues Showcase - Crystal Glass Style */}
      <section className="py-24 bg-charcoal relative">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <SectionTitle subtitle="Our Spaces" title="Explore The Collection" />
          
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            {HOME_VENUES.map((venue, idx) => (
              <motion.div 
                key={venue.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="group relative h-[500px] md:h-[600px] overflow-hidden rounded-[2.5rem] crystal-glass shadow-2xl hover:-translate-y-2 transition-transform duration-500"
              >
                {/* 1. Image Slideshow Background */}
                <HomeVenueSlider images={venue.images} />

                {/* 2. Glass Overlay Content */}
                <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end">
                  
                  {/* Floating Top Badge */}
                  <div className="absolute top-6 right-6 md:top-8 md:right-8">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-gold-500 shadow-lg">
                      <Sparkles size={18} className="animate-pulse" />
                    </div>
                  </div>

                  <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-6 md:p-8 rounded-[2rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] overflow-hidden group-hover:bg-white/15 transition-colors duration-500">
                    
                    {/* Shimmer */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                    <h3 className="text-2xl md:text-4xl font-cinzel text-ivory mb-3 md:mb-4 group-hover:text-gold-400 transition-colors drop-shadow-md">
                      {venue.name}
                    </h3>
                    
                    <div className="w-12 h-[2px] bg-gold-500 mb-4 rounded-full"></div>
                    
                    <p className="text-white/80 text-sm md:text-base mb-6 line-clamp-2 leading-relaxed font-light font-sans">
                      {venue.description}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10 pt-4">
                      <div className="flex items-center gap-2 text-white/60 text-xs uppercase tracking-wider font-bold">
                        <Users size={14} className="text-gold-500" />
                        {venue.capacity}
                      </div>

                      <Link 
                        to="/venues" 
                        className="inline-flex items-center justify-center gap-2 bg-gold-500 text-onyx px-6 py-3 rounded-xl font-cinzel font-bold text-xs uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)] group/btn"
                      >
                        View Details <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Crystal Glass Style */}
      <section className="py-32 bg-onyx relative">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Image Cluster */}
            <div className="relative">
              <div className="absolute inset-0 bg-gold-500/20 blur-[60px] rounded-full opacity-20"></div>
              <img 
                src="https://images.unsplash.com/photo-1561930188-372078652613?q=80&w=2000&auto=format&fit=crop" 
                alt="Service" 
                className="rounded-[2rem] shadow-2xl relative z-10 border border-white/10 rotate-2 hover:rotate-0 transition-transform duration-700" 
              />
            </div>
            
            {/* Content */}
            <div className="crystal-glass rounded-[3rem] p-10 md:p-14 shadow-2xl relative overflow-hidden">
               {/* Shine */}
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-b from-white/5 to-transparent -rotate-45 transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

              <span className="text-gold-500 text-xs font-bold uppercase tracking-[0.2em] mb-4 block font-cinzel">The Mahal Experience</span>
              <h2 className="text-4xl md:text-5xl font-cinzel text-ivory mb-10">Unrivaled <br/>Hospitality</h2>
              
              <div className="space-y-6">
                {[
                  { icon: Crown, text: "Dedicated Event Concierge for every booking" },
                  { icon: Utensils, text: "Authentic Nepali & International cuisine options" },
                  { icon: Music, text: "State-of-the-art lighting and sound systems" },
                  { icon: Car, text: "Ample parking space in Gwarko" }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-5 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-gold-500/30 hover:bg-white/10 transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center border border-gold-500/20 text-gold-500 group-hover:bg-gold-500 group-hover:text-onyx transition-colors shrink-0">
                      <item.icon size={20} />
                    </div>
                    <p className="text-white/80 font-sans font-light leading-relaxed pt-2 text-sm md:text-base">{item.text}</p>
                  </div>
                ))}
              </div>
              
              <Link to="/about" className="inline-block mt-12 bg-white/10 hover:bg-gold-500 hover:text-onyx border border-white/20 hover:border-gold-500 text-ivory px-10 py-4 rounded-xl transition-all duration-300 uppercase text-xs tracking-[0.2em] font-bold font-cinzel shadow-lg">
                Read Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-32 relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070" 
            alt="CTA Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-onyx via-transparent to-onyx"></div>
        </div>
        
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="crystal-glass p-12 md:p-16 rounded-[3rem] shadow-2xl max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl font-cinzel text-ivory mb-6">Start Your Journey</h2>
            <p className="text-white/80 text-lg mb-12 max-w-2xl mx-auto font-serif italic">Dates for the upcoming wedding season are filling fast. Secure your preferred venue today.</p>
            <Link 
              to="/contact" 
              className="inline-block bg-gradient-to-r from-gold-400 to-gold-600 text-onyx px-12 py-5 rounded-full font-bold tracking-[0.2em] uppercase hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-shadow duration-300 font-cinzel"
            >
              Inquire Now
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
