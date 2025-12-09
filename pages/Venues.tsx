import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, Check, Star, ArrowRight, Users, Sparkles, Landmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getOptimizedImage } from '../constants';

// --- DATA DEFINITION ---

interface LuxuryVenue {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  images: string[]; // Array of images for slideshow
  capacity: string;
}

const LUXURY_VENUES: LuxuryVenue[] = [
  {
    id: 'grand-hall',
    name: 'Grand Celebration Hall',
    shortDesc: 'Perfect for grand weddings and receptions, featuring a luxurious stage and expansive seating.',
    fullDesc: 'Step into the Grand Celebration Hall, the pinnacle of elegance and grandeur at Mahal Banquet. Designed for large-scale events, this expansive hall features a majestic stage, high ceilings, and luxurious décor that sets the perfect atmosphere for weddings, receptions, and grand celebrations. With ample seating arrangements and state-of-the-art lighting, every guest enjoys comfort and sophistication. The hall’s refined ambiance is complemented by elegant chandeliers, premium flooring, and intricate detailing that make each celebration truly unforgettable.',
    features: [
      'Majestic stage for performances',
      'Spacious layout for large gatherings',
      'Elegant chandeliers and décor',
      'High ceilings & luxury finishes',
      'State-of-the-art lighting',
      'Flexible seating arrangements'
    ],
    // Optimized images
    images: [
      getOptimizedImage('https://i.imgur.com/9tKmFLI.jpeg', 'large'),
      getOptimizedImage('https://i.imgur.com/yDLYT6r.jpeg', 'large'),
      getOptimizedImage('https://i.imgur.com/KZOiW5N.jpeg', 'large'),
      getOptimizedImage('https://i.imgur.com/tJHDkAO.jpeg', 'large')
    ],
    capacity: '500 - 1500 Guests'
  },
  {
    id: 'celestial-lounge',
    name: 'Celestial Dining Lounge',
    shortDesc: 'An intimate sanctuary of luxury. Ideal for private gatherings, corporate dinners, and engagement celebrations.',
    fullDesc: 'Discover the Celestial Dining Lounge, an intimate sanctuary of luxury and refined comfort. Perfect for private gatherings, corporate dinners, or engagement celebrations, this lounge offers a sophisticated dining experience that elevates every occasion. The space is adorned with plush seating, ambient lighting, and curated décor that creates a warm and inviting atmosphere. Every table is meticulously arranged to ensure privacy, elegance, and convenience, while soft glassmorphic accents and gold detailing enhance the premium aesthetic.',
    features: [
      'Intimate private dining',
      'Plush seating & ambient lighting',
      'Sophisticated table décor',
      'Flexible layouts for medium events',
      'Curated dining experiences',
      'Glassmorphic interior accents'
    ],
    images: [
      getOptimizedImage('https://i.imgur.com/dygMMhD.jpeg', 'large'),
      getOptimizedImage('https://i.imgur.com/C71EpR9.jpeg', 'large'),
      getOptimizedImage('https://i.imgur.com/FxxUOpU.jpeg', 'large'),
      getOptimizedImage('https://i.imgur.com/vzD53RR.jpeg', 'large'),
      getOptimizedImage('https://i.imgur.com/mUIUeyl.jpeg', 'large')
    ],
    capacity: '50 - 200 Guests'
  }
];

// --- SUB-COMPONENTS ---

// Slideshow Component
const VenueImageSlider = ({ images, duration = 3000 }: { images: string[], duration?: number }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, duration);
    return () => clearInterval(timer);
  }, [images.length, duration]);

  return (
    <div className="absolute inset-0 w-full h-full bg-onyx">
      <AnimatePresence mode="popLayout">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt="Venue View"
          loading="lazy"
          decoding="async"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-onyx/90 via-onyx/20 to-transparent"></div>
    </div>
  );
};

