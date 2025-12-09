import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Sparkles, X, Check, Calendar, Users, Music, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getOptimizedImage } from '../constants';

// --- DATA DEFINITION ---

interface EventCategory {
  id: string;
  title: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  detailImage: string;
  features: string[];
}

const EVENT_CATEGORIES: EventCategory[] = [
  {
    id: 'weddings',
    title: 'Weddings & Receptions',
    category: 'The Grand Celebration',
    shortDesc: 'Celebrate your union in the lap of luxury. Our grand ballrooms and exquisite service create the perfect backdrop for your fairytale wedding.',
    fullDesc: 'Our wedding packages are designed to turn your dreams into reality. From the moment you step into our grand foyer to the final toast, every detail is meticulously curated. We offer custom floral arrangements, royal mandap setups, and a bridal suite for your convenience. Our culinary team prepares a royal feast that delights every palate, ensuring your special day is etched in memory forever.',
    // Optimized Imgur and Unsplash
    image: getOptimizedImage('https://i.imgur.com/dMDR7ue.jpeg', 'large'),
    detailImage: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=75&w=1200',
    features: ['Royal Mandap Design', 'Bridal Suite Included', '300-1500 Guest Capacity', 'Custom Floral Themes']
  },
  {
    id: 'engagement',
    title: 'Engagement Ceremonies',
    category: 'Intimate Beginnings',
    shortDesc: 'Begin your journey of love with an intimate and elegant engagement ceremony tailored to your traditions.',
    fullDesc: 'The engagement is the beautiful first step of your togetherness. We specialize in creating intimate yet majestic settings for ring ceremonies, whether it is a traditional exchange or a modern celebration. Our "Heritage Suite" offers the perfect blend of privacy and luxury, accompanied by curated appetizers and drinks to toast to your future.',
    image: getOptimizedImage('https://i.imgur.com/Aql6rYH.jpeg', 'large'), 
    detailImage: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=75&w=1200',
    features: ['Intimate Hall Settings', 'Ring Ceremony Stage', 'Premium Appetizers', 'Photography Zones']
  },
  {
    id: 'corporate',
    title: 'Corporate Events',
    category: 'Professional Excellence',
    shortDesc: 'Impress stakeholders and partners with world-class facilities, seamless technology, and impeccable hospitality.',
    fullDesc: 'Mahal Banquet redefines corporate gatherings. Whether it is a product launch, an annual general meeting, or an executive gala, our venues are equipped with state-of-the-art audio-visual technology and high-speed connectivity. Our professional concierge ensures your itinerary runs smoothly, allowing you to focus on business while we handle the experience.',
    image: getOptimizedImage('https://i.imgur.com/vd7nd3L.jpeg', 'large'),
    detailImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=75&w=1200',
    features: ['High-Speed WiFi', 'AV & Projector Setup', 'Corporate Lunch/Dinner', 'VIP Lounge Access']
  },
  {
    id: 'custom',
    title: 'Customized Events',
    category: 'Bespoke Celebrations',
    shortDesc: 'From milestone anniversaries to cultural festivities, we craft bespoke events that reflect your unique style and vision.',
    fullDesc: 'No celebration is too small or too niche for our dedicated team. We pride ourselves on versatility, hosting everything from Pasni and Bratabandha to milestone birthdays and silver jubilees. Share your vision with us, and we will customize the decor, menu, and flow of the event to perfectly match your expectations, creating a truly personalized celebration.',
    image: 'https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?q=75&w=1200',
    detailImage: 'https://images.unsplash.com/photo-1530103862676-de3c9a59af38?q=75&w=1200',
    features: ['Themed Decor', 'Cultural Menu Options', 'Live Music Arrangements', 'Flexible Floor Plans']
  }
];

// --- COMPONENTS ---

