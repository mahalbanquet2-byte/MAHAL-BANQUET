import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Instagram, Facebook, Mail, MapPin, Phone } from 'lucide-react';
import { NAV_ITEMS, COMPANY_NAME, COMPANY_ADDRESS, COMPANY_PHONE, COMPANY_EMAIL } from '../../constants';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent ${
          isScrolled 
            ? 'bg-onyx/95 backdrop-blur-md border-white/10 py-2 shadow-2xl' 
            : 'bg-transparent py-3 md:py-6'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 md:gap-4 relative z-50 group perspective-1000">
            <div className="relative transform-style-3d">
              {/* Logo Glow Effect - Intensifies on hover */}
              <div className="absolute inset-0 bg-gold-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
              
              <motion.img 
                initial={{ rotateY: 0, y: 0 }}
                animate={{ 
                  rotateY: [0, 5, 0, -5, 0], // Subtle idle sway
                  y: [0, -3, 0, -3, 0] // Gentle float
                }}
                whileHover={{ 
                  scale: 1.15,
                  rotateY: 25, // Pronounced 3D tilt
                  rotateX: 5,
                  filter: "brightness(1.1) drop-shadow(0 10px 20px rgba(212,175,55,0.4))",
                  transition: { duration: 0.4, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ 
                  rotateY: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                src="https://i.imgur.com/UlToDLl.png" 
                alt="Mahal Banquet" 
                className="h-16 md:h-32 w-auto object-contain relative z-10 drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]" 
              />
            </div>
            
            <div className="flex flex-col transform-style-3d group-hover:translate-x-1 transition-transform duration-300">
              <span className="text-lg md:text-4xl font-cinzel font-bold text-ivory tracking-wide leading-none drop-shadow-md group-hover:text-gold-400 transition-colors">
                Mahal
              </span>
              <span className="text-[10px] md:text-xs font-cinzel text-gold-500 tracking-[0.3em] leading-none mt-1 md:mt-2">
                Banquet
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-xs font-cinzel font-bold uppercase tracking-widest transition-all duration-300 relative group ${
                  location.pathname === item.path ? 'text-gold-500' : 'text-ivory/80 hover:text-gold-400'
                }`}
              >
                {item.label}
                <span className={`absolute -bottom-2 left-0 h-[1px] bg-gold-500 transition-all duration-300 ${location.pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
            ))}
            <Link 
              to="/contact"
              className="bg-gold-500 text-onyx px-6 py-2 rounded-sm font-cinzel font-bold uppercase tracking-wider text-xs hover:bg-white transition-colors duration-300 shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.6)]"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden text-gold-500 relative z-50 p-3 -mr-2 active:scale-95 transition-transform"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-onyx/98 backdrop-blur-xl lg:hidden flex flex-col justify-center"
          >
            <div className="flex flex-col gap-6 items-center p-6 w-full max-w-sm mx-auto">
              {NAV_ITEMS.map((item, idx) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + idx * 0.05 }}
                  className="w-full text-center"
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-2xl font-cinzel transition-colors block py-2 ${
                      location.pathname === item.path ? 'text-gold-500 font-bold' : 'text-ivory hover:text-gold-500'
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 w-full"
              >
                <Link 
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-gold-500 text-onyx px-12 py-4 rounded-full font-cinzel font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors shadow-lg shadow-gold-500/20 active:scale-95 transform block text-center w-full"
                >
                  Book A Visit
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Footer = () => (
  <footer className="bg-neutral-950 border-t border-white/10 pt-16 pb-10">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
        <div>
          <h3 className="text-2xl font-cinzel text-gold-500 mb-6">{COMPANY_NAME}</h3>
          <p className="text-white/60 leading-relaxed max-w-sm">
            Lalitpur's crown jewel for luxury events. Crafting unforgettable moments in settings of unparalleled elegance since 2010.
          </p>
        </div>
        
        <div>
          <h4 className="text-lg font-cinzel text-ivory mb-6">Contact</h4>
          <ul className="space-y-4 text-white/60">
            <li className="flex items-center gap-3"><MapPin size={18} className="text-gold-500 shrink-0" /> {COMPANY_ADDRESS}</li>
            <li className="flex items-center gap-3"><Phone size={18} className="text-gold-500 shrink-0" /> <a href={`tel:${COMPANY_PHONE.replace(/\s+/g, '')}`}>{COMPANY_PHONE}</a></li>
            <li className="flex items-center gap-3"><Mail size={18} className="text-gold-500 shrink-0" /> {COMPANY_EMAIL}</li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-cinzel text-ivory mb-6">Follow Us</h4>
          <div className="flex gap-4">
            <a 
              href="https://www.instagram.com/mahal_banquet/" 
              target="_blank" 
              rel="noreferrer" 
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-gold-500 hover:bg-gold-500 hover:text-onyx transition-all duration-300"
            >
              <Instagram size={18} />
            </a>
            <a 
              href="https://www.facebook.com/profile.php?id=100087978445352" 
              target="_blank" 
              rel="noreferrer" 
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-gold-500 hover:bg-gold-500 hover:text-onyx transition-all duration-300"
            >
              <Facebook size={18} />
            </a>
          </div>
        </div>
      </div>
      
      <div className="border-t border-white/5 pt-8 text-center text-white/40 text-sm">
        <p>&copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-onyx min-h-screen flex flex-col font-sans overflow-x-hidden selection:bg-gold-500/30 selection:text-onyx">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};