const VenueCard: React.FC<{ venue: LuxuryVenue; onOpen: (v: LuxuryVenue) => void }> = ({ venue, onOpen }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="group relative h-[480px] md:h-[500px] lg:h-[600px] w-full rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl hover:-translate-y-2 transition-transform duration-500"
    >
      {/* 1. Background Slideshow */}
      <VenueImageSlider images={venue.images} />

      {/* 2. Glassmorphic Overlay (Apple Style) */}
      <div className="absolute inset-0 p-4 md:p-8 flex flex-col justify-end">
        {/* Crystal Card Body */}
        <div className="relative bg-white/10 backdrop-blur-xl md:backdrop-blur-2xl border border-white/20 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] overflow-hidden">
          
          {/* Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

          {/* Top Badge */}
          <div className="absolute top-0 right-0 p-4 md:p-6 opacity-80">
             <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/10 text-gold-500">
                <Sparkles size={16} className="md:w-[18px] md:h-[18px]" />
             </div>
          </div>

          <h3 className="text-xl md:text-3xl font-cinzel text-ivory mb-2 md:mb-3 drop-shadow-md pr-10">
            {venue.name}
          </h3>
          
          <div className="w-12 h-[2px] bg-gold-500 mb-3 md:mb-4 rounded-full"></div>

          <p className="text-white/80 font-sans font-light leading-relaxed mb-4 md:mb-6 line-clamp-2 text-sm md:text-base">
            {venue.shortDesc}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-white/60 text-xs uppercase tracking-wider font-bold">
               <Users size={14} className="text-gold-500" />
               {venue.capacity}
            </div>

            <button 
              onClick={() => onOpen(venue)}
              className="bg-gold-500 hover:bg-white text-onyx px-5 py-3 md:px-6 md:py-3 rounded-xl font-cinzel font-bold text-[10px] md:text-xs uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)] flex items-center justify-center gap-2 active:scale-95"
            >
              View More <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const VenueModal: React.FC<{ venue: LuxuryVenue; onClose: () => void }> = ({ venue, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6"
    >
      <div 
        className="absolute inset-0 bg-onyx/90 backdrop-blur-xl" 
        onClick={onClose}
      />
      
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-7xl h-full md:h-auto min-h-[100dvh] md:min-h-0 md:max-h-[90vh] bg-onyx rounded-none md:rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row border border-white/10"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 w-12 h-12 md:w-12 md:h-12 rounded-full bg-black/40 border border-white/10 text-white/80 hover:bg-gold-500 hover:text-onyx hover:border-gold-500 flex items-center justify-center transition-all duration-300 backdrop-blur-md active:scale-90"
        >
          <X size={24} className="md:w-6 md:h-6" />
        </button>

        {/* 1. Modal Slideshow Section */}
        <div className="w-full lg:w-1/2 relative min-h-[35vh] lg:min-h-full">
           <VenueImageSlider images={venue.images} duration={4000} />
           
           {/* Mobile Title Overlay */}
           <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black to-transparent lg:hidden">
              <h2 className="text-2xl font-cinzel text-ivory drop-shadow-md">{venue.name}</h2>
           </div>
        </div>

        {/* 2. Modal Content Section - Crystal Glass Overlay Style */}
        <div className="w-full lg:w-1/2 relative bg-charcoal flex-grow">
           {/* Background Noise/Texture */}
           <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}></div>
           
           <div className="relative z-10 p-6 md:p-12 lg:p-16 h-full overflow-y-auto custom-scrollbar flex flex-col">
             
             <div className="hidden lg:block mb-10">
               <div className="flex items-center gap-3 mb-4">
                 <div className="h-[1px] w-12 bg-gold-500"></div>
                 <span className="text-gold-500 text-xs font-bold uppercase tracking-[0.25em]">Premium Collection</span>
               </div>
               <h2 className="text-4xl xl:text-5xl font-cinzel text-ivory leading-tight">{venue.name}</h2>
             </div>

             <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-10">
                <div className="p-3 md:p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                  <Users size={18} className="text-gold-500 mx-auto mb-2 md:w-5 md:h-5" />
                  <span className="block text-white/40 text-[10px] uppercase tracking-wider">Capacity</span>
                  <span className="text-white text-xs md:text-sm font-bold">{venue.capacity}</span>
                </div>
                <div className="p-3 md:p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                  <Star size={18} className="text-gold-500 mx-auto mb-2 md:w-5 md:h-5" />
                  <span className="block text-white/40 text-[10px] uppercase tracking-wider">Rating</span>
                  <span className="text-white text-xs md:text-sm font-bold">5 Star Luxury</span>
                </div>
             </div>

             <h3 className="text-lg md:text-xl font-cinzel text-gold-400 mb-3 md:mb-4">About the Venue</h3>
             <p className="text-white/70 leading-relaxed font-light text-sm md:text-lg mb-8 md:mb-10 text-justify">
               {venue.fullDesc}
             </p>

             <div className="mb-8 md:mb-12">
               <h3 className="text-lg md:text-xl font-cinzel text-gold-400 mb-4 md:mb-6">Key Features</h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                 {venue.features.map((feature, i) => (
                   <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                     <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-500 shrink-0">
                       <Check size={10} strokeWidth={3} className="md:w-3 md:h-3" />
                     </div>
                     <span className="text-white/90 text-sm font-medium">{feature}</span>
                   </div>
                 ))}
               </div>
             </div>

             <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-white/10 mt-auto pb-6 md:pb-0">
               <Link 
                 to="/contact" 
                 className="flex-1 bg-gradient-to-r from-gold-500 to-gold-600 text-onyx py-4 md:py-5 rounded-xl font-bold uppercase tracking-widest text-xs hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] text-center flex items-center justify-center gap-2 transition-all active:scale-95"
               >
                 Inquire Availability <ArrowRight size={14} />
               </Link>
             </div>
           </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- MAIN PAGE ---

const Venues = () => {
  const [selectedVenue, setSelectedVenue] = useState<LuxuryVenue | null>(null);

  // Lock body scroll when modal open
  useEffect(() => {
    if (selectedVenue) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedVenue]);

  return (
    <div className="bg-onyx min-h-screen relative overflow-x-hidden selection:bg-gold-500/30">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}></div>
      <div className="fixed -top-40 -left-40 w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Header */}
      <div className="pt-24 md:pt-28 pb-10 md:pb-12 relative z-10">
        <div className="container mx-auto px-6 text-center">
          
          {/* Royal 3D Emblem */}
          <div className="relative w-20 h-20 mx-auto mb-6 perspective-1000">
             <div className="absolute inset-0 bg-gold-500/20 rounded-full blur-xl animate-pulse"></div>
             <div className="w-full h-full relative transform-style-3d animate-[spin_12s_linear_infinite]">
                <div className="absolute inset-0 rounded-full border border-gold-500/30 border-t-gold-500 shadow-[0_0_15px_rgba(212,175,55,0.2)]"></div>
                <div className="absolute inset-2 rounded-full border border-gold-500/20 border-b-gold-500 rotate-90"></div>
                <div className="absolute inset-4 rounded-full border border-white/10 border-r-white/50 -rotate-45"></div>
             </div>
             <div className="absolute inset-0 flex items-center justify-center">
               <Landmark size={28} className="text-gold-500 drop-shadow-[0_0_10px_rgba(212,175,55,0.8)] animate-float" />
             </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 md:px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 md:mb-8"
          >
            <Star size={14} className="text-gold-500 fill-gold-500" />
            <span className="text-gold-400 text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] font-cinzel">The Collection</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-cinzel text-ivory mb-4 md:mb-6 drop-shadow-2xl"
          >
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300">Venues</span>
          </motion.h1>
          
          <p className="text-white/60 text-base md:text-lg font-light font-serif italic max-w-2xl mx-auto">
            "Designed to inspire, where every corner reflects elegance and every detail speaks of luxury."
          </p>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="container mx-auto px-4 md:px-6 pb-20 md:pb-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 max-w-[1400px] mx-auto">
          {LUXURY_VENUES.map((venue) => (
            <VenueCard 
              key={venue.id} 
              venue={venue} 
              onOpen={setSelectedVenue} 
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedVenue && (
          <VenueModal 
            venue={selectedVenue} 
            onClose={() => setSelectedVenue(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Venues;