interface EventCardProps {
  event: EventCategory;
  index: number;
  onOpen: (e: EventCategory) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, index, onOpen }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="relative mb-12 md:mb-24 last:mb-0"
    >
      {/* Glassmorphic Container */}
      <div className="crystal-glass rounded-[2rem] md:rounded-[2.5rem] p-5 md:p-8 border border-white/10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] relative overflow-hidden group">
        
        {/* Ambient Glow */}
        <div className={`absolute top-0 ${isEven ? 'right-0' : 'left-0'} w-2/3 h-full bg-gradient-to-r from-transparent via-gold-500/5 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none`}></div>

        <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-6 md:gap-8 lg:gap-16 items-center`}>
          
          {/* Image Section */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative aspect-[4/3] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-2xl transition-shadow duration-700 group-hover:shadow-[0_20px_50px_rgba(212,175,55,0.2)]">
              {/* Existing dark overlay */}
              <div className="absolute inset-0 bg-gold-900/10 z-10 mix-blend-overlay"></div>
              
              <img 
                src={event.image} 
                alt={event.title} 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-in-out group-hover:scale-115"
              />
              
              {/* Golden Overlay on Hover */}
              <div className="absolute inset-0 bg-gold-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20 pointer-events-none mix-blend-overlay"></div>
              
              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20 pointer-events-none"></div>
            </div>
            
            {/* Floating Badge */}
            <div className={`absolute -bottom-6 ${isEven ? '-right-6' : '-left-6'} bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-xl z-30 hidden md:block`}>
               <Sparkles className="text-gold-400 animate-pulse" size={24} />
            </div>
          </div>

          {/* Text Section */}
          <div className="w-full lg:w-1/2 text-center lg:text-left relative z-10">
            <span className="inline-block py-1 px-3 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-400 text-[10px] font-bold uppercase tracking-[0.25em] mb-3 md:mb-4">
              {event.category}
            </span>
            <h3 className="text-2xl md:text-5xl font-cinzel text-ivory mb-3 md:mb-6 leading-tight drop-shadow-lg">
              {event.title}
            </h3>
            <p className="text-white/70 text-sm md:text-lg font-light leading-relaxed mb-6 md:mb-8 font-sans">
              {event.shortDesc}
            </p>

            <button 
              onClick={() => onOpen(event)}
              className="group/btn relative inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-gold-500/40 text-gold-400 rounded-full overflow-hidden transition-all duration-300 hover:border-gold-500 hover:text-onyx hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] w-full md:w-auto justify-center md:justify-start active:scale-95"
            >
              <span className="absolute inset-0 bg-gold-500 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-in-out"></span>
              <span className="relative z-10 text-xs font-bold uppercase tracking-[0.2em] font-cinzel">Learn More</span>
              <ChevronRight size={16} className="relative z-10 transition-transform group-hover/btn:translate-x-1" />
            </button>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

const EventModal = ({ event, onClose }: { event: EventCategory, onClose: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-onyx/90 backdrop-blur-xl" 
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <motion.div 
        initial={{ scale: 0.95, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 20, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-5xl h-full md:h-auto md:max-h-[90vh] overflow-y-auto custom-scrollbar bg-black/40 border border-white/10 rounded-none md:rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row overflow-hidden"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 w-12 h-12 md:w-10 md:h-10 rounded-full bg-black/50 border border-white/10 text-white/70 hover:bg-gold-500 hover:text-onyx hover:border-gold-500 flex items-center justify-center transition-all duration-300 active:scale-90"
        >
          <X size={24} className="md:w-5 md:h-5" />
        </button>

        {/* Modal Image Side */}
        <div className="w-full md:w-5/12 relative min-h-[35vh] md:min-h-full">
          <img 
            src={event.detailImage} 
            alt={event.title} 
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 md:opacity-40"></div>
          
          <div className="absolute bottom-6 left-6 right-6 text-white z-10 md:hidden">
            <span className="text-gold-500 text-[10px] font-bold uppercase tracking-[0.25em] block mb-2">{event.category}</span>
            <h3 className="text-2xl font-cinzel font-bold">{event.title}</h3>
          </div>
        </div>

        {/* Modal Text Side */}
        <div className="w-full md:w-7/12 p-6 md:p-12 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-md flex flex-col">
          <div className="hidden md:block mb-8">
            <span className="text-gold-500 text-xs font-bold uppercase tracking-[0.25em] block mb-2">{event.category}</span>
            <h2 className="text-4xl font-cinzel text-ivory">{event.title}</h2>
          </div>

          <p className="text-white/80 leading-relaxed font-light text-base md:text-lg mb-8 md:mb-10 border-l-2 border-gold-500/30 pl-4 md:pl-6">
            {event.fullDesc}
          </p>

          <div className="mb-8 md:mb-12">
            <h4 className="text-gold-400 text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
              <Sparkles size={14} /> Service Highlights
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {event.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                  <div className="w-6 h-6 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-500 shrink-0">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span className="text-white/90 text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-white/10 mt-auto pb-8 md:pb-0">
            <Link 
              to="/contact" 
              className="flex-1 bg-gold-500 text-onyx py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-white transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] text-center flex items-center justify-center gap-2 active:scale-95"
            >
              Book This Event <ChevronRight size={14} />
            </Link>
            <button 
              onClick={onClose}
              className="flex-1 border border-white/20 text-white/80 py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-white/5 transition-all text-center active:scale-95"
            >
              Close Details
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- MAIN PAGE ---

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState<EventCategory | null>(null);

  useEffect(() => {
    if (selectedEvent) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedEvent]);

  return (
    <div className="bg-onyx min-h-screen relative overflow-x-hidden selection:bg-gold-500/30">
      
      {/* Background Noise & Decor */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}></div>
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-gold-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Hero Section */}
      <div className="pt-24 md:pt-32 pb-12 md:pb-20 relative z-10">
        <div className="container mx-auto px-6 text-center">

           {/* Royal 3D Emblem */}
           <div className="relative w-20 h-20 mx-auto mb-6 perspective-1000">
             <div className="absolute inset-0 bg-gold-500/20 rounded-full blur-xl animate-pulse"></div>
             <div className="w-full h-full relative transform-style-3d animate-[spin_8s_linear_infinite]">
                <div className="absolute inset-0 rounded-full border border-gold-500/40 border-l-gold-500 shadow-[0_0_15px_rgba(212,175,55,0.2)]"></div>
                <div className="absolute inset-2 rounded-full border border-gold-500/30 border-r-gold-500 rotate-90"></div>
                <div className="absolute inset-4 rounded-full border border-white/10 border-t-white/50 -rotate-45"></div>
             </div>
             <div className="absolute inset-0 flex items-center justify-center">
               <Star size={28} className="text-gold-500 drop-shadow-[0_0_10px_rgba(212,175,55,0.8)] animate-float" />
             </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 shadow-lg"
          >
            <Star size={14} className="text-gold-500 fill-gold-500" />
            <span className="text-gold-400 text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] font-cinzel">World Class Hosting</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-4xl md:text-7xl lg:text-8xl font-cinzel text-ivory mb-6 md:mb-8 drop-shadow-2xl"
          >
            Curated <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300">Events</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white/60 max-w-2xl mx-auto text-base md:text-xl font-light font-serif italic leading-relaxed"
          >
            "We don't just host events; we craft immersive experiences where luxury meets legacy."
          </motion.p>
        </div>
      </div>

      {/* Events List */}
      <div className="container mx-auto px-4 md:px-6 pb-20 md:pb-32 relative z-10">
        <div className="max-w-6xl mx-auto">
          {EVENT_CATEGORIES.map((event, idx) => (
             <EventCard 
               key={event.id} 
               event={event} 
               index={idx} 
               onOpen={setSelectedEvent} 
             />
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <EventModal 
            event={selectedEvent} 
            onClose={() => setSelectedEvent(null)} 
          />
        )}
      </AnimatePresence>

      {/* Bottom CTA */}
      <section className="pb-20 md:pb-32 relative z-10">
         <div className="container mx-auto px-6 text-center">
           <div className="crystal-glass rounded-[2rem] md:rounded-[3rem] p-10 md:p-20 relative overflow-hidden">
             {/* Decorative Background */}
             <div className="absolute inset-0 bg-gradient-to-r from-gold-500/10 to-transparent opacity-20"></div>
             
             <h2 className="text-2xl md:text-5xl font-cinzel text-ivory mb-6 md:mb-8 relative z-10">Have a Unique Vision?</h2>
             <p className="text-white/70 max-w-xl mx-auto mb-8 md:mb-10 relative z-10 text-sm md:text-base">
               Our event concierge team is ready to tailor every aspect of our venue to your specific requirements.
             </p>
             <Link 
               to="/contact" 
               className="relative z-10 inline-block bg-ivory text-onyx px-8 md:px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-gold-500 transition-colors shadow-2xl active:scale-95"
             >
               Consult Our Planner
             </Link>
           </div>
         </div>
      </section>

    </div>
  );
};

export default Events;